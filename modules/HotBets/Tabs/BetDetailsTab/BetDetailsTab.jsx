import React, { useState, useContext, useEffect, useRef } from 'react';
import { Stack, Typography, Fade, Snackbar, Box, TextField } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import StatsDetails from '@modules/HotBets/Components/StatsDetails';
import AddToBetSlipButton from '@modules/HotBets/Components/AddToBetSlipButton';
import { getQuaryData, saveHotBetObjectInLocal, setHBStructure, toTitleCase } from '@utils/hotBetUtils';
import { getBetDetails, getTipLocations } from '@services/hotbets/hotbetsService';
import { HOT_BET_ODD_FILTER } from '@lib/constants';
import { LOCAL_STORAGE_KEY, HOT_BET_DATA } from '@lib/constants';
import { useSession } from 'next-auth/client';
import BetDetailsExpandedView from '../../Components/BetDetailsExpandedView';
import TipLocationModal from '../../Components/TipLocationModal';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import { TipContext } from '@Context/Tip/TipProvider';
import CustomALert from '@Components/Shared/CustomALert';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import TipLocations from './TipLocations';
import HotBetStakingOptions from './HotBetStakingOptions';
import HBAddToBetSlip from './HBAddToBetSlip';

const BetDetailsTab = ({
    data,
    colorId,
    summaryList,
    selectedCategory,
    adDetail,
    title,
    uid,
    packid,
    racetype,
    index,
    openBetSlip,
    setopenBetSlip,
    handleAlertClose,
    alertTip,
    handleAlert,
    handleBetSlip,
    settotalBetsRef,
    setOdds,
    odds,
    setAllStake,
    allStake,
    setBetSlipCount,
    betSlipCount,
    triggerDetails,
    settriggerDetails,
    showBets = false,
    hidestats = false,
    totalBetsRef = 0,
    HBMarket = {},
    showGetTips,
    selectedDate = 0
}) => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const { tips, addBetsToBetslip } = useContext(TipContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipLocationData, setTipLocationData] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [isOddsloading, setIsOddsLoading] = useState(true);
    const [isAddtoBetLoading, setIsAddtoBetLoading] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [deselectArray, setDeSelectArray] = useState([]);
    const [minHotBet, setMinHotBet] = useState(0);
    const [session] = useSession();
    const [potentialReturnStake, setPotentialReturnStake] = useState(0);
    const [totalStake, setTotalStake] = useState(0);
    const [error, setError] = useState(false);
    const [errordesc, setErrorDesc] = useState('');
    const currentFocus = useRef();
    const [loadingBetSlip, setLoadingBetSlip] = useState(false);
    let hbFilterInit = process.env.APP_BRAND == 'gto' ? HOT_BET_ODD_FILTER.initialGTOStart : HOT_BET_ODD_FILTER.initialStart
    let hbFilterEnd = process.env.APP_BRAND == 'gto' ? HOT_BET_ODD_FILTER.initialGTOEnd : HOT_BET_ODD_FILTER.initialEnd

    let totalbets = 0;
    Object.keys(tips).map((key, idx) => {
        key != 'multi' && (totalbets = totalbets + (tips[key] ? tips[key].length : 0));
    });

    const handleOnClickToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOnClickSeeBetDetails = () => {
        error && setError(false);
        let oddsFilter = localStorage.getItem("oddsfilter") ? JSON.parse(localStorage.getItem("oddsfilter")) : [hbFilterInit, hbFilterEnd]
        !isExpanded && getBetDetailsData(true, oddsFilter[0], oddsFilter[1]);
        !isExpanded && setIsExpanded(true)
    };

    useEffect(() => {
        if (triggerDetails) {
            !isExpanded && handleOnClickSeeBetDetails();
        }
    }, [triggerDetails]);

    useEffect(() => {
        showBets && !isExpanded && settriggerDetails(true);
    }, [showBets]);

    const getModalData = async (locationIds, isAllLocation) => {
        if (isAllLocation) {
            setIsAddtoBetLoading(true);
        } else {
            setIsLoading(true);
            setTipLocationData([]);
            handleOnClickToggleModal();
        }
        try {
            const response = await getTipLocations(
                uid,
                racetype,
                [...locationIds],
                [packid],
                checkDeselected(Number(`${uid}${index}${locationIds[0]}`)) ? 0 : 1
            );
            if (response) {
                if (isAllLocation) {
                    const newHotBetItem = setHBStructure(
                        response?.tipLoc,
                        odds,
                        data,
                        betSlipCount,
                        racetype,
                        [packid],
                        false,
                        totalStake,
                        potentialReturnStake
                    );

                    newHotBetItem && addHBBetslip(newHotBetItem);
                    const existingHotBet = localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA)
                        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA))
                        : [];

                    existingHotBet.push(newHotBetItem);

                    localStorage.setItem(LOCAL_STORAGE_KEY.HOT_BET_DATA, JSON.stringify(existingHotBet));
                } else {
                    setTipLocationData(response?.tipLoc);
                }
            }
        } catch (error) {
            //
        } finally {
            setIsLoading(false);
            setIsAddtoBetLoading(false);
        }
    };

    const handelSelectLocation = async (selection) => {
        try {
            let newdeselectArray = deselectArray;
            if (selection === 1) {
                newdeselectArray = deselectArray.filter((item) => item !== Number(`${uid}${index}${selectedLocationId}`));
            } else if (selection === 0) {
                newdeselectArray = [...deselectArray, Number(`${uid}${index}${selectedLocationId}`)];
            }
            const response = await getTipLocations(uid, racetype, [selectedLocationId], [packid], selection);

            if (response) {
                setTipLocationData(response?.tipLoc);
                setDeSelectArray(newdeselectArray);
                //update bet details with new locations
                let newLocList = summaryList.filter((item) => newdeselectArray.indexOf(Number(`${uid}${index}${item.LOCID}`)) == -1);
                let oddsFilter = localStorage.getItem('oddsfilter')
                    ? JSON.parse(localStorage.getItem('oddsfilter'))
                    : [hbFilterInit, hbFilterEnd];
                getBetDetailsData(true, oddsFilter[0], oddsFilter[1], newLocList);
            }
        } catch (error) {
            //
        } finally {
            handleOnClickToggleModal();
        }
    };
    const getBetDetailsData = async (oddsfilter, min, max, newlocList = summaryList, locList = summaryList || []) => {
        const quaryData = getQuaryData(newlocList);
        localStorage.setItem('oddsfilter', JSON.stringify([min, max]));
        try {
            !oddsfilter && setIsOddsLoading(true);
            if (quaryData) {
                const response = await getBetDetails(
                    uid,
                    racetype,
                    quaryData?.locations,
                    quaryData?.packages,
                    oddsfilter,
                    min,
                    max,
                    odds,
                    locList.map((item) => item.LOCID) || [],
                    allStake
                );
                if (response) {
                    setOdds(response?.oddset || []);
                    setMinHotBet(response?.minhotbet);
                    settotalBetsRef(response?.totaltips);
                    // totalBetsRef.current = response?.totaltips || totalBetsRef.current
                }
            }
        } catch (error) {
            //
        } finally {
            setIsOddsLoading(false);
        }
    };

    const handleOnClicklocationItem = (locationId) => {
        setSelectedLocationId(locationId);
        getModalData([locationId]);
    };


    const addHBBetslip = async (bet) => {
        const url = `${process.env.server}/hbet/AddtoBetslip`;
        const body = {
            userid: user.userID ? user.userID : '',
            clientid: user.clientID ? user.clientID : '',
            bets: bet,
            isSingle: false,
        };
        const response = await authAPI(url, body, 'POST', true);
        setLoadingBetSlip(false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE > 0) {
                setErrorDesc(response.data.ERROBJ.ERRORDESC);
            } else {
                let bets = response.data.BETS;
                // if (bets && Object.values(response.data.bets).length > 0) {
                //     settotalBetsRef(Object.values(response.data.bets)[0].totaltips)
                // }
                bets.map((data, idx) => {
                    addBetsToBetslip({ key: 'hotbet', bets: data });
                });
                if (session) {
                    if (totalbets == 0) {
                        //if single tap on, open betslip automatically
                        user.singletap == 1 ? handleBetSlip() : handleAlert();
                    } else {
                        handleAlert();
                    }
                } else {
                    totalbets == 0 ? handleBetSlip() : handleAlert();
                }
            }
        } else {
            setErrorDesc(response.desc);
        }
    };

    setTimeout(() => {
        errordesc != '' && setErrorDesc('');
    }, 5000);

    function addBetsToLocal() {
        localStorage.removeItem('betsAdded');
        localStorage.setItem('betsAdded', JSON.stringify(tips));
    }

    useEffect(() => {
        addBetsToLocal();
    }, [tips]);

    const checkDeselected = (unicValue) => {
        return deselectArray.find((element) => element === unicValue);
    };

    const renderHBStakingOptions = () => {
        return <HotBetStakingOptions
            totalBetsRef={totalBetsRef}
            handleOnClickSeeBetDetails={handleOnClickSeeBetDetails}
            isloading={showGetTips ? false : isOddsloading}
            stake={odds}
            setStake={setOdds}
            updateBetSlipCount={setBetSlipCount}
            betSlipCount={betSlipCount}
            onClickOddsFilter={getBetDetailsData}
            allStake={allStake}
            setAllStake={setAllStake}
            minHotBet={minHotBet}
            setPotentialReturnStake={setPotentialReturnStake}
            setTotalStake={setTotalStake}
            totalStake={totalStake}
            potentialReturnStake={potentialReturnStake}
            error={error}
            setError={setError}
            currentFocus={currentFocus}
            showGetTips={showGetTips}
            setIsExpanded={setIsExpanded}
            isExpanded={isExpanded}
            isAddtoBetLoading={isAddtoBetLoading}
            loadingBetSlip={loadingBetSlip}
            checkDeselected={checkDeselected}
            getModalData={getModalData}
            setLoadingBetSlip={setLoadingBetSlip}
            handleBetSlip={handleBetSlip}
            data={data}
            summaryList={summaryList}
            deselectArray={deselectArray}
            index={index}
        />
    }

    return (
        <>
            {!hidestats && (
                <Box my={1}>
                    <StatsDetails
                        data={data}
                        colorId={colorId}
                        selectedCategory={selectedCategory}
                        adDetail={adDetail}
                        title={title}
                        HBMarket={HBMarket}
                    />
                </Box>
            )}
            <Box
                sx={{ cursor: 'pointer', bgcolor: 'grey.main' }}
                className={classes.rowsWrapper}
                onClick={() => {
                    if (!isExpanded) {
                        handleOnClickSeeBetDetails();
                    }
                }}
            >
                <TipLocations
                    summaryList={summaryList}
                    isExpanded={isExpanded && !showGetTips}
                    checkDeselected={checkDeselected}
                    handleOnClicklocationItem={handleOnClicklocationItem}
                    handleOnClickSeeBetDetails={handleOnClickSeeBetDetails}
                    classes={classes}
                    uid={uid}
                    index={index}
                />
            </Box>
            {!showGetTips && renderHBStakingOptions()}
            {
                showGetTips &&
                <HBAddToBetSlip
                    showGetTips={showGetTips}
                    totalBetsRef={totalBetsRef}
                    betSlipCount={totalBetsRef}
                    checkDeselected={checkDeselected}
                    getModalData={getModalData}
                    setIsExpanded={setIsExpanded}
                    getBetDetailsData={getBetDetailsData}
                    currentFocus={currentFocus}
                    isExpanded={isExpanded}
                    isAddtoBetLoading={isAddtoBetLoading}
                    setLoadingBetSlip={setLoadingBetSlip}
                    loadingBetSlip={loadingBetSlip}
                    handleBetSlip={handleBetSlip}
                    data={data}
                    selectedCategory={selectedCategory}
                    summaryList={summaryList}
                />
            }
            {errordesc != '' && (
                <Box
                    sx={{
                        backgroundColor: 'error.light',
                        my: 1,
                        py: 1,
                        px: 3,
                        mx: 1,
                    }}
                >
                    <Typography
                        sx={{
                            color: 'error.main',
                            fontSize: 14,
                        }}
                    >
                        {errordesc}
                    </Typography>
                </Box>
            )}
            <TipLocationModal
                isModalOpen={isModalOpen}
                onClose={handleOnClickToggleModal}
                data={tipLocationData}
                isloading={isloading}
                handelSelectLocation={handelSelectLocation}
                hideDeSelect={summaryList.length - deselectArray.length <= 1}
                showSelect={summaryList.length - deselectArray.length >= 1}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={alertTip.open}
                autoHideDuration={5000}
                onClose={handleAlertClose}
                sx={{ bottom: { xs: 60, sm: 0 } }}
                TransitionComponent={alertTip.Transition}
                onClick={handleAlertClose}
                message={<CustomALert severity="success" content={`Selection added to Bet Slip`} warning={true} isHtml={false} />}
            />
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </>
    );
};

export default BetDetailsTab;

const useStyles = makeStyles((theme) => ({
    rowsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.background.default,
    },
    rowContainerExpanded: {
        background: theme.palette.primary.main,
        paddingLeft: '15px',
        paddingRight: '12px',
        margin: '5px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30px',
    },
    rowContainer: {
        background: theme.palette.background.whiteBackground,
        paddingLeft: '15px',
        paddingRight: '12px',
        margin: '5px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30px',
    },
    nameText: {
        fontSize: theme.typography.hotbet.subTitle,
    },
    detailsText: {
        textAlign: 'center',
        color: theme.palette.text.blueText,
    },
}));

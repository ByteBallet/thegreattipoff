import CustomALert from '@Components/Shared/CustomALert';
import CustomDialog from '@Components/Shared/CustomDialog';
import authAPI from '@Components/utils/authAPI';
import { TipContext } from '@Context/Tip/TipProvider';
import { UserContext } from '@Context/User/UserProvider';
import HotBetStakingOptions from '@modules/HotBets/Tabs/BetDetailsTab/HotBetStakingOptions';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { getBetDetails, getHBTipMarket, getHBTipster } from '@services/hotbets/hotbetsService';
import { getQuaryData, getToDate } from '@utils/hotBetUtils';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import moment from 'moment';

const TipsterHotBets = ({ card, selectedCategory, totalBets = 0, loadIframe, setloadIframe, onClose, selectedType, defaultRType }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter();
    const [odds, setOdds] = useState([]);
    const { user } = useContext(UserContext);
    const [betSlipCount, setBetSlipCount] = useState(0);
    const [allStake, setAllStake] = useState();
    const [minHotBet, setMinHotBet] = useState(0);
    const [potentialReturnStake, setPotentialReturnStake] = useState(0);
    const [totalStake, setTotalStake] = useState(0);
    const [error, setError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [totalBetsRef, settotalBetsRef] = useState(totalBets);
    const [summaryList, setsummary] = useState([]);
    const [loading, setloading] = useState(true);
    const currentFocus = useRef();
    const { tips, addBetsToBetslip } = useContext(TipContext);
    const [betErr, setbetErr] = useState('');

    useEffect(() => {
        getHBTipMarketData();
    }, []);

    const getHBTipMarketData = async (init = false) => {
        let fromDate = moment().format('YYYY-MM-DD')
        let toDate = moment(fromDate).add(5, 'days').format('YYYY-MM-DD')
        try {
            setloading(true);
            const response = await getHBTipster(user?.userID, card?.ALIAS || card?.alias, card?.USERID, defaultRType || 'X', fromDate, toDate);
            if (response && !response.error) {
                let summary = response?.data?.HBMarket?.hbtipsummary;
                if (summary?.length > 0) {
                    const filteredSummary = summary.filter((data) => data?.USERID === card?.USERID);
                    setsummary(filteredSummary);
                    const ttBetsRef = filteredSummary.reduce((sum, tip) => sum + +tip.NTIPS, 0);
                    settotalBetsRef(ttBetsRef);
                } else {
                    setsummary([]);
                }
            }
        } catch (error) {
        } finally {
            setloading(false);
        }
    };

    const handleOnClickSeeBetDetails = () => {
        error && setError(false);
        let hbFilterInit = process.env.APP_BRAND == 'gto' ? HOT_BET_ODD_FILTER.initialGTOStart : HOT_BET_ODD_FILTER.initialStart;
        let hbFilterEnd = process.env.APP_BRAND == 'gto' ? HOT_BET_ODD_FILTER.initialGTOEnd : HOT_BET_ODD_FILTER.initialEnd;
        let oddsFilter = localStorage.getItem('oddsfilter') ? JSON.parse(localStorage.getItem('oddsfilter')) : [hbFilterInit, hbFilterEnd];
        !isExpanded && getBetDetailsData(true, oddsFilter[0], oddsFilter[1]);
        !isExpanded && setIsExpanded(true);
    };

    const getBetDetailsData = async (oddsfilter, min, max, newlocList = summaryList, locList = summaryList || []) => {
        const quaryData = getQuaryData(newlocList);
        localStorage.setItem('oddsfilter', JSON.stringify([min, max]));
        try {
            if (quaryData) {
                const response = await getBetDetails(
                    card?.USERID,
                    card?.RACETYPE ?? selectedType,
                    quaryData?.locations,
                    quaryData?.packages,
                    true,
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
        }
    };
    const checkDeselected = (unicValue) => {
        let deselectArray = [];
        return deselectArray.find((element) => element === unicValue);
    };

    const addHBBetslip = async (bet) => {
        const url = `${process.env.server}/hbet/AddtoBetslip`;
        const body = {
            userid: user.userID ? user.userID : 0,
            clientid: user.clientID ? user.clientID : '',
            bets: bet,
            isSingle: false,
        };
        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE > 0) {
                //  setErrorDesc(response.data.ERROBJ.ERRORDESC);
            } else {
                let bets = response.data.BETS;
                if (bets?.length > 0) {
                    let hbId = Object.values(bets?.[0])?.[0]?.betID;
                    setloadIframe(`${hbId}`);
                    onClose();
                } else {
                    setbetErr('Unable to process');
                }
            }
        } else {
            setbetErr(response.desc);
        }
    };

    setTimeout(() => {
        betErr != '' && setbetErr('');
    }, 5000);

    return (
        <Box py={2}>
            {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            {!loading && totalBetsRef > 0 && totalBetsRef <= 50 && summaryList?.length > 0 && (
                <Box sx={{ bgcolor: 'background.default' }}>
                    <Stack direction="row" alignItems={'center'} justifyContent="start" px={2} py={2}>
                        <Image src="/images/icon/icon-coin.png" alt="Tips" width={20} height={20} />
                        <Typography fontWeight={'bold'} fontSize={20} ml={1}>
                            Bet on Tips
                        </Typography>
                    </Stack>
                    <Divider sx={{ borderColor: '#d0d1d2', boxShadow: '0 1px #fff', mx: 2 }} />
                    <Grid container spacing={0} mt={2}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <HotBetStakingOptions
                                    totalBetsRef={totalBetsRef}
                                    handleOnClickSeeBetDetails={handleOnClickSeeBetDetails}
                                    isloading={false}
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
                                    setIsExpanded={setIsExpanded}
                                    isExpanded={isExpanded}
                                    data={card}
                                    selectedCategory={selectedCategory}
                                    summaryList={summaryList}
                                    checkDeselected={checkDeselected}
                                    fromGetTips={true}
                                    addHBBetslip={addHBBetslip}
                                />
                            </Grid>
                            {betErr != '' && (
                                <Grid item xs={12} sx={{ py: 2 }}>
                                    <CustomALert content={betErr} severity="error" warning={true} isHtml={false} />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default TipsterHotBets;

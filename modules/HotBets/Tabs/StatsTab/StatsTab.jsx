import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Snackbar, Stack, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { LOCAL_STORAGE_KEY, HOT_BET_DATA } from '@lib/constants';
import { HB_STATS_TABS } from '@lib/constants';
import AddToBetSlipButton from '@modules/HotBets/Components/AddToBetSlipButton';
import StatsDetails from '@modules/HotBets/Components/StatsDetails';

import Profile from './Profile';
import RecentWinners from './RecentWinners';
import Tabs from './Tabs';
import DetailedStats from './DetailedStats';
import authAPI from '@Components/utils/authAPI';
import { TipContext } from '@Context/Tip/TipProvider';
import { setHBStructure } from '@utils/hotBetUtils';
import { UserContext } from '@Context/User/UserProvider';
import { useSession } from 'next-auth/client';
import CustomALert from '@Components/Shared/CustomALert';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import FollowButton from '@Components/Tipster/FollowButton';

const StatsTab = ({
    selectedType,
    uid,
    data,
    colorId,
    selectedCategory,
    adDetail,
    title,
    betSlipCount,
    packid,
    racingPageTopButton,
    mainHotBet,
    handleTabOnClick,
    handleAlert,
    handleBetSlip,
    openBetSlip,
    setopenBetSlip,
    alertTip,
    raceid,
    handleAlertClose,
    settriggerDetails,
    HBMarket = {},
}) => {
    const [session] = useSession();
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(HB_STATS_TABS.RECENT_WINNERS);
    const [isExpanded, setIsExpanded] = useState(false);
    const { tips, addBetsToBetslip } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [loadingBetSlip, setLoadingBetSlip] = useState(false);
    const [err, seterr] = useState('');

    let totalbets = 0;
    Object.keys(tips).map((key, idx) => {
        key != 'multi' && (totalbets = totalbets + (tips[key] ? tips[key].length : 0));
    });

    const handleOnClickSeeBetDetails = () => {
        setIsExpanded(!isExpanded);
    };

    const handleTabClick = (value) => {
        setSelectedTab(value);
    };
    const renderContent = () => {
        switch (selectedTab) {
            case HB_STATS_TABS.DETAILD_STATS:
                return (
                    <DetailedStats
                        selectedType={selectedType}
                        selectedCategory={selectedCategory}
                        uid={uid}
                        statType={data?.STATTYPE}
                        adid={data?.ADVERTID}
                        packid={packid}
                        timeperiod={data?.TIMEPERIOD}
                        locid={data?.LOCID}
                    />
                );
            case HB_STATS_TABS.RECENT_WINNERS:
                return (
                    <RecentWinners
                        selectedCategory={selectedCategory}
                        selectedType={selectedType}
                        uid={uid}
                        adid={data?.ADVERTID}
                        locid={data?.LOCID}
                        HBMarket={HBMarket}
                    />
                );
            case HB_STATS_TABS.PROFILE:
                return <Profile selectedType={selectedType} uid={uid} name={data?.ALIAS} />;
            default:
                return '';
        }
    };

    const handleClick = () => {
        if (racingPageTopButton) {
            AddToBetSlip();
        } else {
            handleTabOnClick(1);
            settriggerDetails(true);
        }
    };
    const AddToBetSlip = () => {
        err != '' && seterr('');
        setLoadingBetSlip(true);
        const newHotBetItem = setHBStructure([], [], data, 0, data?.RACETYPE, [], true, '', 'TBD', [raceid]);
        newHotBetItem && addHBBetslip(newHotBetItem);
        const existingHotBet = localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA)
            ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA))
            : [];

        existingHotBet.push(newHotBetItem);

        localStorage.setItem(LOCAL_STORAGE_KEY.HOT_BET_DATA, JSON.stringify(existingHotBet));
    };

    const addHBBetslip = async (bet) => {
        const url = `${process.env.server}/hbet/AddtoBetslip`;
        const body = {
            userid: user.userID ? user.userID : '',
            clientid: user.clientID ? user.clientID : '',
            bets: bet,
            isSingle: true,
        };
        const response = await authAPI(url, body, 'POST', true);
        setLoadingBetSlip(false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE > 0) {
                seterr(response.data.ERROBJ.ERRORDESC);
            } else {
                let bets = response.data.BETS;
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
            response.desc && seterr(response.desc);
        }
    };

    function addBetsToLocal() {
        localStorage.removeItem('betsAdded');
        localStorage.setItem('betsAdded', JSON.stringify(tips));
    }

    useEffect(() => {
        addBetsToLocal();
    }, [tips]);

    setTimeout(() => {
        err != '' && seterr('');
    }, 5000);

    return (
        <>
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
            {racingPageTopButton && data?.NTIPS > 0 && (
                <>
                    <hr className={classes.border} />
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        mb={2}
                        onClick={() => {
                            handleOnClickSeeBetDetails();
                        }}
                    >
                        <Typography sx={{ cursor: 'pointer' }} className={classes.detailsText}>
                            {isExpanded ? 'hide results & stats' : 'See results & stats'}
                        </Typography>
                        {isExpanded ? (
                            <ExpandLess sx={{ color: '#3069d8', fontSize: 20 }} />
                        ) : (
                            <ExpandMore sx={{ color: '#3069d8', fontSize: 20 }} />
                        )}
                    </Stack>
                </>
            )}
            {(data?.NTIPS > 0 && data?.TIPSNOTSHOW == 1) ? (
                <AddToBetSlipButton betSlipCount={betSlipCount} onClick={handleClick} loading={loadingBetSlip} uid={data?.USERID} />
            ) : (
                <Box m={2}>
                    <FollowButton follow={data?.FOLLOWING} tipster={data?.ALIAS} tipsterid={data?.USERID} fullwidth={true} />
                </Box>
            )}
            {err != '' && (
                <Box mb={1} px={2}>
                    <CustomALert content={err} severity="error" warning={false} isHtml={false} />
                </Box>
            )}
            {(mainHotBet || isExpanded || data?.NTIPS == 0) && (
                <>
                    <Tabs selectedTab={selectedTab} handleTabOnClick={handleTabClick} />
                    {renderContent()}
                </>
            )}
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

export default StatsTab;

const useStyles = makeStyles((theme) => ({
    rowsWrapper: {
        width: '100%',
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
        fontSize: theme.typography.hotbet.subTitle,
        textAlign: 'center',
        color: theme.palette.text.blueText,
    },
    border: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        margin: '0 22px 10px 22px',
    },
}));

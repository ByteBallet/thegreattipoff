import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Typography, Avatar, Stack, Grid, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ebGradient } from '@lib/constants';
import { getSummaryTabTitles } from '@utils/hotBetUtils';

import HotBetCardTabs from './HotBetCardTabs';
import TabContent from './TabContent';
import StatsTab from '../Tabs/StatsTab/StatsTab';
import moment from 'moment';
import HotBetOddsApprox from '../Components/HotBetOddsApprox';
import FollowButton from '@Components/Tipster/FollowButton';
import { kFormatter } from '@Components/utils/util';
import NumberFormat from 'react-number-format';
const useStyles = makeStyles((theme) => ({
    //
    mainRowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        padding: '8px 0 8px 8px',
    },
    avatar: {
        width: 56,
        height: 56,
        border: 'solid',
        borderColor: '#ffffff',
        borderWidth: '1px',
    },
    nameText: {
        color: 'black',
        fontSize: 15,
    },
    titleText: {
        fontSize: 12,
    },
    betCoutWrapper: {
        justifyContent: 'flex-end',
        paddingRight: 2,
        width: '25%',
    },
}));

const HotBetCard = ({
    card,
    index,
    summary,
    selectedCategory,
    hotBetAdDetail,
    selectedType,
    racingPageTopButton,
    raceid = '',
    oddsRange = [],
    showBets = false,
    activeTab = 1,
    HBMarket = {},
}) => {
    const classes = useStyles();
    const title = getSummaryTabTitles(card);
    const [summaryList, setSummaryList] = useState([]);
    const [adDetail, setAdDetail] = useState();
    const [totalBetsRef, settotalBetsRef] = useState(card?.NTIPS);
    const [triggerDetails, settriggerDetails] = useState(false);
    let colorCode = index % 3;

    const data = [
        { id: 1, name: 'Bet Details' },
        { id: 3, name: 'Stats' },
    ];

    useEffect(() => {
        const filteredSummary = summary?.length > 0 && summary.filter((data) => data?.USERID === card?.USERID);
        setSummaryList(filteredSummary);
    }, []);

    useEffect(() => {
        try {
            setAdDetail(hotBetAdDetail[card?.USERID]);
        } catch (error) {
            console.log('error', error);
        }
    }, [hotBetAdDetail]);

    const [selectedTab, setSelectedTab] = useState(activeTab == 'stats' ? 3 : 1);

    const handleTabOnClick = (value) => {
        setSelectedTab(value);
    };

    const getTipsterName = () => {
        if (card?.DISPNAME === 0) {
            return card?.ALIAS;
        } else {
            return `${card?.FIRSTNAME} ${card?.SURNAME}`;
        }
    };

    const [openBetSlip, setopenBetSlip] = useState(false);

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

    const handleAlert = () => {
        setTimeout(() => {
            setalertTip({
                ...alertTip,
                open: true,
            });
        }, 20);
    };

    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };
    let today = moment().utc();
    let chkTipTime = moment.utc(card.TIPENDTIME).diff(today) < 0;

    return (
        <React.Fragment>
            {!chkTipTime && (
                <Card key={index} sx={{ mb: 1 }}>
                    <CardContent
                        sx={{
                            backgroundImage: `linear-gradient(to right, ${ebGradient[colorCode]?.leftGradient},${ebGradient[colorCode]?.rightGradient})`,
                            margin: 0,
                            p: 0,
                        }}
                    >
                        <Grid
                            container
                            spacing={1}
                            flexWrap="nowrap"
                            alignItems="center"
                            py={1}
                            sx={{
                                backgroundImage: `url(${process.env.cdn}/images/hotbet/hbflame-${colorCode + 1}.png)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '65% 0%',
                                backgroundSize: 'contain',
                            }}
                            justifyContent="space-between"
                        >
                            <Grid container item xs={8.5} flexWrap="nowrap">
                                <Avatar
                                    sx={{ ml: 1 }}
                                    className={classes.avatar}
                                    src={`${process.env.cdn}/images/avatar/${card?.AVATARPATH}`}
                                    aria-label="recipe"
                                    alt={card?.ALIAS}
                                />
                                <Stack direction="column" sx={{ ml: 1 }} justifyContent="center">
                                    <Typography className={classes.nameText}>
                                        <b>{getTipsterName()}</b>
                                    </Typography>
                                    <Typography className={classes.titleText} sx={{ lineHeight: 1 }}>
                                        {card?.TIPSTERORG}
                                    </Typography>
                                    {card?.FOLLOWERS > 0 && (
                                        <Typography className={classes.titleText} sx={{ lineHeight: 1 }}>
                                            <Typography className={classes.titleText} sx={{ fontWeight: 'bold' }}>
                                                {kFormatter(card?.FOLLOWERS || 0)}
                                            </Typography>
                                            &nbsp;{card?.FOLLOWERS && 'followers'}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs="auto" container justifyContent="flex-end">
                                {
                                    racingPageTopButton ? (
                                        <HotBetOddsApprox
                                            oddsRange={oddsRange}
                                            userid={card?.USERID}
                                            raceid={raceid}
                                            racingPageTopButton={racingPageTopButton}
                                        />
                                    ) : (
                                        card?.NTIPS > 0 && (
                                            <FollowButton follow={card?.FOLLOWING} tipster={card?.ALIAS} tipsterid={card?.USERID} />
                                        )
                                    )
                                    // <Typography className={classes.titleText} noWrap align="right" mr={1}>
                                    //     <b>{`${totalBetsRef} bet${totalBetsRef > 1 ? 's' : ''}`}</b>
                                    // </Typography>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                    {racingPageTopButton || card?.NTIPS == 0 ? (
                        <StatsTab
                            selectedType={selectedType}
                            uid={card?.USERID}
                            data={card}
                            colorId={colorCode}
                            selectedCategory={selectedCategory}
                            adDetail={adDetail}
                            title={title}
                            betSlipCount={card?.NTIPS}
                            racingPageTopButton
                            handleTabOnClick={handleTabOnClick}
                            openBetSlip={openBetSlip}
                            setopenBetSlip={setopenBetSlip}
                            handleAlertClose={handleAlertClose}
                            alertTip={alertTip}
                            handleAlert={handleAlert}
                            handleBetSlip={handleBetSlip}
                            raceid={raceid}
                            settriggerDetails={settriggerDetails}
                            triggerDetails={triggerDetails}
                            HBMarket={HBMarket}
                        />
                    ) : (
                        <>
                            <HotBetCardTabs
                                colorId={colorCode}
                                selectedTab={selectedTab}
                                handleTabOnClick={handleTabOnClick}
                                data={data}
                                totalBets={totalBetsRef}
                                HBMarket={HBMarket}
                            />
                            <TabContent
                                selectedTab={selectedTab}
                                data={card}
                                colorId={colorCode}
                                summaryList={summaryList}
                                selectedCategory={selectedCategory}
                                hotBetAdDetail={hotBetAdDetail}
                                selectedType={selectedType}
                                index={index}
                                mainHotBet
                                handleTabOnClick={handleTabOnClick}
                                openBetSlip={openBetSlip}
                                setopenBetSlip={setopenBetSlip}
                                handleAlertClose={handleAlertClose}
                                alertTip={alertTip}
                                handleAlert={handleAlert}
                                handleBetSlip={handleBetSlip}
                                settotalBetsRef={settotalBetsRef}
                                settriggerDetails={settriggerDetails}
                                triggerDetails={triggerDetails}
                                showBets={showBets}
                                totalBetsRef={totalBetsRef}
                                HBMarket={HBMarket}
                            />
                        </>
                    )}
                </Card>
            )}
        </React.Fragment>
    );
};

export default HotBetCard;

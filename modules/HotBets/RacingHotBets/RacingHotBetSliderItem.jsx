import React, { useEffect, useState, useContext } from 'react';
import {
    Typography,
    Avatar,
    Stack,
    Box,
    Grid,
    Card,
    CardContent,
    SvgIcon,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LOCAL_STORAGE_KEY, HOT_BET_DATA } from '@lib/constants';
import { getSummaryTabTitles, setHBStructure, toTitleCase } from '@utils/hotBetUtils';
import authAPI from '@Components/utils/authAPI';
import StatsDetails from '../Components/StatsDetails';
import AddToBetSlipButton from '../Components/AddToBetSlipButton';
import { TipContext } from '@Context/Tip/TipProvider';
import { UserContext } from '@Context/User/UserProvider';
import CustomALert from '@Components/Shared/CustomALert';
import { useSession } from 'next-auth/client';
import moment from 'moment';
import RaceFieldCountdownRenderer from '@Components/Racing/RaceFieldCountdownRenderer';
import Countdown from 'react-countdown';
import HotBetOddsApprox from '../Components/HotBetOddsApprox';
import horses from '@public/images/svg/horse-racing.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import Link from 'next/Link';
import FollowButton from '@Components/Tipster/FollowButton';
import { getTipsterAlias, kFormatter } from '@Components/utils/util';
import TipsterStatDetails from './TipsterStatDetails';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import Image from 'next/image';

const RacingHotBetSliderItem = ({
    card,
    index,
    hotBetAdDetail,
    selectedCategory,
    handleBetSlip,
    handleAlert,
    raceid,
    trending = false,
    oddsrange = [],
    isResultedRace = false,
    getTipsterCarousel,
    manageBook = false,
    isCarousel = false,
    isHomePage = false,
}) => {
    const isGTO = process.env.APP_BRAND == 'gto';
    const [session] = useSession();
    const classes = useStyles();
    const [adDetail, setAdDetail] = useState();
    const title = getSummaryTabTitles(card);
    const { tips, addBetsToBetslip } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [err, seterr] = useState('');
    const [loadingBetSlip, setLoadingBetSlip] = useState(false);
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);

    let totalbets = 0;
    Object.keys(tips).map((key, idx) => {
        key != 'multi' &&
            (totalbets = totalbets + (tips[key] ? tips[key].length : 0));
    });

    useEffect(() => {
        if (!trending) {
            try {
                setAdDetail(hotBetAdDetail[card?.USERID]);
            } catch (error) {
                console.log('adDetail--- rrr', error);
            }
        }
    }, [hotBetAdDetail]);

    const getTipsterName = () => {
        if (card?.DISPNAME === 0) {
            return card?.ALIAS;
        } else {
            return `${card?.FIRSTNAME} ${card?.SURNAME}`;
        }
    };
    const AddtoBetslip = () => {
        setLoadingBetSlip(true);
        err != '' && seterr('');
        const newHotBetItem = setHBStructure(
            [],
            [],
            card,
            0,
            card?.RACETYPE,
            [],
            true,
            '',
            'TBD',
            [trending ? card?.RACEID : raceid],
            trending ? card?.CAT : selectedCategory
        );
        newHotBetItem && addHBBetslip(newHotBetItem);
        const existingHotBet = localStorage.getItem(
            LOCAL_STORAGE_KEY.HOT_BET_DATA
        )
            ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA))
            : [];

        existingHotBet.push(newHotBetItem);

        localStorage.setItem(
            LOCAL_STORAGE_KEY.HOT_BET_DATA,
            JSON.stringify(existingHotBet)
        );
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
                setTimeout(() => {
                    if (session) {
                        if (totalbets == 0) {
                            //if single tap on, open betslip automatically
                            user.singletap == 1
                                ? handleBetSlip()
                                : handleAlert();
                        } else {
                            handleAlert();
                        }
                    } else {
                        totalbets == 0 ? handleBetSlip() : handleAlert();
                    }
                }, 100);
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

    let local_date = card?.RACETIMEUTC
        ? moment.utc(card?.RACETIMEUTC)?.local()?.format()
        : '';
    let local_time = card?.RACETIMEUTC
        ? moment.utc(card?.RACETIMEUTC)?.local()?.format('HH:mm')
        : '';

    const handleOnClickGetTips = () => {
        setOpenGetTipsModal(true)
    }
    return (
        <React.Fragment>
            {
                card &&
                <Card
                    sx={{
                        width: '300px',
                        minHeight: trending && !isCarousel ? '100px' : '150px',
                    }}
                >
                    <CardContent
                        sx={{
                            p: 1.5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            height: isCarousel ? 'auto' : 1,
                        }}
                    >
                        <Grid
                            container
                            columnSpacing={1}
                            alignItems="start"
                            sx={{
                                height: isCarousel ? '60px' : 1,
                            }}
                        >
                            {trending && !isCarousel && (
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    justifyContent={'space-between'}
                                    alignItems="center"
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: '#d0d1d2',
                                        pb: 0.5,
                                        mb: 1,
                                    }}
                                >
                                    {card?.NTIPS > 0 ? (
                                        <React.Fragment>
                                            <Link
                                                href={
                                                    card?.RACEMEET && card?.RACEID
                                                        ? `/racing/${card.RACEMEET.toLowerCase()}/${card.RACEID
                                                        }`
                                                        : ''
                                                }
                                            >
                                                <Stack
                                                    direction="row"
                                                    alignItems={'center'}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {card.RACETYPE == 'R' ? (
                                                        <SvgIcon
                                                            color="grey.light"
                                                            component={horses}
                                                            viewBox="0 0 466.36 510.95"
                                                            sx={{ fontSize: 25 }}
                                                        />
                                                    ) : card.RACETYPE == 'H' ? (
                                                        <SvgIcon
                                                            color="grey.light"
                                                            component={harness}
                                                            viewBox="0 0 1101 1850"
                                                            sx={{ fontSize: 25 }}
                                                        />
                                                    ) : (
                                                        <SvgIcon
                                                            color="grey.light"
                                                            component={greys}
                                                            viewBox="0 0 1633 1465"
                                                            sx={{ fontSize: 25 }}
                                                        />
                                                    )}
                                                    <Typography
                                                        fontSize={13}
                                                        className="textCapitalize"
                                                        ml={1}
                                                    >
                                                        {card.RACEMEET
                                                            ? card.RACEMEET.toLowerCase()
                                                            : ''}
                                                        &nbsp;-&nbsp;
                                                        <b>R{card?.RACENUMBER}</b>
                                                    </Typography>
                                                </Stack>
                                            </Link>
                                            <Typography fontSize={13}>
                                                <Countdown
                                                    overtime={true}
                                                    date={new Date(local_date)}
                                                    renderer={
                                                        RaceFieldCountdownRenderer
                                                    }
                                                    local_time={local_time}
                                                    status={'open'}
                                                    onStart={() => {
                                                        if (
                                                            isResultedRace ||
                                                            manageBook
                                                        ) {
                                                            // reload after 2 minutes
                                                            let a = moment().utc();
                                                            if (
                                                                moment
                                                                    .utc(
                                                                        card.RACETIMEUTC
                                                                    )
                                                                    .diff(a) < 0
                                                            ) {
                                                                setTimeout(() => {
                                                                    getTipsterCarousel();
                                                                }, 120000);
                                                            }
                                                        }
                                                    }}
                                                    onStop={() => { }}
                                                    onComplete={() => {
                                                        if (
                                                            isResultedRace ||
                                                            manageBook
                                                        ) {
                                                            // reload after 2 minutes
                                                            setTimeout(() => {
                                                                getTipsterCarousel();
                                                            }, 120000);
                                                        }
                                                    }}
                                                />
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Typography
                                                variant="h2"
                                                component="p"
                                                fontWeight="fontWeightBold"
                                                sx={{ fontSize: 13 }}
                                            >
                                                Trending{' '}
                                                <img
                                                    src={`/images/tools/hot-bet-icon-orange.png`}
                                                    width={15}
                                                />{' '}
                                                Tipster
                                            </Typography>
                                            {card?.FOLLOWERS > 0 && (
                                                <Typography
                                                    fontSize={12}
                                                    color="black.main"
                                                >
                                                    <b>
                                                        {kFormatter(
                                                            card?.FOLLOWERS || 0
                                                        )}
                                                    </b>{' '}
                                                    <Typography
                                                        fontSize={12}
                                                        sx={{
                                                            lineHeight: 1,
                                                            color: 'grey.hb',
                                                        }}
                                                    >
                                                        Followers
                                                    </Typography>
                                                </Typography>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Grid>
                            )}
                            <Grid container item xs={2.5} alignItems="start">
                                <Box className={classes.avatarContainer} sx={{ position: "relative" }}>
                                    <Image
                                        layout="fill"
                                        alt={getTipsterName()}
                                        src={`${process.env.cdn}/images/avatar/${card?.AVATARPATH}`}
                                        style={{ width: '100%', height: '100%', position: "relative", borderRadius: "50%" }}
                                    />
                                </Box>
                                <Typography
                                    className="lineClamp"
                                    sx={{
                                        textAlign: 'center',
                                        fontSize: 11,
                                        mt: 0.5,
                                        width: '100%',
                                    }}
                                >
                                    {card?.TIPSTERORG}
                                </Typography>
                            </Grid>
                            <Grid container item xs={9.5}>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        alignItems="center"
                                        justifyContent={'space-between'}
                                        sx={{ pb: 0.5 }}
                                    >
                                        <Grid container item xs zeroMinWidth>
                                            <Link
                                                href={`/tipster/${getTipsterAlias(card?.ALIAS)}`}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: 15,
                                                        fontWeight: '700',
                                                        cursor: 'pointer',
                                                    }}
                                                    className="lineClamp"
                                                >
                                                    {getTipsterName()}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                        {/* {
                                    trending && card?.NTIPS > 0 &&
                                    <Grid item xs="auto">
                                        <FollowButton follow={card?.FOLLOWING} tipster={card?.ALIAS} tipsterid={card?.USERID} />
                                    </Grid>
                                } */}
                                    </Grid>
                                    <Box style={{ height: 75, mb: 1 }}>
                                        <StatsDetails
                                            data={card}
                                            colorId={0}
                                            selectedCategory={
                                                trending ? card?.CAT : selectedCategory
                                            }
                                            adDetail={
                                                trending
                                                    ? card?.HOTBETADDETAIL &&
                                                        card?.HOTBETADDETAIL[card?.USERID]
                                                        ? card?.HOTBETADDETAIL[
                                                        card?.USERID
                                                        ]
                                                        : {}
                                                    : adDetail
                                            }
                                            title={title}
                                            trending={trending}
                                            isHorizontal
                                            isCarousel={isCarousel}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ minHeight: '15px' }}>
                            {isCarousel && (
                                <Box sx={{}}>
                                    <TipsterStatDetails
                                        card={card}
                                        isCarousel={isCarousel}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            sx={{ height: 1 }}
                        >
                            <Grid
                                item
                                xs={4}
                                container
                                justifyContent="start"
                                sx={{ height: 1 }}
                            >
                                {card?.NTIPS > 0 && oddsrange?.length > 0 ? (
                                    <HotBetOddsApprox
                                        oddsRange={oddsrange}
                                        userid={card?.USERID}
                                        raceid={trending ? card?.RACEID : raceid}
                                    />
                                ) : (
                                    ''
                                )}
                            </Grid>
                            <Grid item xs={8} container justifyContent="start">
                                <Box
                                    sx={{
                                        width: '100%',
                                        mt: 1,
                                        mb: 1,
                                    }}
                                >
                                    {card?.NTIPS > 0 ? (
                                        (isGTO && card?.TIPSNOTSHOW == 1) ?
                                            <Box mb={2.2} mt={1.1}>
                                                <FollowButton
                                                    follow={card?.FOLLOWING}
                                                    tipster={card?.ALIAS}
                                                    tipsterid={card?.USERID}
                                                    fullwidth={true}
                                                    format="btn"
                                                />
                                            </Box> :
                                            <Box sx={{}}>
                                                <AddToBetSlipButton
                                                    betSlipCount={card?.NTIPS}
                                                    onClick={isGTO ? handleOnClickGetTips : AddtoBetslip}
                                                    isAddtoBetLoading={
                                                        err != '' ? true : false
                                                    }
                                                    isHorizontal
                                                    loading={loadingBetSlip}
                                                    variant={isGTO ? 'get-tip' : 'add-bet'}
                                                    skipSessionChk={isGTO ? true : false}
                                                    uid={card?.USERID}
                                                />
                                            </Box>
                                    ) : (
                                        <Box mb={2.2} mt={1.1}>
                                            <FollowButton
                                                follow={card?.FOLLOWING}
                                                tipster={card?.ALIAS}
                                                tipsterid={card?.USERID}
                                                fullwidth={true}
                                                format="btn"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                        {err != '' && (
                            <Typography
                                color="error.alerttext"
                                align="center"
                                sx={{ mb: 1 }}
                            >
                                Event Closed
                            </Typography>
                        )}
                        <LoadGetTips
                            isCarousel={true}
                            open={openGetTipsModal}
                            setOpenGetTipsModal={setOpenGetTipsModal}
                            alias={toTitleCase(card?.ALIAS)}
                            tipster={card}
                            selectedCategory={trending ? card?.CAT : selectedCategory}
                            selectedType={card?.RACETYPE}
                            handleBetSlip={handleBetSlip}
                            totalBets={card?.NTIPS}
                        />
                    </CardContent>
                </Card>
            }
        </React.Fragment>
    );
};

export default RacingHotBetSliderItem;

const useStyles = makeStyles({
    cardWrapper: {
        width: 320,
        background: 'white',
        borderRadius: 8,
        padding: '10px 10px 0px 10px',
    },
    cardContainer: {
        flexDirection: 'row',
    },
    avatarContainer: {
        width: 50,
        height: 50,
    },
    detailWrapper: {
        paddingLeft: '10px',
        flexDirection: 'column',
    },
});

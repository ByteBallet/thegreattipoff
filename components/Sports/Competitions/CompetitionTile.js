import React from 'react';
import { useState, useContext, useRef, useEffect } from 'react';
import moment from 'moment';
import Link from "next/Link"
import { useSession } from "next-auth/client"
import { Box, Grid, Stack, Typography, Fade, Snackbar } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Countdown from 'react-countdown';
import SportsOdds from '../SportsOdds';
import SportsCountdownRenderer from '../SportsCountdownRenderer';
import Singles from '@Models/Tip/Singles';
import { getBetID } from '@Components/utils/RacingUtil';
import { TipContext } from '@Context/Tip/TipProvider';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import CustomALert from '@Components/Shared/CustomALert';
import { UserContext } from '@Context/User/UserProvider';
import InfoAlert from '@Components/Shared/InfoAlert';
import BoxDivider from '@Components/Shared/BoxDivider';

const CompetitionTile = ({ sport, setRender, type = "h2h", link, hideDetails = false,
    styles, animateMarket, isSGM = false, status, addTipToBetSlip,
    hideLogo = false, view = "all", frmMarket = false, betsLocal, featured = false, showOnlyOdds = false }) => {
    const [session] = useSession();
    const { tips, addTip, removeTip } = useContext(TipContext);
    const { user } = useContext(UserContext)
    const [eventStatus, seteventStatus] = useState('open');
    const [suspendtime, setsuspendtime] = useState(sport.suspendtime);
    const [sgmError, setsgmError] = useState(false);
    const countDownRef = useRef();
    const refIDHome = useRef();
    useEffect(() => {
        return () => clearInterval(refIDHome.current);
    }, []);

    let totalbets = 0
    Object.keys(tips).map((key, idx) => {
        key != "multi" && (totalbets = totalbets + (tips[key] ? tips[key].length : 0))
    })

    let local_date = moment.utc(suspendtime).local().format();
    let local_day = moment.utc(suspendtime).local().format('dddd');
    let local_time = moment.utc(suspendtime).local().format('HH:mm');
    let diff = moment(moment().format('YYYY-MM-DD')).diff(moment(local_date).format('YYYY-MM-DD'), "days")
    let event_day = diff == 0 ? "Today" : diff == -1 ? "Tomorrow" : local_day
    let oddsA = sport.teama.win
    let oddsB = sport.teamb.win
    let lineA = ""
    let lineB = ""
    let titleA = sport?.teama?.teamname
    let titleB = sport?.teamb?.teamname
    let shadow = true
    let betproducts = sport.productmenu && sport.productmenu.h2h ? sport.productmenu.h2h.betproducts : []
    let productGroupType = sport.productmenu && sport.productmenu.h2h ? sport.productmenu.h2h.label : "Win"
    type = type.replace(/ /g, "")

    if (type == "line") {
        oddsA = sport.teama.linediv ? sport.teama.linediv : 0
        oddsB = sport.teamb.linediv ? sport.teamb.linediv : 0
        lineA = sport.teama.line ? "(" + (sport.teama.line.toString().indexOf("-") > -1 ? sport.teama.line : ("+" + sport.teama.line)) + ")" : ""
        lineB = sport.teamb.line ? "(" + (sport.teamb.line.toString().indexOf("-") > -1 ? sport.teamb.line : ("+" + sport.teamb.line)) + ")" : ""
        betproducts = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].betproducts : []
        productGroupType = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].label : "Win"
    } else if (type == "total") {
        titleA = "Over " + sport.totalover
        titleB = "Under " + sport.totalunder
        oddsA = sport.totaloverdiv
        oddsB = sport.totalunderdiv
        shadow = false
        betproducts = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].betproducts : []
        productGroupType = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].label : "Win"
    }
    else if (type == "margin1") {
        oddsA = sport.teama.Margin1Div ? sport.teama.Margin1Div : 0
        oddsB = sport.teamb.Margin1Div ? sport.teamb.Margin1Div : 0
        shadow = false
        betproducts = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].betproducts : []
        productGroupType = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].label : "Win"
    }
    else if (type == "margin2") {
        oddsA = sport.teama.Margin2Div ? sport.teama.Margin2Div : 0
        oddsB = sport.teamb.Margin2Div ? sport.teamb.Margin2Div : 0
        shadow = false
        betproducts = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].betproducts : []
        productGroupType = sport.productmenu && sport.productmenu[type] ? sport.productmenu[type].label : "Win"
    }

    let tip = new Singles(
        sport.eventid.toString(),
        sport.eventid,
        sport.eventid,
        "TIP",
        "win",
        moment.utc(suspendtime).local().format("DD MMM YYYY"),
        0,
        "",
        "sports",
        sport.sportcode,
        "",
        suspendtime,
        sport.eventdesc,
        "",
        "",
        sport.sportcode,
        null,
    );

    const addToBetSlip = (key, position, betType, pgType, event) => {
        tip.betID = moment().valueOf()
        tip.productGroupType = "Fixed"
        tip.eventname = betType == "draw" ? "DRAW" : pgType
        tip.betType = betType
        tip.price = betType == "draw" ? sport.draw : (position == "0" ? oddsA : oddsB)
        tip.fieldName = betType == "draw" ? (titleA + (sport.isUS ? " @ " : " vs ") + titleB) : position == "0" ? titleA + " " + lineA : titleB + " " + lineB
        tip.isSGM = isSGM
        tip.subEventType = betType != "draw" ? (sport?.teama?.teamname + (sport.isUS ? " @ " : " vs ") + sport?.teamb?.teamname) : ""
        if (frmMarket) {
            addTipToBetSlip(event, tip)
        } else {
            let selected = tips.singles.filter((sTip) => getBetID(sTip) === getBetID(tip)).length > 0 ? true : false;
            if (selected) {
                removeTip({ key: key, tip });
            } else {
                addTip({ key: key, tip });
                //check for user login
                if (session) {
                    if (totalbets == 0) {
                        //if single tap on, open betslip automatically 
                        user.singletap == 1 ? handleBetSlip() : handleAlertClick()
                    } else {
                        handleAlertClick()
                    }
                } else {
                    totalbets == 0 ? handleBetSlip() : handleAlertClick()
                }
            }
        }
    }

    const renderSportsOdds = (title, line, odds, teamcode, position, shadow, logo) => {
        return <SportsOdds
            team={title}
            line={line}
            odds={odds}
            teamcode={showOnlyOdds ? teamcode : hideLogo ? "" : teamcode}
            position={position}
            addToBetSlip={addToBetSlip}
            shadow={shadow}
            logo={hideLogo ? "" : logo}
            tipId={`${sport.eventid}_${sport.eventid}_TIP`}
            betType={title.toLowerCase() == "draw" ? "draw" : position == "0" ?
                betproducts.teama.btype + (betproducts.teama.mod1 ? "~" + betproducts.teama.mod1 : "") + (betproducts.teama.mod2 ? "~" + betproducts.teama.mod2 : "") :
                betproducts.teamb.btype + (betproducts.teamb.mod1 ? "~" + betproducts.teamb.mod1 : "") + (betproducts.teamb.mod2 ? "~" + betproducts.teamb.mod2 : "")
            }
            productGroupType={productGroupType}
            status={status ? status : eventStatus}
            eventid={sport.eventid}
            type={type}
            hideLogo={hideLogo}
            view={view}
            betsLocal={betsLocal}
            featured={featured}
            showOnlyOdds={showOnlyOdds}
        />
    }

    const [openBetSlip, setopenBetSlip] = useState(false);

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };
    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

    const handleAlertClick = () => {
        setalertTip({
            ...alertTip,
            open: true,
        });
    };

    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };

    function resultsCheck() {
        const newIntervalId = setInterval(() => {
            const url = `${process.env.server}/sports/GetEventMatch`;
            // TODO: To be replaced by clientid
            let body = {
                eventid: sport.eventid,
                submarketgroup: true,
                sgm: false,
                clientid: user.clientID ? user.clientID : "",
                status: true
            };
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                },
                body: JSON.stringify(body),
            };

            fetch(url, options)
                .then((res) => res.json())
                .then((data) => {
                    let raceState = status ? status : eventStatus
                    if (data.ERROBJ.ERRORCODE > 0) {
                        raceState = "closed"
                    } else {
                        raceState = data.sportevent.eventstatus.toLowerCase();
                        setsuspendtime(data.sportevent.suspendtime)
                    }
                    if (!raceState) return;

                    if (raceState.toLowerCase() !== 'open') {
                        seteventStatus(raceState);
                        //refresh page
                        setRender(true)
                        if (
                            countDownRef.current &&
                            !countDownRef.current.isStopped()
                        ) {
                            countDownRef.current.stop();
                        }
                    }

                    if (raceState.toLowerCase() !== 'open') {
                        clearInterval(refIDHome.current);
                    }
                })
                .catch((e) => console.log(e));
        }, 10000);

        refIDHome.current = newIntervalId;
    }
    let subMarketCount = 0
    sport.productmenu && (
        Object.keys(sport.productmenu).map(key => {
            if (sport.productmenu[key].status === true) {
                subMarketCount = subMarketCount + 1
            }
        }
        )
    )
    let submarkets = sport.submarkets.length > 0 ? sport.submarkets.length : 0
    subMarketCount = subMarketCount + submarkets
    let showDraw = (type == "draw" || (type == "h2h" && sport.sportcode != "RGLE" && sport.sportcode != "AFL" && sport.sportcode != "RGUN")) && sport.draw && view == "all"
    return (
        <React.Fragment>
            {
                (oddsA > 0 || oddsB > 0) &&
                <Box px={2} py={1}
                    sx={{
                        width: "100%",
                        bgcolor: showOnlyOdds ? "inheit" : featured ? "background.default" : "white.main"
                    }}
                    mt={styles ? 2 : 0}>
                    {
                        !hideDetails &&
                        <Link href={link + `/${sport.sportcode}`}>
                            <Grid container spacing={0} mb={1} sx={{ cursor: "pointer" }}>
                                <Grid container item xs={12} sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Stack direction="row" alignItems="center" >
                                        <Countdown
                                            overtime={true}
                                            date={new Date(local_date)}
                                            renderer={SportsCountdownRenderer}
                                            onStart={() => {
                                                let a = moment().utc();
                                                if (moment.utc(suspendtime).diff(a) < 0) {
                                                    resultsCheck();
                                                }
                                            }}
                                            onComplete={() => {
                                                resultsCheck();
                                            }}
                                        />
                                        <Typography fontSize={12} mr={1} noWrap>
                                            &nbsp;&nbsp;|&nbsp;&nbsp;{event_day}&nbsp;{local_time}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" className={styles ? (animateMarket ? `${styles.subMarketsGlow}` : `${styles.subMarkets}`) : null}>
                                        <Typography fontSize={12}>
                                            {subMarketCount > 0 ? subMarketCount : "More"}&nbsp;Market{subMarketCount > 1 && "s"}
                                        </Typography>
                                        <KeyboardArrowRightOutlinedIcon fontSize='small' />
                                    </Stack>
                                </Grid>
                                {
                                    (sport?.location?.length > 0) &&
                                    <Grid item xs={12}>
                                        <Typography color="inherit" fontSize={11} align="center" sx={{ display: "flex", justifyContent: "start", color: "grey.main" }} noWrap>
                                            {sport?.location}
                                        </Typography>
                                    </Grid>
                                }
                                <Grid container item xs={12} sx={{ flexDirection: "row", alignItems: "center" }}>
                                    <Typography
                                        fontSize={14}
                                        component='p'
                                        noWrap
                                        sx={{ width: "95%" }}
                                        color="info.comment">
                                        <b>{sport?.teama?.teamname}</b>&nbsp;{sport.isUS ? "@" : "vs"}&nbsp;<b>{sport?.teamb?.teamname}</b>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Link>
                    }
                    <Grid container columnSpacing={1} justifyContent="space-between">
                        {
                            oddsA > 0 && type != "draw" &&
                            <Grid item zeroMinWidth xs={showOnlyOdds ? 5 : showDraw ? 4.5 : 6}>
                                {renderSportsOdds(titleA, lineA, oddsA, sport.teama.teamcode, "0", shadow, sport.teama.teamcode != "" ? true : false)}
                            </Grid>
                        }
                        {
                            showDraw &&
                            <Grid item zeroMinWidth xs={type != "draw" ? 3 : 12}>
                                {renderSportsOdds("Draw", "", sport.draw, "", "0", false, false)}
                            </Grid>

                        }
                        {
                            oddsB > 0 && type != "draw" &&
                            <Grid item zeroMinWidth xs={showOnlyOdds ? 5 : showDraw ? 4.5 : 6}>
                                {renderSportsOdds(titleB, lineB, oddsB, sport.teamb.teamcode, "1", shadow, sport.teamb.teamcode != "" ? true : false)}
                            </Grid>
                        }
                        {
                            sport?.comment?.length > 0 && false &&
                            <Grid item xs={12}>
                                <BoxDivider />
                                <Typography color="inherit" fontSize={12} align="center" sx={{ display: "flex" }}>{sport?.comment}</Typography>
                            </Grid>
                        }
                    </Grid>
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
                        message={
                            <CustomALert
                                severity="success"
                                content={`Selection added to Bet Slip`}
                                warning={true}
                                isHtml={false}
                            />
                        }
                    />
                </Box>
            }
            {
                !featured &&
                <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
            }
        </React.Fragment>

    );
};

export default CompetitionTile;
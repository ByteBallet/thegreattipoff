import React from 'react';
import { useContext, useState, useEffect, useTransition } from 'react';
import { Box, Stack, Grid, ButtonGroup, IconButton, Divider, Typography } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import TeamsContainer from './TeamsContainer';
import Home from "../../../styles/Home.module.css";
import { MainCategoryButton } from '@Components/BetHome/MainCategoryButton';
import BoxDivider from '@Components/Shared/BoxDivider';
import CustomTabs from '@Components/Shared/CustomTabs';
import SGMSummaryBar from '../SGMSummaryBar';
import EventMarkets from './EventMarkets';
import { UserContext } from '@Context/User/UserProvider';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import { TipContext } from '@Context/Tip/TipProvider';
import SGMAlertModal from '../SGMAlertModal';
import GetMultiCombos from '@Components/utils/GetMultiCombos';
import getMultiBoostDetails from '@services/Betslip/getMultiBoostDetails';

const EventDetails = ({ handleStateUpdates, expand, parentSGM, events, showMoreEvents,
    active, dispatch, activeTab, matches, y, sport, comp, expanded, eventid, containerRef,
    oddsObj, multiError, status, handleOnClose }) => {
    const [isPending, startTransition] = useTransition();
    const { user } = useContext(UserContext)
    const { tips } = useContext(TipContext);
    const [openBetSlip, setopenBetSlip] = useState(false);
    const [sgmAlert, setsgmAlert] = useState(false);
    let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
    const [betsLocal, setBets] = useState(Object.keys(bets).length > 0 ? bets[eventid] : []);

    const setBetsLocal = (bets) => {
        startTransition(() => {
            // Transition: Show the results
            setBets(bets)
        });
    }

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };
    let marketTabs = ["All"]
    if (active == "all") {
        marketTabs = events.marketmenu ? events.marketmenu.map((market) => market.marketlabel.replace("Markets", "")) : marketTabs
    } else {
        marketTabs = events.sgmmarkets ? [events.sgmmarkets.grouplabel] : marketTabs
    }
    const handleClick = (active, label) => {
        dispatch({
            type: 'update',
            payload: {
                active: active,
                activeTab: 0,
                expanded: events.sgmmarkets && active == "sgm" ? events.sgmmarkets.grouplabel : label

            }
        })
    }

    useEffect(() => {
        let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        setBetsLocal((Object.keys(bets).length > 0 && bets[eventid]) ? bets[eventid] : []);
    }, [eventid]);


    useEffect(() => {
        multiError.error && handleStateUpdates("multiError", {
            error: false,
            desc: "",
            type: "info",

        })
        // if (active == "sgm") {
        //     //check if singles exist
        //     if (tips.singles.length > 0) {
        //         !checkSGMAvailable() && setsgmAlert(true)
        //     }
        // }
    }, [active])

    //CHECK IF SGM IN BETSLIP
    const checkSGMAvailable = () => {
        let chk = false
        if (tips.singles.length == 0) {
            chk = true
        } else if (tips.singles.length > 0) {
            let sgmLegs = tips.singles.filter((leg) => leg.product.toLowerCase() == "sgm" && leg.eventId == eventid)
            chk = tips.multi && tips.multi.length > 0 && tips.multi[0].sgm == eventid && (sgmLegs.length == tips.singles.length)
        }
        return chk
    }

    const handleTabChange = (event, newValue) => {
        dispatch({
            type: 'update',
            payload: {
                activeTab: newValue,
                expanded: marketTabs[newValue] == "All" ? "Popular" : marketTabs[newValue]

            }
        })
    };


    //API CHECK IF SGM POSSIBLE
    const checkSGMEligible = async (singles, tip, clear = false) => {
        let multi = [{
            singles: [],
            doubles: { stake: "", totalstake: "" },
            trebles: { stake: "", totalstake: "" },
            four: { stake: "", totalstake: "" },
            five: { stake: "", totalstake: "" },
            combos: GetMultiCombos(0),
            legs: 0,
            stake: "1",
            price: "",
            hasTote: false,
            isBonusBet: false,
            isBoost: false,
            sameRaceMulti: false,
            boostAvailable: false,
            boost: {},
            sgm: false,
            sportConflict: false
        }]

        let selectedSinglesId = []
        let multiError = false
        let singlesArr = clear ? singles : [...singles, tip]
        let res = {}
        if (singlesArr.length > 1) {
            singlesArr.map((item) => {
                let leg = {
                    eventId: "",
                    competitorId: "",
                    bookieeventid: "",
                    betID: "",
                    betType: "",
                    price: "",
                    stype: "",
                    sportType: "",
                }
                leg.eventId = item.eventId
                leg.competitorId = item.competitorId
                leg.betID = item.betID
                leg.betType = item.betType
                //if boost, consider actual price for multis
                leg.price = item.isBoost ? item.betPrice : item.price
                leg.stype = item.stype
                leg.bookieeventid = item.bookieeventid
                leg.sportType = item.sportType
                selectedSinglesId.push(leg)
            })
            multi[0].singles = selectedSinglesId
            const resp = await getMultiBoostDetails(multi, user.clientID ? user.clientID : "", user.multiBoostBal, true);
            if (resp && Object.keys(resp).length > 0) {
                if (resp.multierror && resp.multierror.errocode == 99) {
                    res.multiError = true
                } else {
                    res.multiError = false
                }
                res.multiodds = !res.multiError ? resp.multierror.multidiv : oddsObj.odds
            } else {
                res.multiError = true
                res.multiodds = oddsObj.odds
            }
        } else {
            res.multiodds = oddsObj.odds
            res.multiError = true
        }
        return res
    }
    let eventdesc = ""
    let compName = ""
    if (events && events.teama && events.teamb) {
        eventdesc = events?.teama?.teamname + (events.isUS ? " @ " : " vs ") + events?.teamb?.teamname
        compName = events.eventdesc
    }
    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.2} my={0.1}
                        sx={{
                            bgcolor: expand ? "white.main" : "grey.primary",
                            width: "100%"
                        }}
                        ref={containerRef}>
                        <Box sx={{ bgcolor: "grey.tipBtn", width: matches && matches.length > 1 ? "90%" : "100%" }}>
                            <TeamsContainer match={events} status={status} handleStateUpdates={handleStateUpdates} />
                        </Box>
                        {
                            matches && matches.length > 1 &&
                            <Box sx={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <IconButton aria-label="expand" onClick={showMoreEvents} sx={{ p: 0 }}>
                                    {
                                        expand ? <UnfoldLessIcon fontSize='large' sx={{ color: "black.main" }} /> : <UnfoldMoreIcon fontSize='large' sx={{ color: "black.main" }} />
                                    }
                                </IconButton>
                            </Box>
                        }
                    </Stack>
                </Grid>
                {
                    parentSGM &&
                    <Grid item xs={12} pt={1}>
                        <Box className={Home.optionBox}>
                            <ButtonGroup
                                variant="contained"
                                className={Home.btnGrp}
                                style={{
                                    height: "40px",
                                    backgroundColor: "#fff"
                                }}
                                sx={{
                                    border: 1,
                                    borderColor: "grey.border1",
                                    boxShadow: "none"
                                }}>
                                <MainCategoryButton
                                    key="00-1"
                                    onClickFunc={() => handleClick("all", "popular")}
                                    activeCategory={active == "all" ? "All Markets" : "Same Game Multi"}
                                    value="All Markets"
                                    icon={null}
                                    activeColor="primary.main"
                                    type="sports"
                                />
                                &nbsp;&nbsp;&nbsp;
                                <MainCategoryButton
                                    key="00-2"
                                    onClickFunc={() => handleClick("sgm", marketTabs[0])}
                                    activeCategory={active == "all" ? "All Markets" : "Same Game Multi"}
                                    value="Same Game Multi"
                                    icon={null}
                                    activeColor="primary.main"
                                    type="sports"
                                />
                            </ButtonGroup>
                        </Box>
                    </Grid>
                }
                {
                    active != "sgm" && events.marketmenu.length > 2 &&
                    <Grid item xs={12} px={1}>
                        <Box my={1}>
                            <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
                        </Box>
                        <CustomTabs
                            tabs={marketTabs}
                            handler={handleTabChange}
                            active={activeTab}
                            label="Market"
                            showscrollbuttons={true}
                        />
                    </Grid>
                }
            </Grid>
            <Grid container rowSpacing={events.marketmenu ? 2 : 0} columnSpacing={1} mt={1} sx={{ bgcolor: "background.default" }}>
                <EventMarkets
                    events={events}
                    activeTab={activeTab}
                    menu={marketTabs}
                    expanded={expanded}
                    active={active}
                    comp={comp}
                    handleBetSlip={handleBetSlip}
                    status={status}
                    setBetsLocal={setBetsLocal}
                    betsLocal={betsLocal}
                    handleStateUpdates={handleStateUpdates}
                    marketTabs={marketTabs}
                    parentSGM={parentSGM}
                    oddsObj={oddsObj}
                    checkSGMAvailable={checkSGMAvailable}
                    checkSGMEligible={checkSGMEligible}
                    startTransition={startTransition}
                    eventdesc={eventdesc}
                    compName={compName}
                />
            </Grid>
            {
                events?.comment?.length > 0 &&
                <Box sx={{ bgcolor: "background.default", py: 4, px: 2, color: "grey.main", display: "flex", justifyContent: "center" }}>
                    <Typography color="inherit" fontSize={14} align="center" fontWeight={"bold"}><b>Event Rules</b>: {events?.comment}</Typography>
                </Box>
            }
            {
                active == "sgm" &&
                <SGMSummaryBar
                    betsLocal={betsLocal}
                    eventid={eventid}
                    setBetsLocal={setBetsLocal}
                    odds={oddsObj.odds}
                    loading={oddsObj.loading}
                    checkSGMEligible={checkSGMEligible}
                    handleStateUpdates={handleStateUpdates}
                    handleBetSlip={handleBetSlip}
                    isPending={isPending}
                    eventdesc={eventdesc}
                    compName={compName}
                />
            }

            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
            <SGMAlertModal sgmAlert={sgmAlert} setsgmAlert={setsgmAlert} setBetsLocal={setBetsLocal} />
        </React.Fragment>
    );
};

export default EventDetails;
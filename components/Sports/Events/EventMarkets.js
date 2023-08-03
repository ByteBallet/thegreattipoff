import React from 'react';
import { useState, useContext, useEffect, useRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { getBetID } from '@Components/utils/RacingUtil';
import { TipContext } from '@Context/Tip/TipProvider';
import { useSession } from "next-auth/client"
import moment from 'moment';
import { UserContext } from '@Context/User/UserProvider';
import TrendingMarketDetails from './TrendingMarketDetails';
import MarketAccordion from './MarketAccordion';
import { makeStyles } from '@mui/styles';
import getthemeOptions from "themeOptions";

let options = getthemeOptions();

const useStyles = makeStyles(theme => ({
    activebutton: {
        backgroundColor: theme.palette.primary.main
    },
    inactivebutton: {
        backgroundColor: theme.palette.grey.tipBtn
    },
}));

const EventMarkets = ({ events, activeTab, menu,
    expanded, active, comp, handleBetSlip, status, checkSGMAvailable,
    setBetsLocal, betsLocal, handleStateUpdates, marketTabs, parentSGM,
    oddsObj, checkSGMEligible, eventdesc, compName
}) => {
    const classes = useStyles();
    const [show, setShow] = useState(0);
    const { tips, addTip, removeTip } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [session] = useSession();
    const oddsBtn = useRef(null);
    const sgmbets = useRef([]);
    const sgmOddsRef = useRef([]);
    const typingTimer = useRef(null);

    const handleChange = (panel) => (event, isExpanded) => {
        handleStateUpdates("expanded", isExpanded ? panel : "")
        show != 0 && setShow(0)
    };

    useEffect(() => {
        show != 0 && setShow(0)
        active == "sgm" && handleStateUpdates("expanded", "Popular")
    }, [active])

    useEffect(() => {
        show != 0 && setShow(0)
    }, [activeTab])

    useEffect(() => {
        sgmbets.current = betsLocal
        //remove class from ele
        sgmOddsRef && sgmOddsRef.current && sgmOddsRef.current.map((ele) => {
            ele.classList.remove(classes.activebutton)
            ele.classList.remove(classes.inactivebutton)
        })
        sgmOddsRef.current = []
    }, [betsLocal])

    useEffect(() => {
        return () => clearTimeout(typingTimer.current);
    }, []);

    let totalbets = 0
    Object.keys(tips).map((key, idx) => {
        key != "multi" && (totalbets = totalbets + (tips[key] ? tips[key].length : 0))
    })


    const handleSuccessAlert = () => {
        handleStateUpdates("multiError", {
            error: true,
            desc: "Selection added to Bet Slip",
            type: "success",

        })
    }


    const addSingles = (tip) => {
        let selected = tips.singles.filter((sTip) => getBetID(sTip) === getBetID(tip)).length > 0 ? true : false;
        if (selected) {
            removeTip({ key: "singles", tip });
        } else {
            addTip({ key: "singles", tip })
            //check for user login
            if (session) {
                if (totalbets == 0) {
                    //if single tap on, open betslip automatically 
                    user.singletap == 1 ? handleBetSlip() : handleSuccessAlert()
                } else {
                    handleSuccessAlert()
                }
            } else {
                totalbets == 0 ? handleBetSlip() : handleSuccessAlert()
            }
        }
    }

    const addTipToBetSlip = (event, tip) => {
        tip.betID = moment().valueOf()
        if (active != "sgm") {
            // logic for all markets
            addSingles(tip)
        }
        else {
            //sgm logic
            addTipToSGM(event, tip)
            //checkSGMAvailable() ? addTipToSGM(event, tip, sgm) : addSingles(tip, sgm)
        }
    }

    const calcOdds = async () => {
        let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        let data = bets[events.eventid] ? bets[events.eventid] : []
        if (sgmbets.current.length > 1) {
            handleStateUpdates("oddsObj", {
                odds: oddsObj.odds,
                loading: true
            })
            const res = await checkSGMEligible(sgmbets.current, {}, true)
            if (res.multiError) {
                handleStateUpdates("multiError", {
                    error: true,
                    desc: "Selection cannot be added to existing combinations",
                    type: "info",

                })
                handleStateUpdates("oddsObj", {
                    odds: res.multiodds,
                    loading: false
                })
                //retain last selection in each market
                let s1 = sgmbets.current.filter((leg) => leg.bookieeventid != sgmbets.current.at(-1).bookieeventid)
                let s2 = sgmbets.current.filter((leg) => leg.bookieeventid == sgmbets.current.at(-1).bookieeventid)
                let singles = [...s1, s2.at(-1)]
                if (singles.length != sgmbets.current.length) {
                    //recalculate odds with updated singles
                    sgmbets.current = singles
                    calcOdds()
                }
                sgmbets.current = singles
            } else {
                handleStateUpdates("oddsObj", {
                    odds: res.multiodds,
                    loading: false
                })
            }
        }
        bets[events.eventid] = sgmbets.current
        localStorage.setItem("SGM", JSON.stringify(bets));
        setBetsLocal(sgmbets.current)
    }

    const addTipToSGM = (event, tip) => {
        clearTimeout(typingTimer.current);
        oddsBtn.current = event.currentTarget
        let arr = sgmbets.current
        let chkField = arr ? arr.findIndex((sTip) => getBetID(sTip) === getBetID(tip)) : null;
        if (chkField == -1 || chkField == null) {
            //oddsBtn.current.style.backgroundColor = options.colors.primary_main
            oddsBtn.current.classList.add(classes.activebutton);
            if (arr.length > 10) {
                handleStateUpdates("multiError", {
                    error: true,
                    desc: "You have reached the maximum amount of legs in your Same Game Multi",
                    type: "error",

                })
            } else {
                arr.push(tip)
            }
        } else {
            //oddsBtn.current.style.backgroundColor = "#f0f1f2"
            oddsBtn.current.classList.add(classes.inactivebutton);
            arr.splice(chkField, 1)
        }
        sgmOddsRef.current.push(oddsBtn.current)
        sgmbets.current = arr
        typingTimer.current = setTimeout(() => {
            calcOdds()
        }, 200);
    }

    const getMarketAccordion = (label, showPopular) => {
        return <MarketAccordion
            label={label}
            events={events}
            activeTab={activeTab}
            menu={marketTabs}
            expanded={expanded}
            active={active}
            comp={comp}
            handleBetSlip={handleBetSlip}
            status={status}
            betsLocal={betsLocal}
            handleChange={handleChange}
            addTipToBetSlip={addTipToBetSlip}
            setShow={setShow}
            show={show}
            parentSGM={parentSGM}
            showPopular={showPopular}
            eventdesc={eventdesc}
            compName={compName}
        />
    }
    return (
        <React.Fragment>
            {
                active == "sgm" &&
                <Grid item xs={12}>
                    {getMarketAccordion("Popular", true)}
                </Grid>
            }
            {
                marketTabs[activeTab].toLowerCase() == "all" ?
                    marketTabs.map((market, idx) =>
                        market != "All" && <Grid item xs={12} key={idx}>
                            {getMarketAccordion(market)}
                        </Grid>)
                    :
                    <Grid item xs={12}>
                        {getMarketAccordion(marketTabs[activeTab])}
                    </Grid>
            }
        </React.Fragment>
    );
};

export default EventMarkets;
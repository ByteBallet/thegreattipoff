import React from 'react';
import { useState, useEffect, useContext, useReducer } from 'react';
import {
    Drawer, Button, Grid, Typography, Stack, Box, IconButton,
    SvgIcon, Divider, AppBar, Toolbar, CircularProgress, useMediaQuery
} from '@mui/material';
import NumberFormat from 'react-number-format';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Trash from "../../public/images/svg/trash.svg";
import BetSlipSingleLegs from '@Components/BetSlip/BetSlipSingleLegs';
import { getBetID, getOddsPrices } from '@Components/utils/RacingUtil';
import { TipContext } from '@Context/Tip/TipProvider';
import { UserContext } from '@Context/User/UserProvider';
import { useSession } from "next-auth/client"
import CheckSGMMultiCominations from '@Components/utils/CheckSGMMultiCominations';
import moment from 'moment';
import checkSGMBoost from '@Components/utils/checkSGMBoost';

const SGMSummaryBar = ({ betsLocal, eventid, setBetsLocal, odds,
    loading, checkSGMEligible, handleStateUpdates, handleBetSlip, isPending, eventdesc, compName }) => {

    const isDesktop = useMediaQuery('(min-width:900px)');
    const { tips, addTip, addBetsToBetslip } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [expand, setExpand] = useState(false);
    const [session] = useSession();
    const showSelections = () => {
        setExpand(!expand)
    }
    useEffect(() => {
        odds == 0 && getOdds()
        return () => setExpand(false);
    }, []);

    const getOdds = async () => {
        let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        let data = bets[eventid] ? bets[eventid] : []
        if (data.length > 1) {
            const res = await checkSGMEligible(data, {}, true)
            handleStateUpdates("oddsObj", {
                odds: res.multiodds,
                loading: false
            })
        }
    }

    let totalbets = 0
    Object.keys(tips).map((key, idx) => {
        key != "multi" && (totalbets = totalbets + (tips[key] ? tips[key].length : 0))
    })

    let sgmLegs = betsLocal ? betsLocal.length : 0
    const clearAllBets = () => {
        let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        bets[eventid] = []
        localStorage.setItem("SGM", JSON.stringify(bets));
        setBetsLocal([])
        handleStateUpdates("oddsObj", {
            odds: 0,
            loading: false
        })
    }

    const deleteBets = async (tip) => {
        let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        let data = bets[eventid] ? bets[eventid] : []
        data = data.filter((sTip) => getBetID(sTip) != getBetID(tip))
        bets[eventid] = data
        localStorage.setItem("SGM", JSON.stringify(bets));
        setBetsLocal(bets[eventid])
        const res = await checkSGMEligible(data, {}, true)
        handleStateUpdates("oddsObj", {
            odds: res.multiodds,
            loading: false
        })
    }

    const updateBoost = async (data) => {
        let bets = {};
        let betID = moment().valueOf()
        let multi = CheckSGMMultiCominations(data, user.clientID ? user.clientID : "", user.multiBoostBal, false, betID, odds, eventdesc, compName)
        if (multi && multi[0].singles.length > 1) {
            const res = await checkSGMBoost(multi, user.clientID ? user.clientID : "", user.multiBoostBal, true, odds);
            bets[eventid] = res[0]
            bets && res[0].price > 0 && addBetsToBetslip({ key: "sgm", bets })
        }
    }

    const addSGMToBetSlip = () => {
        let betsAdded = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        let data = betsAdded[eventid] ? betsAdded[eventid] : []
        updateBoost(data).then(() => {
            data.map((tip) => {
                let selected = tips.singles.filter((sTip) => getBetID(sTip) === getBetID(tip)).length > 0 ? true : false;
                !selected && addTip({ key: "singles", tip })
            })
            if (session) {
                if (totalbets == 0) {
                    //if single tap on, open betslip automatically 
                    user.singletap == 1 ?
                        handleBetSlip() :
                        handleSuccessAlert()
                } else {
                    handleSuccessAlert()
                }
            } else {
                totalbets == 0 ?
                    handleBetSlip() :
                    handleSuccessAlert()
            }
        })
    }

    const handleSuccessAlert = () => {
        handleStateUpdates("multiError", {
            error: true,
            desc: "Selection added to Bet Slip",
            type: "success",

        })
    }

    function addBetsToLocal() {
        localStorage.removeItem("betsAdded");
        localStorage.setItem("betsAdded", JSON.stringify(tips));
    }

    useEffect(() => {
        addBetsToLocal()
    }, [tips])

    const renderOdds = () => {
        return <React.Fragment>
            <Grid container sx={{ bgcolor: "black.main", }} px={1.2} spacing={0} p={1} alignItems="center" justifyContent="center">
                <Grid item xs container alignItems="center">
                    {
                        sgmLegs > 0 &&
                        <Typography color="white.main" fontSize={12}>{sgmLegs} {sgmLegs > 0 && "leg"}{sgmLegs > 1 && "s"}</Typography>
                    }
                    {sgmLegs > 0 && !expand &&
                        <IconButton aria-label="showSelections" onClick={showSelections} sx={{ p: 0 }}>
                            <KeyboardArrowUpIcon color="primary" fontSize='small' />
                        </IconButton>
                    }
                </Grid>
                <Grid item xs>
                    <Stack direction="row" alignItems='flex-end'>
                        <Typography color="grey.joinBorder" fontSize={12} mr={0.5}>Odds:</Typography>
                        {
                            loading ?
                                <CircularProgress size={20} sx={{ color: "grey.joinBorder" }} />
                                :
                                <Typography fontSize={12} color="white.main" fontWeight="bold">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        value={sgmLegs > 1 ? odds > process.env.client.maxLegMultiPrice ? process.env.client.maxLegMultiPrice : odds : '0'}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        displayType="text"
                                    />
                                </Typography>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={4.7}>
                    <Button
                        onClick={addSGMToBetSlip}
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{
                            width: "100%",
                            height: 40,
                            fontWeight: "bold",
                            "&.Mui-disabled": {
                                backgroundColor: "border.divider",
                                color: "grey.main"
                            },
                        }}
                        disabled={sgmLegs > 1 && odds > 0 ? false : true}>
                        Add to Slip
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    }

    const renderContent = () => {
        return <React.Fragment>
            {expand && sgmLegs > 0 &&
                <Grid
                    container
                    sx={{ bgcolor: "black.main" }}
                    px={1.2}
                    spacing={0}
                    p={1}
                    alignItems="center"
                    justifyContent="center">
                    <Grid container item xs={12} alignItems="center" sx={{ pb: { xs: 6, sm: 1 } }}>
                        <Grid item xs={12} container>
                            <Box
                                onClick={showSelections}
                                sx={{ width: "80%", display: "flex", justifyContent: "center" }} >
                                <KeyboardArrowDownIcon color="primary" fontSize='large' />
                            </Box>

                            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0}>
                                <Typography color="grey.joinBorder" fontSize={12} mr={0.5}>Clear all</Typography>
                                <IconButton color="primary" aria-label="delete" sx={{ px: 0 }} onClick={clearAllBets}>
                                    <SvgIcon component={Trash} viewBox="0 0 448 512" fontSize='small' />
                                </IconButton>
                            </Stack>
                        </Grid>
                        {
                            betsLocal && betsLocal.map((tip, idx) =>
                                <Grid item xs={12} container sx={{ color: "text.active" }} key={idx}>
                                    <Divider sx={{ borderColor: "grey.border", width: "100%", my: 0.7 }} />
                                    <BetSlipSingleLegs
                                        tip={tip}
                                        showX={true}
                                        priceerror={false}
                                        oddsBoost={false}
                                        isMulti={true}
                                        sgm={true}
                                        deleteBets={deleteBets}
                                    />
                                </Grid>
                            )
                        }
                        <Grid item xs={12}>
                            <Divider sx={{ borderColor: "grey.border" }} />
                        </Grid>
                    </Grid>
                </Grid>
            }
            {
                isDesktop ?
                    <Box sx={{ position: "sticky", bottom: 0 }}>
                        {renderOdds()}
                    </Box>
                    :
                    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                        <Toolbar disableGutters>
                            {renderOdds()}
                        </Toolbar>
                    </AppBar>
            }
        </React.Fragment>
    }

    return (
        <React.Fragment>
            {
                isDesktop ?
                    <Box sx={{ position: "sticky", bottom: 0, mt: 7 }}>
                        {renderContent()}
                    </Box> :
                    <Drawer
                        anchor="bottom"
                        hideBackdrop={true}
                        variant="persistent"
                        open={true}
                        PaperProps={{
                            style: {
                                zIndex: 10,
                                maxHeight: "80%"
                            }
                        }}
                    >
                        {renderContent()}
                    </Drawer>
            }
        </React.Fragment>
    );
};

export default SGMSummaryBar;
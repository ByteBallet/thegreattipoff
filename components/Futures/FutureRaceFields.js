import React from 'react';
import { useState, useContext } from 'react';
import { getBetID } from '@Components/utils/RacingUtil';
import { UserContext } from '@Context/User/UserProvider';
import { TipContext } from '@Context/Tip/TipProvider';
import moment from 'moment';
import { Box, Typography, Snackbar, Grid, Fade, useMediaQuery } from "@mui/material";
import Singles from '@Models/Tip/Singles';
import getBoostDetails from '@services/Betslip/getBoostDetails';
import { useSession } from "next-auth/client";
import CustomALert from '@Components/Shared/CustomALert';
import RaceOdds from '@Components/Racing/RaceDetail/RaceOdds';
import { getOddsPrices } from '@Components/utils/RacingUtil';

const FutureRaceFields = ({ raceField, raceid, columns, raceResulted,
    raceStatus, raceBetProducts, eventDetails, handleBetSlip, isJC }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { tips, addTip, removeTip } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [session] = useSession();
    const [open, setState] = useState(false);

    let tip = new Singles(
        raceid,
        eventDetails ? isJC ? eventDetails.eventid : eventDetails.BOOKIEVENTID : "",
        raceField.actualcode,
        "TIP",
        "win",
        moment.utc(raceField.racetimeutc).local().format("DD MMM YYYY"),
        raceField.fieldnum,
        raceField.fieldname,
        "racing",
        eventDetails ? isJC ? eventDetails.racetype : eventDetails.RACETYPE : "R",
        null,
        raceField.racetimeutc,
        raceField.racemeet,
        raceField.win,
        raceField.racenum,
        raceField.image,
        raceField.barrier,
        raceField.eventname,
    );

    let totalbets = 0
    Object.keys(tips).map((key, idx) => {
        key != "multi" && (totalbets = totalbets + (tips[key] ? tips[key].length : 0))
    })

    function addTipToBetSlip(key, win, odds, stype, btype) {
        tip.betType = btype
        tip.stype = stype
        tip.price = odds
        tip.betproducts = raceBetProducts
        tip.productGroupType = "Fixed"
        tip.bookieeventid = isJC ? eventDetails.eventid : eventDetails.BOOKIEVENTID
        tip.betID = moment().valueOf()
        tip.isJC = isJC
        tip.sprices = raceField?.sprices
        let selected = tips.singles.filter((sTip) => getBetID(sTip) === getBetID(tip)).length > 0 ? true : false;
        if (selected) {
            removeTip({ key: key, tip });
        }
        else {
            addTip({ key: key, tip });
            //check for user login
            if (session) {
                if (totalbets == 0) {
                    //if single tap on, open betslip automatically 
                    user.singletap == 1 ? handleBetSlip() : handleClick()
                } else {
                    handleClick()
                }
            } else {
                totalbets == 0 ? handleBetSlip() : handleClick()
            }
        }
    }

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

    const handleClick = () => {
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
    let winprice = raceField ? getOddsPrices(raceField, true, "Fixed") : 0
    let placeprice = raceField ? getOddsPrices(raceField, false, "Fixed") : 0
    return (
        <>
            {
                (winprice != 0 || placeprice != 0) &&
                (
                    <Box mx={2} sx={{ borderBottom: 1, borderColor: 'grey.border1' }} >
                        <Grid container columnSpacing={1} justifyContent="space-between">
                            <Grid item zeroMinWidth xs={isDesktop ? 10 : 7.4} container alignItems="center">
                                <Typography noWrap component="p" fontSize={13} fontWeight={isJC ? "400" : "600"}>
                                    {raceField.fieldname}
                                </Typography>
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
                                            content={`Selection added to ${process.env.client.enableTipping == true ? "Tip" : "Bet"} Slip`}
                                            warning={true}
                                            isHtml={false}
                                        />
                                    }
                                />
                            </Grid>
                            {
                                columns.map((item, idx) =>
                                    <Grid item xs={columns.length > 1 ? (isDesktop ? "auto" : 2.3) : (isDesktop ? "auto" : 4.6)} key={idx}>
                                        <RaceOdds
                                            raceField={raceField}
                                            change={idx == 0 ? raceField.winchange : raceField.placechange}
                                            fav={0}
                                            addTipToBetSlip={addTipToBetSlip}
                                            win={idx == 0}
                                            tipId={getBetID(tip)}
                                            product={idx == 0 ? raceField.winProduct : raceField.placeProduct}
                                            productGroupType="Fixed"
                                            raceResulted={raceResulted}
                                            raceStatus={raceStatus}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Box>
                )
            }
        </>
    );
};

export default FutureRaceFields;
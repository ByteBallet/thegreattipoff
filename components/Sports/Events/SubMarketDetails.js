import React, { useRef } from 'react';
import { useContext, useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import moment from 'moment';
import Singles from '@Models/Tip/Singles';
import { getBetID } from '@Components/utils/RacingUtil';
import { TipContext } from "../../../Context/Tip/TipProvider";

const SubMarketDetails = ({ market, parentMarket, comp, productGroupType,
    addTipToBetSlip, isSGM = false, show, status = "open", betsLocal, view = "all", eventid = 0, eventdesc, compName }) => {
    // let src = `${process.env.cdn}/images/sporticon/${market.teamcode.replace(/_/g, "/")}.png`
    const { tips } = useContext(TipContext);
    const colorRef = useRef("grey.tipBtn")
    let price = market.fixedwin ? market.fixedwin > 99 ? market.fixedwin.toFixed(0) : market.fixedwin <= 1 ? 0 : market.fixedwin.toFixed(2) : 0;
    let tip = new Singles(
        parentMarket.parenteventid ? parentMarket.parenteventid.toString() : eventid.toString(),
        parentMarket.eventid ? parentMarket.eventid : eventid.toString(),
        market.compid,
        "TIP",
        "win",
        moment.utc(parentMarket.suspendtime).local().format("DD MMM YYYY"),
        0,
        market.compname,
        "sports",
        parentMarket.sportcode,
        comp,
        parentMarket.suspendtime,
        parentMarket.eventdesc.substring(parentMarket.eventdesc.indexOf("-") + 1).trim(),
        price,
        "",
        parentMarket.sportcode,
        null,
        productGroupType ? productGroupType : parentMarket.eventdesc.substring(0, parentMarket.eventdesc.indexOf("-")).trim()
    );
    tip.productGroupType = "Fixed"

    const handleAddBet = (event) => {
        tip.isSGM = isSGM
        tip.subEventType = eventdesc
        tip.location = compName
        status == 'open' && addTipToBetSlip(event, tip)
    }

    const checkContext = (tip_id) => {
        return tips.singles.filter((sTip) => getBetID(sTip) === tip_id).length > 0
    }

    const checkSGMLocal = (tip_id) => {
        let tipselected = betsLocal.filter((sTip) => getBetID(sTip) === tip_id).length > 0 ? true : false;
        return tipselected
    }

    function checkTipSelected() {
        let tipselected = false
        tipselected = view == "all" ? checkContext(getBetID(tip)) : (betsLocal && checkSGMLocal(getBetID(tip)))
        return tipselected
    }

    const getBgColor = () => {
        let bg_color = "grey.tipBtn"
        if (status != 'open') {
            bg_color = "grey.disabledTip"
        } else {
            if (checkTipSelected()) {
                bg_color = "primary.main"
            } else {
                bg_color = colorRef.current
            }
        }
        return bg_color
    }

    return (
        <Grid
            container
            columnSpacing={1}
            direction="row"
            sx={{
                flexWrap: "nowrap",
                borderBottom: 1,
                borderColor: 'grey.border1',
                pt: 0.9,
                pb: 1.2,
                justifyContent: "space-between",
                alignItems: "center"
            }} >
            <Grid item zeroMinWidth xs={9.7} container sx={{ flexWrap: "nowrap" }} direction="row" alignItems='center' >
                {
                    market.teamcode &&
                    <img
                        src={`https://silks.elitebet.com.au/assets/teamsilks/silks/${market.teamcode.replace(/_/g, "/")}.png`}
                        alt={market.compname}
                        width={45}
                        height={33}
                    />
                }
                <Typography noWrap component="p" fontSize={13} fontWeight="400" ml={market.teamcode ? 1 : 0}>
                    {market.compname}
                </Typography>
            </Grid>
            <Grid item xs="auto" container justifyContent="flex-end">
                <Box
                    className="oddsBtn"
                    sx={{
                        backgroundColor: getBgColor(),
                        border: 1,
                        borderColor: "transparent",
                        borderRadius: 2,
                        borderColor: (status != 'open') ? "#f5f5f5" : "transparent",
                        cursor: "pointer"
                    }}
                    onClick={handleAddBet}>
                    <Typography
                        fontSize={14}
                        fontWeight="600"
                        sx={{
                            textAlign: "center",
                            my: "auto",
                            px: 1,
                        }}
                        color={(status != 'open') ? "grey.disabledTipText" : "black.main"}
                    >
                        {price <= 1 ? "TBD" : price}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SubMarketDetails;
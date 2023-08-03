import React, { useEffect, useState, useContext } from 'react';
import CustomOutlinedButton from '@Components/Shared/CustomOutlinedButton';
import { getTotalbets } from '@Components/utils/util';
import { TipContext } from '@Context/Tip/TipProvider';
import { Box, Divider, Grid, Stack, Typography, Fade, Snackbar, Modal, IconButton, Card, CardContent, Container } from '@mui/material';
import { CartContext } from '@Context/Cart/CartProvider';
import moment from 'moment';
import { getRaceType } from '@Components/utils/RacingUtil';
import ConfirmTipsRemove from '@Components/Shared/ConfirmTipsRemove';
import { useRouter } from 'next/router';
import CustomSuccessButton from '@Components/Shared/CustomSuccessButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TipsterSaleTips = ({ handleBetSlip, showBuyText = false, tipsterTips, onClose, clearTipslip }) => {
    const router = useRouter();
    const [open, setopen] = useState(false)
    const [expand, setexpand] = useState(false)
    const { tips, clearAll } = useContext(TipContext)
    const { cartItems, addCart } = useContext(CartContext)
    const [activePackId, setactivePackId] = useState()

    const handleClick = (packid) => {
        let pid = activePackId ? activePackId : packid
        let selectedTip = tipsterTips.filter((item) => item.PACKID == pid)
        if (selectedTip.length > 0) {
            let tip = {}
            tip.packid = selectedTip?.[0]?.PACKID
            tip.userid = selectedTip?.[0]?.USERID
            tip.price = selectedTip?.[0]?.PRICE
            tip.racetype = selectedTip?.[0]?.SELECTIONRACETYPE
            tip.title = selectedTip?.[0]?.TITLE
            if (selectedTip?.[0]?.DEFAULTPACK == 99) {
                tip.title = "Pre Purchase " + tip.title
            }
            tip.avatar = selectedTip?.[0]?.AVATARPATH
            tip.alias = selectedTip?.[0]?.ALIAS
            tip.desc = selectedTip?.[0]?.DESCRIPT
            tip.racemeet = selectedTip?.[0]?.RACEMEET
            tip.salelen = selectedTip?.[0]?.SALELEN
            tip.freq = selectedTip?.[0]?.FREQ
            tip.betID = moment().valueOf()
            addCart({ key: "packages", tip });
            onClose()
            handleBetSlip()
        }
    }
    let title = "Buy"

    const handleClose = () => {
        setopen(false)
    }

    const handleBuy = (tip) => {
        if (tip?.PURCHASED > 0) {
            handleClose()
            router.push("/tipsTransactions/purchased")
        } else {
            setactivePackId(tip?.PACKID)
            let totalbet = getTotalbets(tips)
            totalbet > 0 && setopen(true)
            if (totalbet == 0) {
                handleClick(tip?.PACKID)
                handleClose()
            }
        }
    }

    const handleClear = () => {
        clearTipslip()
        handleClick()
        handleClose()
    }

    const renderTipsByRace = (tip) => {
        let R = tip?.RACEMEETR ? <span><b style={{ color: "#902fa1" }}>R&nbsp;</b>{tip?.RACEMEETR?.toLowerCase()}</span> : ""
        let G = tip?.RACEMEETG ? (<span><b style={{ color: "#902fa1" }}>G&nbsp;</b>{tip?.RACEMEETG?.toLowerCase()}</span>) : ""
        let H = tip?.RACEMEETH ? (<span><b style={{ color: "#902fa1" }}>H&nbsp;</b>{tip?.RACEMEETH?.toLowerCase()}</span>) : ""
        return <Typography fontSize={14} className="textCapitalize" my={1} sx={{ color: "#666668" }}>
            {R}&nbsp;{G}&nbsp;{H}
        </Typography>
    }
    return (
        <React.Fragment>
            {
                tipsterTips && tipsterTips.length > 0 &&
                <Grid container spacing={1.5} px={(tipsterTips && tipsterTips.length > 0) ? 2 : 0} sx={{ my: 1 }}  >
                    {
                        tipsterTips && tipsterTips.length > 0 && tipsterTips?.map((tip, idx) =>
                            <React.Fragment key={idx} >
                                <Grid item xs={7}>
                                    <Stack direction="column" spacing={0}>
                                        <Typography component="p" fontWeight="bold" sx={{ color: "#585858", fontWeight: "600", fontSize: 17 }}>
                                            {/* {tip?.DEFAULTPACK == 99 ? "Pre-purchase" : "Buy Tips"} for {tip?.RACEDAY}&nbsp;({tip?.NUMTIPS}) */}
                                            {tip?.TITLE}
                                        </Typography>
                                        {/* <Typography fontSize={13} className="textCapitalize" color="grey.dark1">
                                            {getRaceType(tip?.SELECTIONRACETYPE?.split(","))}
                                        </Typography> */}
                                        {renderTipsByRace(tip)}
                                        <Box
                                            sx={{ display: "flex", alignItems: 'end', justifyContent: "space-between", cursor: "pointer" }}
                                            onClick={() => setexpand(!expand)}>
                                            <Typography fontSize={14} sx={{ color: "#666668" }} className={expand ? "" : "lineClamp"}>
                                                {tip?.DESCRIPT}
                                            </Typography>
                                            {
                                                tip?.DESCRIPT?.length > 50 &&
                                                <React.Fragment>
                                                    {expand ? <ExpandLessIcon sx={{ color: "#666668" }} /> : <ExpandMoreIcon sx={{ color: "#666668" }} />}
                                                </React.Fragment>
                                            }
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid item xs={5} container alignItems={"start"} justifyContent="end">
                                    <CustomSuccessButton
                                        fullwidth={true}
                                        title={tip?.PURCHASED > 0 ? 'Purchased' : `${title?.toUpperCase()} ${"$" + tip?.PRICE}`}
                                        handleClick={() => handleBuy(tip)}
                                        rounded={false}
                                        disabled={cartItems?.packages?.filter((item) => item.packid == tip.PACKID)?.length > 0}
                                        size="large"
                                        fontSize={16}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </React.Fragment>
                        )
                    }
                </Grid>
            }
            <ConfirmTipsRemove
                isOpen={open && activePackId}
                onClose={handleClose}
                title={'Tips in the tip slip will be removed'}
                onClickLeftBtn={handleClear}
                leftText={'OK'}
            />
        </React.Fragment>
    );
};


export default TipsterSaleTips;
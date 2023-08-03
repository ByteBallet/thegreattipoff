import CustomALert from '@Components/Shared/CustomALert';
import CustomOutlinedButton from '@Components/Shared/CustomOutlinedButton';
import { getTotalbets } from '@Components/utils/util';
import { TipContext } from '@Context/Tip/TipProvider';
import { Divider, FormControl, FormHelperText, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CartContext } from '@Context/Cart/CartProvider';
import ConfirmBox from '@Components/ConfirmBox/ConfirmBox';
import moment from 'moment';
import ConfirmTipsRemove from '@Components/Shared/ConfirmTipsRemove';
import { useRouter } from 'next/router';

const TipsterSubscriptionRow = ({ open, tip, handleClose, setopen, handleBetSlip, onClose, tipsterTips, clearTipslip, showText }) => {
    const router = useRouter();
    let menu = [
        { id: -1, name: 'Select type' },
        { id: 0, name: 'All Tipping Days' },
        { id: 7, name: "Saturday Tips only" }
    ];
    const { tips } = useContext(TipContext)
    const { cartItems, addCart } = useContext(CartContext)

    const [packDay, setpackDay] = useState('-1')
    const [error, seterror] = useState(false)
    const [activePackId, setactivePackId] = useState()

    const handleWeekDay = (e) => {
        if (error && e?.target?.value == -1) {
            seterror(false)
        } else {
            seterror(true)
        }
        setpackDay(e.target.value)
    }

    const handleSubscription = (tip) => {
        if (tip?.PURCHASED > 0) {
            handleClose()
            router.push("/tipsTransactions/subscriptions")
        } else {
            setactivePackId(tip?.PACKID)
            if (packDay == -1) {
                seterror(true)
            }
            else {
                error && seterror(false)
                let totalbet = getTotalbets(tips)
                totalbet > 0 && setopen(true)
                if (totalbet == 0) {
                    handleClick(tip?.PACKID)
                    handleClose()
                }
            }
        }
    }

    const handleClick = (packid) => {
        let pid = activePackId ? activePackId : packid
        let selectedTip = tipsterTips.filter((item) => item.PACKID == pid)
        if (selectedTip.length > 0) {
            let tip = {}
            tip.packid = selectedTip?.[0]?.PACKID
            tip.userid = selectedTip?.[0]?.USERID
            tip.price = selectedTip?.[0]?.SALEPRICE
            tip.racetype = selectedTip?.[0]?.RACETYPE
            tip.title = selectedTip?.[0]?.TITLE
            tip.avatar = selectedTip?.[0]?.AVATARPATH
            tip.alias = selectedTip?.[0]?.ALIAS
            tip.desc = selectedTip?.[0]?.DESCRIPT
            tip.salelen = selectedTip?.[0]?.SALELEN
            tip.freq = selectedTip?.[0]?.FREQ
            tip.packWeekDay = packDay
            tip.betID = moment().valueOf()
            addCart({ key: "packages", tip });
            onClose()
            handleBetSlip()
        }
    }

    const handleClear = () => {
        clearTipslip()
        handleClick()
        handleClose()
    }
    return (
        <React.Fragment>
            <Grid container spacing={1.5}>
                {
                    showText &&
                    <Grid item xs={12}>
                        <Typography component="p" sx={{ color: "#585858", fontWeight: "600", }}>
                            Subscribe to {tip?.SALELEN} day package
                        </Typography>
                    </Grid>
                }
                <Grid container item xs={12} spacing={1} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Grid container item xs={6}>
                        <FormControl
                            error={error && packDay == -1}
                            fullWidth
                            variant="outlined"
                            sx={{
                                ".MuiSelect-icon": {
                                    color: "black.main",
                                    fontSize: 20
                                },
                                ".MuiSelect-select": {
                                    py: 1,
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "inherit"
                                },
                            }}>
                            <Select
                                displayEmpty
                                value={packDay}
                                onChange={handleWeekDay}
                                className="textCapitalize "
                                MenuProps={{
                                    transitionDuration: 0,
                                    PaperProps: {
                                        style: {
                                            minWidth: "35vh"
                                        }
                                    }
                                }}
                                IconComponent={KeyboardArrowDownIcon}>

                                {menu.map((lc) => (
                                    <MenuItem key={lc.id} value={lc.id}>
                                        <Typography sx={{ fontSize: 14 }}>
                                            {lc.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={5}>
                        <CustomOutlinedButton
                            title={tip?.PURCHASED > 0 ? 'Purchased' : `Subscribe $${tip?.SALEPRICE}`}
                            handleClick={() => handleSubscription(tip)}
                            rounded={false}
                            color="black"
                            disabled={cartItems?.packages?.filter((item) => item.packid == tip.PACKID)?.length > 0}
                            bgcolor="grey.sportsOdds"
                        />
                    </Grid>
                    {
                        error && packDay == -1 &&
                        <Grid container item xs={12}>
                            <FormHelperText sx={{ mx: 0 }}>
                                <CustomALert
                                    content={"Select a subscription type"}
                                    severity="error"
                                    warning={true}
                                    isHtml={false}
                                />
                            </FormHelperText>
                        </Grid>
                    }
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <Divider />
                </Grid>
            </Grid>
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

export default TipsterSubscriptionRow;
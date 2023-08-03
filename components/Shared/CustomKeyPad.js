import React from 'react';
import { Grid, Typography, Button, Box, Slide, Avatar } from '@mui/material';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { useSession } from "next-auth/client";
import CircularProgress from '@mui/material/CircularProgress';

const CustomKeyPad = ({ handleClick, show, showDollars, showPercent,
    placebets, totalbets, disablePlaceBets, handleOpenLogin,
    handleplaceBets, loading, handleDone, totalStake, balchk = false, betamount = 0, setdepositModal }) => {

    let dividends = [5, 10, 25, 50, 100, 500]
    const [session] = useSession();
    const handlePlaceBtn = () => {
        handleDone()
        setTimeout(() => {
            handleplaceBets()
        }, 150);
    }
    return (
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <Grid container spacing={0.4}>
                {placebets &&
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Button color="white" variant="text" onClick={handleDone}>
                            Done
                        </Button>
                    </Grid>
                }
                <Grid item xs={8}>
                    <Grid container rowSpacing={0.4} columnSpacing={0.4}>
                        {
                            [...Array(9)].map((e, i) =>
                                <Grid item key={i} xs={4}>
                                    <Box onClick={handleClick(i + 1)} sx={{ bgcolor: "grey.keypad" }} className="customKeypad">
                                        <Typography color="white.main">{i + 1}</Typography>
                                    </Box>
                                </Grid>
                            )
                        }
                        <Grid item xs={4}>
                            <Box onClick={handleClick(".")} sx={{ bgcolor: "grey.dividends" }} className="customKeypad">
                                <Typography color="white.main">.</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box onClick={handleClick("0")} sx={{ bgcolor: "grey.keypad" }} className="customKeypad">
                                <Typography color="white.main">0</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box onClick={handleClick("-1")} sx={{ bgcolor: "grey.dividends" }} className="customKeypad">
                                <BackspaceOutlinedIcon color="white" />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container rowSpacing={0.4} columnSpacing={0.4}>
                        {
                            dividends.map((key, i) =>
                                <Grid item key={i} xs={6}>
                                    <Box onClick={handleClick(key, true)} sx={{ bgcolor: "grey.dividends" }} className="customKeypad">
                                        <Typography color="white.main" fontSize={11}>{showDollars && '+$'}{key}{showPercent && '%'}</Typography>
                                    </Box>
                                </Grid>
                            )
                        }
                        {placebets ?
                            <Grid item xs={12}>
                                {
                                    !session ?
                                        <Button
                                            color="success"
                                            variant="contained"
                                            onClick={handleOpenLogin}
                                            sx={{
                                                width: "100%",
                                                height: "45px",
                                                px: 0.5,
                                                '&:disabled': {
                                                    boxShadow: "none",
                                                    backgroundColor: "success.main",
                                                }
                                            }}>
                                            <Typography color="white.main" fontWeight="bold" noWrap>
                                                Login & BET
                                            </Typography>
                                        </Button>
                                        :
                                        loading ?
                                            <Button
                                                color="success"
                                                variant="contained"
                                                sx={{
                                                    width: "100%",
                                                    height: "45px",
                                                    bgcolor: "grey.dividends",
                                                    '&:disabled': {
                                                        boxShadow: "none",
                                                        backgroundColor: "grey.dividends",
                                                        color: "grey.light"
                                                    }
                                                }}
                                                disabled>
                                                <CircularProgress color="inherit" size={16} sx={{ mr: 1 }} />
                                            </Button>
                                            :
                                            <React.Fragment>
                                                {
                                                    balchk ?
                                                        <Button
                                                            color="success"
                                                            variant="contained"
                                                            onClick={() => setdepositModal(true)}
                                                            sx={{
                                                                width: "100%",
                                                                height: "45px",
                                                                px: 0.5,
                                                                '&:disabled': {
                                                                    boxShadow: "none",
                                                                    backgroundColor: "success.main",
                                                                }
                                                            }}
                                                        >
                                                            <Typography color="white.main" fontWeight="bold" fontSize={12} noWrap>
                                                                Quick Deposit
                                                            </Typography>
                                                        </Button>
                                                        :
                                                        <Button
                                                            color="success"
                                                            variant="contained"
                                                            onClick={handlePlaceBtn}
                                                            sx={{
                                                                width: "100%",
                                                                height: "45px",
                                                                px: 0.5,
                                                                '&:disabled': {
                                                                    boxShadow: "none",
                                                                    backgroundColor: "success.main",
                                                                }
                                                            }}
                                                            disabled={disablePlaceBets}>
                                                            <Typography color={disablePlaceBets ? "success.disabled" : "white.main"} fontWeight="bold" fontSize={12} noWrap>Place Bet{totalbets > 1 && "s"}</Typography>
                                                            {totalbets > 1 && <Avatar sx={{ width: 20, height: 20, bgcolor: "#305c01", ml: 0.5 }}>
                                                                <Typography color={disablePlaceBets ? "success.disabled" : "white.main"} fontWeight="bold" fontSize={10}>{totalbets}</Typography>
                                                            </Avatar>
                                                            }
                                                        </Button>
                                                }
                                            </React.Fragment>

                                }
                            </Grid> :
                            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
                                <Button color="white" variant="text" onClick={handleDone}
                                    sx={{
                                        width: "100%",
                                        height: "45px"
                                    }}>
                                    Done
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Slide>
    );
};

export default CustomKeyPad;
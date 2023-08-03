import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import NumberFormat from 'react-number-format';
import TipsterLogo from '@Components/Tipster/TipsterLogo';

const useStyles = makeStyles((theme) => ({
    topRowContainerWrapper: {
        borderTopStyle: "solid",
        borderBottomStyle: "solid",
        borderBottomColor: '#fec868',
        borderTopColor: '#fec868',
        marginBottom: '2px',
        marginTop: '2px',
        paddingTop: '2px',
        paddingBottom: '2px'

    },
    topRowContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    leftBoxContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    rightBoxContainer: {
        width: '100%%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    text: {
        fontSize: '10px'
    }
}));

const LastMonthRightSideMenu = ({ details }) => {
    const classes = useStyles();

    return (
        <Card >
            <CardContent sx={{ px: 0 }}>
                <Stack sx={{
                    borderTopStyle: "solid",
                    borderBottomStyle: "solid",
                    borderBottomColor: '#fec868',
                    borderTopColor: '#fec868',
                    borderBottomWidth: '1px',
                    borderTopWidth: '1px',
                    marginBottom: '20px',
                    bgcolor: "#fff4e1"
                }}>

                    <Stack className={classes.topRowContainerWrapper}>
                        <Stack className={classes.topRowContainer} >
                            <Stack spacing={2} direction="row" alignItems={"center"} justifyContent={"center"} sx={{ width: 1, py: 1.5 }}>
                                <Box mt={1}>
                                    <img src={`/images/icon/trophy-icon.png`} height="32" width="32" alt={"item.label"} />
                                </Box>
                                <Stack sx={{
                                    flexDirection: 'column',
                                    alignItems: "center",
                                    minWidth: 48,
                                    justifyContent: "center"
                                }}>
                                    <Typography className={classes.text} sx={{ mb: 0.5 }}><b>{details?.alias}</b></Typography>
                                    <TipsterAvatar borderColor={'#fec868'} alias={details?.alias}
                                        cndPath={`${process.env.cdn}/images/avatar/${details?.avatarpath}`}
                                    />
                                </Stack>
                                <Stack sx={{
                                    flexDirection: 'column',
                                    mt: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    {/* <Typography className={classes.text}>{details?.mediagroup}</Typography> */}
                                    <TipsterLogo tipster={details} isMenu={true} />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={classes.rightBoxContainer}>
                            <Stack sx={{
                                borderRightStyle: "solid",
                                borderRightColor: '#fec868',
                                borderRightWidth: '1px',
                                paddingRight: '5px',
                                marginRight: '5px',
                            }}>
                                <Typography className={classes.text}>
                                    <b><NumberFormat
                                        thousandSeparator={true}
                                        value={details?.pot}
                                        decimalScale={0}
                                        fixedDecimalScale={false}
                                        displayType="text"
                                    />%
                                    </b> POT
                                </Typography>
                            </Stack>
                            <Stack
                                sx={{
                                    borderRightStyle: "solid",
                                    borderRightColor: '#fec868',
                                    borderRightWidth: '1px',
                                    paddingRight: '5px',
                                    marginRight: '5px',
                                }}
                            >
                                <Typography className={classes.text}><b>{details?.winners}</b> Winners</Typography>
                            </Stack>
                            <Stack>
                                <Typography className={classes.text}><b>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        value={details?.avgodds}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        displayType="text"
                                        prefix="$"
                                    /></b> avg. price</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

            </CardContent>

        </Card>

    );
};
export default LastMonthRightSideMenu;
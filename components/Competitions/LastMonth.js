import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import star from '../../public/images/icon/star-solid.svg';
import Link from 'next/Link';

const useStyles = makeStyles((theme) => ({
    topRowContainerWrapper: {
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderBottomColor: '#fec868',
        borderTopColor: '#fec868',
        paddingTop: '2px',
        paddingBottom: '2px',
    },
    topWrapper: {
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderBottomWidth: '2.5px',
        borderTopWidth: '2.5px',
        borderBottomColor: '#fec868',
        borderTopColor: '#fec868',
        marginBottom: '25px',
        paddingTop: '2px',
        paddingBottom: '2px',
    },

    topRowContainer: {
        borderBottomWidth: '2px',
        borderTopWidth: '2px',
        width: '100%',
        flexDirection: 'row',
    },
    leftBoxContainer: {
        width: '65%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    rightBoxContainer: {
        width: '35%',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'center',
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    text: {
        fontSize: '12px',
    },
}));

const LastMonth = ({ details }) => {
    const classes = useStyles();

    const TextLineWithStar = ({ children }) => {
        return (
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <SvgIcon style={{ color: '#fec868', marginRight: '5px' }} component={star} viewBox="0 0 576 512" sx={{ fontSize: 16 }} />
                {children}
            </Stack>
        );
    };

    return (
        <Card sx={{ width: '90%', margin: '20px' }}>
            <CardContent>
                <Stack className={classes.topWrapper}>
                    <Stack className={classes.topRowContainerWrapper}>
                        <Stack className={classes.topRowContainer}>
                            <Stack className={classes.leftBoxContainer}>
                                <TipsterAvatar
                                    borderColor={'#fec868'}
                                    alias={details?.alias}
                                    cndPath={`${process.env.cdn}/images/avatar/${details?.avatarpath}`}
                                />
                                <Stack
                                    sx={{
                                        flexDirection: 'column',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <Typography className={classes.text}>
                                        <b>{details?.alias}</b>
                                    </Typography>
                                    <Typography className={classes.text}>{details?.mediagroup}</Typography>
                                </Stack>
                            </Stack>
                            <Stack className={classes.rightBoxContainer}>
                                <Box mr={1}>
                                    <img src={`/images/icon/trophy-icon.png`} height="32" alt={'item.label'} />
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack
                            sx={{
                                width: '96%',
                                flexDirection: 'row',
                                backgroundColor: '#f7f7f7',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                marginLeft: '5px',
                                marginRight: '5px',
                                marginBottom: '10px',
                                justifyContent: 'space-between',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                            }}
                        >
                            <Typography className={classes.text} textAlign={'center'}>
                                <Typography fontSize={14} textAlign={'center'}>
                                    <b>{Math.round(details?.pot)}% </b>
                                </Typography>
                                <br />
                                profit on turnover
                            </Typography>
                            <Typography className={classes.text} textAlign={'center'}>
                                <Typography fontSize={14} textAlign={'center'}>
                                    <b>{details?.winners}</b>
                                </Typography>
                                <br /> winners
                            </Typography>
                            <Typography className={classes.text} textAlign={'center'}>
                                <Typography fontSize={14} textAlign={'center'}>
                                    <b>${details?.avgodds} </b>
                                </Typography>
                                <br />
                                price of winners(avg.)
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        paddingBottom: '15px',
                        paddingLeft: '40px',
                    }}
                >
                    <TextLineWithStar>
                        <Typography fontSize={14}>
                            Enter at least<b> {details?.mintip} tips for the month</b>
                        </Typography>
                    </TextLineWithStar>
                    <TextLineWithStar>
                        <Typography fontSize={14}>
                            Tip<b> {details?.wintips} winners </b>or more
                        </Typography>
                    </TextLineWithStar>
                    <TextLineWithStar>
                        <Typography fontSize={14}>
                            Finish in the <b> Top Profit Positions</b> and
                            <br /> share in <b>${details?.totalprize} cash</b> prizes
                        </Typography>
                    </TextLineWithStar>
                </Stack>
                <Stack
                    sx={{
                        paddingBottom: '30px',
                    }}
                >
                    <Link href={'terms/monthly-tipping-comp'}>
                        <Typography sx={{ textAlign: 'center', fontSize: '10px', cursor: 'pointer' }}>
                            <u>Terms & Conditions</u>
                        </Typography>
                    </Link>
                </Stack>
            </CardContent>
        </Card>
    );
};
export default LastMonth;

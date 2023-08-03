import Image from 'next/image';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import HotBetCarousel from '@Components/Competitions/PrizesSlider';
import Link from 'next/Link';
import { CButton } from './NewUserAuthSection';

const useStyles = makeStyles((theme) => ({
    competitionTopBannerContainer: {
        position: 'relative',
        textAlign: 'center',
    },
    competitionTopBannerTextContainer: {
        position: 'absolute',
        top: '0px',
    },
    competitionTopBannerText: {
        textAlign: 'left',
        paddingLeft: ' 20px',
        color: 'aliceblue',
        textShadow: '-3.28px 3.774px 20px rgba(0, 0, 0, 0.7)'
    },
    competitionTopBar: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '40px',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: theme.palette.white.main,
    },
    boxLeft: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#652371',
        height: '100%',
        width: '63%',
    },
    boxRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        width: '35%',
    },
    middleLine: {
        backgroundColor: theme.palette.primary.main,
        transform: 'skewX(-15deg)',
        width: '2%',
        height: '100%',
        marginLeft: '-11px',
        paddingLeft: '20px',
    },

    competitionTopBarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    competitionTopBannerButtonsContainer: {
        position: 'absolute',
        top: '60%',
        paddingLeft: ' 20px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    competitionTopBarDesktop: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '75px',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: theme.palette.white.main,
    },
    boxLeftDesktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#652371',
        height: '100%',
        width: '40%',
    },
    boxMiddleDesktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        width: '30%',
    },
    boxRightDesktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        height: '100%',
        width: '32%',
    },
    leftEndDesktop: {
        backgroundColor: theme.palette.primary.main,
        transform: 'skewX(-15deg)',
        width: '2%',
        height: '100%',
        marginLeft: '-11px',
        paddingLeft: '20px',
    },
    middleEndDesktop: {
        backgroundColor: theme.palette.primary.main,
        transform: 'skewX(-15deg)',
        width: '3%',
        height: '100%',
        marginRight: '-11px',
        paddingLeft: '20px',
    },
    competitionTopBarTextDesktop: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '26px',
    },
}));

const CompetitioTopBanner = ({ cashPrizes, isUserLogin, handleLoginModalToggle, slids }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const classes = useStyles();

    const DesktopViewButtons = () => {
        return (
            <Stack className={classes.competitionTopBannerButtonsContainer}>
                {isUserLogin ? (
                    <Link href="/racing">
                        <CButton onClick={() => { }} text="Enter Tips" width={'100%'} />
                    </Link>
                ) : (
                    <>
                        <Link href="/register">
                            <CButton onClick={() => { }} text="Join Now" width="60%" />
                        </Link>
                        <CButton sx={{ marginLeft: '20px' }} onClick={handleLoginModalToggle} text="Login" width="25%" />



                    </>
                )}
            </Stack>
        );
    };

    const MobileBannerBottom = () => {
        return (
            <Stack className={classes.competitionTopBar}>
                <Box className={classes.boxLeft}>
                    <Typography className={classes.competitionTopBarText}> {`$${cashPrizes} cash prizes monthly`}</Typography>
                </Box>
                <Box className={classes.middleLine}></Box>
                <Box className={classes.boxRight}>
                    <Typography className={classes.competitionTopBarText} sx={{ marginLeft: -2 }}>
                        {' '}
                        FREE TO PLAY
                    </Typography>
                </Box>
            </Stack>
        );
    };

    const DesktopBannerBottom = () => {
        return (
            <Stack className={classes.competitionTopBarDesktop}>
                <Box className={classes.boxLeftDesktop}>
                    <Typography className={classes.competitionTopBarTextDesktop}> {`$${cashPrizes} cash prizes monthly`}</Typography>
                </Box>
                <Box className={classes.leftEndDesktop}></Box>
                <Box className={classes.boxMiddleDesktop}>
                    <Typography className={classes.competitionTopBarTextDesktop} sx={{ marginLeft: -2 }}>
                        {' '}
                        FREE TO PLAY
                    </Typography>
                </Box>
                <Box className={classes.middleEndDesktop} />
                <Box className={classes.boxRightDesktop}>
                    <HotBetCarousel slids={slids} height="75px" />
                </Box>
            </Stack>
        );
    };
    return (
        <>
            <Stack className={classes.competitionTopBannerContainer}>
                <Image
                    src={`${process.env.cdn}/images/banners/competitions-${isDesktop ? 'desktop' : 'mobile'}.png`}
                    width={isDesktop ? '46%' : '100%'}
                    height={isDesktop ? '12%' : '50%'}
                    layout="responsive"
                    alt={process.env.cdn}
                />
                <Stack className={classes.competitionTopBannerTextContainer}>
                    <h1
                        className={classes.competitionTopBannerText}
                        style={{ fontSize: isDesktop ? '60px' : '35px', lineHeight: isDesktop ? '65px' : '37px' }}
                    >
                        {isDesktop ? (
                            <>
                                <span style={{ color: "#ec8cfd" }}>Monthly Racing</span><br />
                                Tipping Competiton
                            </>
                        ) : (
                            <>
                                <span style={{ color: "#ec8cfd" }}>Monthly</span>
                                <br />
                                <span style={{ color: "#ec8cfd" }}>Racing</span>
                                <br />
                                Tipping
                                <br /> Competiton
                            </>
                        )}
                    </h1>
                </Stack>
                {isDesktop && <DesktopViewButtons />}
            </Stack>
            {isDesktop ? <DesktopBannerBottom /> : <MobileBannerBottom />}
        </>
    );
};

export default CompetitioTopBanner;

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Box, Container, Stack, Typography, Snackbar, Button, Fade } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import BoxDivider from '@Components/Shared/BoxDivider';
import RacingHotBetSliderItem from '../RacingHotBets/RacingHotBetSliderItem';
import CustomALert from '@Components/Shared/CustomALert';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';

const TrendingHotBets = ({
    isDesktop = false,
    trendingHotBets,
    isResultedRace = false,
    getTipsterCarousel,
    manageBook = false,
    isCarousel = false,
    isHomePage = false,
    desktopMenu = false
}) => {
    const [openBetSlip, setopenBetSlip] = useState(false);
    const router = useRouter();

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

    const onLink = () => {
        router.push({
            pathname: '/hotbets',
        });
    };

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const handleAlert = () => {
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

    return (
        <React.Fragment>
            {trendingHotBets && trendingHotBets.length > 0 && (
                <Box sx={{ mx: isDesktop ? 0 : isCarousel ? 0 : 2 }}>
                    {!isCarousel && (
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: isDesktop ? 0 : 1 }}>
                            <Typography variant="h2" component="p" fontWeight="fontWeightBold" sx={{ fontSize: 16 }}>
                                {isResultedRace ? (
                                    'Who tipped the winner?'
                                ) : (
                                    <React.Fragment>
                                        Trending <img src={`/images/tools/hot-bet-icon-orange.png`} width={15} /> HOT Bets
                                    </React.Fragment>
                                )}
                            </Typography>
                            {isDesktop && (
                                <Button
                                    variant="text"
                                    onClick={() => onLink()}
                                    color="black"
                                    sx={{
                                        fontSize: 12,
                                    }}
                                >
                                    more <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                </Button>
                            )}
                        </Stack>
                    )}
                    <Box>
                        <div className="hide-scrollbar" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                            <Container disableGutters className="hide-scrollbar" sx={{ display: 'flex', pl: 0 }}>
                                <Stack
                                    direction={desktopMenu ? "column" : "row"}
                                    spacing={1.2}
                                    className="carouselIcons"
                                    pb={isHomePage ? 0 : 1.5}>
                                    {trendingHotBets.map((card, index) => (
                                        card && <RacingHotBetSliderItem
                                            card={card}
                                            index={index}
                                            key={index}
                                            handleBetSlip={handleBetSlip}
                                            handleAlert={handleAlert}
                                            trending={true}
                                            oddsrange={card?.ODDSRANGE}
                                            isResultedRace={isResultedRace}
                                            getTipsterCarousel={getTipsterCarousel}
                                            manageBook={manageBook}
                                            isCarousel={isCarousel}
                                            isHomePage={isHomePage}
                                        />
                                    ))}
                                </Stack>
                            </Container>
                        </div>
                    </Box>
                    {!isDesktop && !isResultedRace && !isCarousel && (
                        <Button
                            variant="text"
                            onClick={() => onLink()}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                color: '#000',
                                fontSize: 13,
                                mt: 1,
                                width: 1,
                            }}
                        >
                            View More <KeyboardArrowRightOutlinedIcon fontSize="small" />
                        </Button>
                    )}
                    {!desktopMenu && !isHomePage && <BoxDivider />}
                    {isResultedRace && (
                        <Typography fontSize={17} component="p" fontWeight="bold" mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            Full Field
                        </Typography>
                    )}
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
                        message={<CustomALert severity="success" content={`Selection added to Bet Slip`} warning={true} isHtml={false} />}
                    />
                </Box>
            )}
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </React.Fragment>
    );
};

export default TrendingHotBets;

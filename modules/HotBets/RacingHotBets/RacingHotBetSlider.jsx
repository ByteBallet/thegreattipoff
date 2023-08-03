import * as React from 'react';
import { useState } from 'react';
import { Box, Container, Stack, Fade, Snackbar } from '@mui/material';

import RacingHotBetSliderItem from './RacingHotBetSliderItem';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import CustomALert from '@Components/Shared/CustomALert';

const RacingHotBetSlider = ({
    hotbetad,
    summary,
    hotBetAdDetail,
    selectedCategory,
    selectedType,
    raceid,
    openBetSlip,
    setopenBetSlip,
    oddsrange
}) => {

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

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
        <Box sx={{ ml: 2 }}>
            <div className="hide-scrollbar" style={{ overflowX: 'auto', overflowY: "hidden" }}>
                <Container
                    disableGutters
                    className="hide-scrollbar"
                    sx={{ display: 'flex', pl: 0 }}
                >
                    <Stack
                        direction="row"
                        spacing={1.2}
                        className="carouselIcons"
                        pb={1.5}
                    >
                        {hotbetad.map((card, index) => (
                            <RacingHotBetSliderItem
                                card={card}
                                index={index}
                                key={index}
                                summary={summary}
                                hotBetAdDetail={hotBetAdDetail}
                                selectedCategory={selectedCategory}
                                selectedType={selectedType}
                                handleBetSlip={handleBetSlip}
                                handleAlert={handleAlert}
                                raceid={raceid}
                                oddsrange={oddsrange}
                                trending={false}
                            />
                        ))}
                    </Stack>
                </Container>
            </div>
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
                        content={`Selection added to Bet Slip`}
                        warning={true}
                        isHtml={false}
                    />
                }
            />
        </Box>
    );
};

export default RacingHotBetSlider;

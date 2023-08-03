import React from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { Box, Typography, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const HotBetCarousel = ({ info }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let maxSteps = info.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    return (
        <React.Fragment>
            <Box sx={{ maxWidth: { xs: 400, sm: 700 }, flexGrow: 1, mx: { xs: 3, sm: 4 }, display: "flex", alignItems: "center", bgcolor: "transparent" }}>
                <Button size="large" onClick={handleBack} disabled={activeStep === 0} color="black">
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight fontSize='large' />
                    ) : (
                        <KeyboardArrowLeft fontSize='large' />
                    )}
                </Button>

                <AutoPlaySwipeableViews
                    autoplay={false}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    style={{
                        height: "100%",
                        backgroundColor: "black"
                    }}
                >
                    {
                        info.map((step, index) => (
                            <Box>
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    sx={{
                                        p: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        bgcolor: "black.main",
                                        height: 1
                                    }}
                                >
                                    <Typography color="primary.main" fontSize={20} fontWeight="bold" align="center">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: step.title,
                                            }}
                                        />
                                    </Typography>
                                    <Typography fontSize={14} fontWeight="bold" color="white.main" align="center">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: step.content1,
                                            }}
                                        />
                                    </Typography>
                                    <Typography fontSize={14} color="white.main" align="center">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: step.content2,
                                            }}
                                        />
                                    </Typography>
                                </Stack>
                            </Box>
                        ))
                    }
                </AutoPlaySwipeableViews>

                <Button
                    color="black"
                    size="large"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft fontSize='large' />
                    ) : (
                        <KeyboardArrowRight fontSize='large' />
                    )}
                </Button>
            </Box>
            <div>
                <MobileStepper
                    className={'ALALA'}
                    sx={{ zIndex: 10, background: 'transparent' }}
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                />
            </div>
        </React.Fragment >
    );
};

export default HotBetCarousel;
import React from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { Box, Typography, Stack, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
    prizesSliderMainWrapper: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#000",
        width: '100%'
    }
}));

const PrizesSlider = ({ slids, height }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let maxSteps = slids.length;
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
            <Box className={classes.prizesSliderMainWrapper} >
                <Button size="large" onClick={handleBack} disabled={activeStep === 0} color="black" sx={{ height: height ? height : '50px' }}>
                    <KeyboardArrowLeft fontSize='small' sx={{ color: '#fff' }} />
                </Button>
                <AutoPlaySwipeableViews
                    autoplay={false}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    style={{
                        backgroundColor: "black"
                    }}
                >
                    {
                        slids.map((step, index) => (
                            <Box sx={{ width: '100%' }} key={index}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                        padding: '10px',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        bgcolor: "#000",
                                        height: height ? height : '50px'
                                    }}
                                >
                                    <Typography color="#fff" fontSize={isDesktop ? 25 : 20} fontWeight="bold" align="center">
                                        {step.line1}
                                    </Typography>
                                    <Stack >
                                        {step.line2 && <Typography fontSize={isDesktop ? 18 : 14} fontWeight="bold" color="white.main" align="center" sx={{ marginBottom: '1%' }}>
                                            {step.line2}
                                        </Typography>}
                                        {step.line3 && <Typography fontSize={isDesktop ? 18 : 14} color="#58aa00" align="left" fontWeight="bold" sx={{ marginTop: '-4%' }}>
                                            {step.line3}
                                        </Typography>}
                                    </Stack>

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
                    <KeyboardArrowRight fontSize='small' sx={{ color: '#fff' }} />
                </Button>
            </Box>
        </React.Fragment >
    );
};

export default PrizesSlider;
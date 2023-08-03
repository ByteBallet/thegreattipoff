import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Home from '../../styles/Home.module.css';
import { getPromotions } from '@services/promotion/promotionService';
import { UserContext } from '@Context/User/UserProvider';
import Link from 'next/Link';
import { MAIN_CATEGORIES } from '@lib/constants';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Promotion 1',
        imgPath: `${process.env.cdn}/images/promotions/Home-Page-Tile-1-420x100.jpg`,
    },
    // {
    //     label: 'Promotion 2',
    //     imgPath: `${process.env.cdn}/images/promotions/Home-Page-Tile-2-420x100.jpg`,
    // },
];

function SwipeableTextMobileStepper({ isDesktop, isLoggedIn = false, activeCategory }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [promotionDetails, setpromotionDetails] = React.useState();
    const { user } = useContext(UserContext);
    let maxSteps = 0;
    let banners = []

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        const getPromotion = async () => {
            const resp = await getPromotions(user.promo, user.clientID ? user.clientID : "", "home", 0, "", "banner");
            if (resp && !resp.error) {
                if (resp.data.ERROBJ && resp.data.ERROBJ.ERRORCODE == 0) {
                    setpromotionDetails(resp.data.PROMOTIONS)
                }
            }
        }
        getPromotion()
    }, [isLoggedIn])

    if (promotionDetails && promotionDetails.bannerset && promotionDetails.bannerset.length > 0) {
        banners = promotionDetails.bannerset.filter((item) => (item.TYPEOF == (isDesktop ? "desktop" : "mobile")))
        if (isLoggedIn) {
            if (isDesktop) {
                banners = activeCategory ? banners.filter((item) => item.EVENT == activeCategory) : banners
            } else {
                banners = (activeCategory == MAIN_CATEGORIES.promo) ? banners : banners.filter((item) => item.EVENT == activeCategory)
            }
        }
        maxSteps = banners.length
    }
    return (
        <React.Fragment>
            {

                promotionDetails && banners.length > 0 && (
                    <Box sx={{ flexGrow: 1, bgcolor: 'white.main' }}>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                pl: 2,
                                bgcolor: 'background.default',
                            }}
                        ></Paper>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {banners.map((step, index) => (
                                <div key={index}>
                                    <Link href={step.HREF}>
                                        <Box
                                            component="img"
                                            sx={{
                                                display: 'block',
                                                overflow: 'hidden',
                                                width: '100%',
                                                height: isDesktop ? 180 : 135,
                                                cursor: "pointer"
                                            }}
                                            src={`${process.env.cdn}/images/promotions/${step.IMGSRC}`}
                                            alt={""}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>

                        {/* <div className={Home.leftRightBtn}>
                            <MobileStepper
                                position="static"
                                steps={maxSteps}
                                nextButton={
                                    <Button
                                        size="small"
                                        onClick={handleNext}
                                        disabled={activeStep === maxSteps - 1}
                                    >
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size="small"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                    >
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                        ) : (
                                            <KeyboardArrowLeft />
                                        )}
                                    </Button>
                                }
                            />
                        </div> */}
                        <div className={Home.sliderBtn}>
                            <MobileStepper
                                className={'ALALA'}
                                sx={{ zIndex: 10, background: 'transparent' }}
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                            />
                        </div>
                    </Box>
                )
            }
        </React.Fragment>
    );
}

export default SwipeableTextMobileStepper;

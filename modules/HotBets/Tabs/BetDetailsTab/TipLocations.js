import React from 'react';
import { Stack, Typography, Box, MobileStepper, Button, Tabs } from '@mui/material';
import { toTitleCase } from '@utils/hotBetUtils';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { getTextColor } from '@Components/utils/util';

const TipLocations = ({ summaryList, isExpanded, checkDeselected, handleOnClicklocationItem, handleOnClickSeeBetDetails, classes, uid, index }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = summaryList.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const RenderRow = ({ row }) => {
        return (
            <>
                <Stack
                    sx={{ cursor: 'pointer' }}
                    className={
                        !isExpanded ||
                            checkDeselected(Number(`${uid}${index}${row?.LOCID}`))
                            ? classes.rowContainer
                            : classes.rowContainerExpanded
                    }
                    onClick={() => {
                        if (isExpanded) {
                            handleOnClicklocationItem(row?.LOCID);
                        } else {
                            handleOnClickSeeBetDetails()
                        }
                    }}
                >
                    <Typography className={classes.nameText} noWrap sx={{ color: isExpanded ? getTextColor(theme.palette.primary.main) : "inherit" }}>
                        {toTitleCase(row?.DESCRIPTION)}
                    </Typography>
                    {isExpanded && <ExpandMore sx={{ fontSize: 18, color: getTextColor(theme.palette.primary.main) }} />}
                </Stack>
            </>
        );
    };
    return (
        <React.Fragment>
            <Box py={1} sx={{ flexDirection: "row", display: "flex", overflowY: "auto" }} mx={2}>
                <Tabs
                    value={0}
                    onChange={() => { }}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile={true}
                    aria-label={"Tip Locations"}
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    className="RacingTabs"
                >
                    {summaryList.length > 0 &&
                        summaryList.map((row, index) => (
                            <RenderRow key={index} row={row} />
                        ))}
                </Tabs>
            </Box>
        </React.Fragment>
    );
};

export default TipLocations;
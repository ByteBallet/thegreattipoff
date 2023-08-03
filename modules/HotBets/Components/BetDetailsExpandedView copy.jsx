import React, { useState, useEffect } from 'react';
import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography,
    Button,
    TextField,
    useMediaQuery
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@mui/icons-material/Delete';

import CircularLoader from '@Components/common/CircularLoader';
import NoDataLabal from '@Components/common/NoDataLabal';
import { HOT_BET_ODD_FILTER } from '@lib/constants';
import {
    getNumberValue,
    getTextBoxValue,
    updateStake,
} from '@utils/hotBetUtils';

import OddsFilter from './OddsFilter';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getTextColor } from '@Components/utils/util';

const useStyles = makeStyles((theme) => ({
    topRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        margin: '15px',
    },
    bottomRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '15px',
    },
    //
    oddsFilteButton: {
        borderRadius: 20,
        paddingLeft: '12px',
        paddingRight: '8px',
    },
    oddsFilteButtonExpanded: {
        background: theme.palette.primary.main,
        borderRadius: 20,
        borderWidth: '1px',
        paddingLeft: '12px',
        paddingRight: '8px',
    },
    //
    rowsWrapper: {
        background: theme.palette.background.default,
        marginTop: 5,
        paddingBottom: 15,
    },
    rowLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%',
        borderBottom: 'solid',
        borderBottomColor: '#ffff',
        borderBottomWidth: 1,
        paddingBottom: 0.5,
    },
    rowOddText: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '600',
        paddingLeft: '15px',
    },
    rowNbetText: {
        fontSize: 13,
        textAlign: 'center',
        paddingRight: '45px',
    },
    //
    stakeAllWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '30%',
    },
    //
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '60%',
        borderBottom: 'solid',
        borderBottomColor: '#9e9e9e',
        borderBottomWidth: 1,
        paddingTop: 1,
    },
    headerText: {
        fontSize: 13,
        color: '#9e9e9e',
        textAlign: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '30%',
        paddingTop: 1,
    },
    customTextField: {
        '& input::placeholder': {
            fontSize: '14px',
            color: 'white',
            fontWeight: 'bold',
            opacity: 0.5,
        },
    },
    //
    oddsFilterWarapper: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: '0 15px 10px 15px',
        alignContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        color: '#9e9e9e',
    },
}));

const BetDetailsExpandedView = ({
    isloading,
    stake,
    setStake,
    updateBetSlipCount,
    onClickOddsFilter,
    betSlipCount,
    allStake,
    setAllStake,
    minHotBet,
    setPotentialReturnStake,
    totalStake,
    setTotalStake,
    potentialReturnStake,
    setError,
    error,
    currentFocus,
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const theme = useTheme();
    const minDistance = 1;
    const classes = useStyles();
    let showOddsFilter = localStorage.getItem("showOddsFilter") ? JSON.parse(localStorage.getItem("showOddsFilter")) : false
    const [isOddsFilterOpen, setIsOddsFilterOpen] = useState(showOddsFilter);
    let oddsFilter = localStorage.getItem("oddsfilter") ? JSON.parse(localStorage.getItem("oddsfilter")) : [HOT_BET_ODD_FILTER.initialStart, HOT_BET_ODD_FILTER.initialEnd]
    const [sliderValue, setSliderValue] = useState(oddsFilter);
    const [isLoadAllStake, setIsLoadAllStake] = useState(true);


    let allBets = stake.reduce((sum, set) => sum + +set.NBETS, 0)

    // const [currentFocus, setCurrentFocus] = useState();

    const handleOnChangeRangSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (
            activeThumb === 0 &&
            Math.min(newValue[0], sliderValue[1] - minDistance) != 0
        ) {
            setSliderValue([
                Math.min(newValue[0], sliderValue[1] - minDistance),
                sliderValue[1],
            ]);
        } else {
            setSliderValue([
                sliderValue[0],
                Math.max(newValue[1], sliderValue[0] + minDistance),
            ]);
        }
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        currentFocus.current = id
        updateStake(stake, setStake, id, value);
        setAllStake('');
    };

    const handelOnClickOddsFiltes = () => {
        setIsOddsFilterOpen(!isOddsFilterOpen);
        onClickOddsFilter(!isOddsFilterOpen, sliderValue[0], sliderValue[1]);
        localStorage.setItem("showOddsFilter", !isOddsFilterOpen)
    };

    const getTotalStake = () => {
        let total = 0;
        stake?.length > 0 &&
            stake.map((item) => {
                total =
                    total +
                    getNumberValue(item?.STAKE) * getNumberValue(item?.NBETS);
            });
        setTotalStake(total);
        total = 0;
    };

    const getTotalPotentialReturn = () => {
        let potentialReturn = 0;
        stake?.length > 0 &&
            stake.map((item) => {
                potentialReturn =
                    potentialReturn +
                    getNumberValue(item?.ODDSRANGE) *
                    getNumberValue(item?.NBETS) *
                    getNumberValue(item?.STAKE);
            });
        setPotentialReturnStake(potentialReturn);
        potentialReturn = 0;
    };

    const mapStakeAlltoArray = (value) => {
        const newStake =
            stake.length > 0 &&
            stake.map((item) => {
                return {
                    ID: item.ID,
                    ODDSRANGE: item.ODDSRANGE,
                    NBETS: item.NBETS,
                    STAKE: value,
                    HIGHVAL: item.HIGHVAL,
                    LOWVAL: item.LOWVAL,
                    SORTORDER: item.SORTORDER,
                };
            });
        setStake(newStake);
    };

    const handleChangeStakeAll = (e) => {
        currentFocus.current = "stakeAll"
        mapStakeAlltoArray(e.target.value);
        if (Number(e.target.value) >= 0) {
            setAllStake(e.target.value);
        }
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (Number(allStake) < minHotBet && Number(allStake) > 0) {
    //             setError(true);
    //         } else {
    //             setError(false);
    //         }
    //     }, 1200);
    // }, [allStake])


    const handleClearOddsFilter = () => {
        setAllStake('');
        let oddsFilter = [HOT_BET_ODD_FILTER.min, HOT_BET_ODD_FILTER.max]
        localStorage.setItem("oddsfilter", JSON.stringify(oddsFilter))
        setSliderValue(oddsFilter);
        onClickOddsFilter(
            isOddsFilterOpen,
            oddsFilter[0],
            oddsFilter[1]
        );
    };

    useEffect(() => {
        if (allStake) {
            mapStakeAlltoArray(allStake);
        }
        getTotalStake();
        let stakeCount = 0;
        stake?.length > 0 &&
            stake.map((item) => {
                if (Number(item.STAKE) > 0) {
                    stakeCount = stakeCount + item?.NBETS;
                }
            });
        updateBetSlipCount(stakeCount);
        isOddsFilterOpen && onClickOddsFilter(isOddsFilterOpen, sliderValue[0], sliderValue[1]);
    }, []);

    useEffect(() => {
        if (allStake && isLoadAllStake) {
            mapStakeAlltoArray(allStake);
            setIsLoadAllStake(false);
        }
        getTotalStake();
        let stakeCount = 0;
        stake?.length > 0 &&
            stake.map((item) => {
                if (Number(item.STAKE) > 0) {
                    stakeCount = stakeCount + item?.NBETS;
                }
            });

        updateBetSlipCount(stakeCount);
        getTotalPotentialReturn();
        setIsLoadAllStake(false);
    }, [stake]);

    const checkStake = () => {
        let err = false
        if (Number(allStake) > 0 && Number(allStake) < minHotBet) {
            err = true
        } else {
            err = false
        }
        if (!err) {
            //check validation
            stake?.length > 0 &&
                stake.map((item) => {
                    if (!err) {
                        if (Number(item.STAKE) > 0 && Number(item.STAKE) < minHotBet) {
                            err = true
                        } else {
                            err = false
                        }
                    }
                });
        }
        setError(err)
    }

    useEffect(() => {
        if (allStake) {
            setIsLoadAllStake(true);
        }
    }, [isOddsFilterOpen]);

    const RenderRow = ({ item }) => {
        return (
            <Stack
                key={item?.ODDSRANGE}
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <Stack className={classes.rowLeftContainer}>
                    <Typography className={classes.rowOddText}>
                        {item?.ODDSRANGE}
                    </Typography>
                    <Typography className={classes.rowNbetText}>
                        {item?.NBETS}
                    </Typography>
                </Stack>
                <Stack
                    className={classes.stakeAllWrapper}
                    alignItems="flex-end"
                >
                    <Box
                        sx={{
                            width: isDesktop ? "65%" : '90%',
                            color: 'white.main',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <TextField
                            autoFocus={(currentFocus && currentFocus.current) ? currentFocus.current === item?.ODDSRANGE : false}
                            disabled={item?.NBETS == 0 ? true : false}
                            id={item?.ODDSRANGE}
                            onChange={handleChange}
                            classes={{
                                root: classes.customTextField,
                            }}
                            value={getTextBoxValue(stake, item?.ODDSRANGE, item?.NBETS)}
                            size="small"
                            hiddenLabel
                            onBlur={() => {
                                let val = getTextBoxValue(stake, item?.ODDSRANGE, item?.NBETS)
                                if (Number(val) > 0) {
                                    updateStake(stake, setStake, item?.ODDSRANGE, Number(val).toFixed(2));
                                    //updateStake(stake, setStake, item?.ODDSRANGE, Number(val).toFixed(2))
                                    checkStake()
                                }
                                currentFocus.current = null
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Typography
                                            color="grey.joinBorder"
                                            fontSize={12}
                                            fontWeight="bold"
                                        >
                                            $
                                        </Typography>
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                'data-oddsrange': item?.ODDSRANGE,
                                inputMode: 'numeric',
                                style: {
                                    fontSize: 13,
                                    textAlign: 'right',
                                    fontWeight: '600',
                                },
                            }}
                            sx={{
                                bgcolor: 'white.main',
                                borderRadius: 2,
                                border: 1,
                                borderColor: '#d3cece',
                                textAlign: 'right',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                    textAlign: 'right',
                                },
                                '& .MuiOutlinedInput-root': {
                                    height: '20px',
                                    fontSize: 13,
                                    textAlign: 'right',
                                },
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                    borderRadius: 2,
                                    textAlign: 'right',
                                },
                            }}
                        />
                    </Box>
                </Stack>
            </Stack>
        );
    };

    const RenderTableHeader = () => {
        return (
            <Stack direction="row" alignItems="center" justifyContent="center">
                <Stack className={classes.headerLeftContainer}>
                    <Typography className={classes.headerText}>
                        <i>Odds approx</i>
                    </Typography>
                    <Typography className={classes.headerText}>
                        <i>Number of bets</i>
                    </Typography>
                </Stack>
                <Stack className={classes.headerRight}>
                    <Box>
                        <Typography className={classes.headerText}>
                            <i>Stake each</i>
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        );
    };

    const RenderDollerValue = ({ value }) => (
        <b>
            <NumberFormat
                thousandSeparator={true}
                value={value || '0'}
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale={true}
                displayType="text"
                prefix="$"
            />
        </b>
    );
    return (
        <>
            {isloading && <CircularLoader />}
            {!isloading && !stake?.length > 0 && <NoDataLabal color="black" />}
            {!isloading && stake?.length > 0 && (
                <>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Stack className={classes.topRowWrapper} sx={{ width: "95%" }}>
                            <Box
                                className={
                                    isOddsFilterOpen
                                        ? classes.oddsFilteButtonExpanded
                                        : classes.oddsFilteButton
                                }
                                onClick={() => {
                                    handelOnClickOddsFiltes();
                                }}
                                sx={{
                                    cursor: 'pointer',
                                    width: isDesktop ? "35%" : '40%',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    py: 0.5,
                                    border: 2,
                                    borderColor: "primary.main",
                                    color: isOddsFilterOpen ? getTextColor(theme.palette.primary.main) : "black.main"
                                }}
                            >
                                <Typography fontSize={12} noWrap color="inherit">Odds Filter</Typography>
                                {
                                    isOddsFilterOpen ? <KeyboardArrowUpIcon fontSize='small' /> : <KeyboardArrowDownIcon fontSize='small' />
                                }
                            </Box>
                            {
                                stake?.length > 1 &&
                                <Stack flexDirection={'row'} justifyContent={'end'} alignItems="center">
                                    <Typography fontSize={13} mr={0.4}>
                                        <span style={{ fontSize: 11 }}>Stake all </span>
                                        <b>{`${allBets} bet${allBets > 1 ? "s" : ""}: `}</b>
                                    </Typography>
                                    <Box sx={{ width: '45%' }}>
                                        <TextField
                                            id={'stakeAll'}
                                            onChange={handleChangeStakeAll}
                                            classes={{
                                                root: classes.customTextField,
                                            }}
                                            value={allStake}
                                            size="small"
                                            hiddenLabel
                                            onBlur={() => {
                                                if (Number(allStake) > 0) {
                                                    mapStakeAlltoArray(Number(allStake).toFixed(2));
                                                    setAllStake(Number(allStake).toFixed(2))
                                                    checkStake()
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Typography
                                                            color="grey.joinBorder"
                                                            fontSize={12}
                                                            fontWeight="bold"
                                                        >
                                                            $
                                                        </Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                inputMode: 'numeric',
                                                'data-bettype': 'single',
                                                'data-field': 'stakeall',
                                                style: {
                                                    fontSize: 13,
                                                    textAlign: 'right',
                                                    fontWeight: '600',
                                                },
                                            }}
                                            sx={{
                                                bgcolor: 'white.main',
                                                borderRadius: 2,
                                                border: 1,
                                                borderColor: '#d3cece',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 0,
                                                    textAlign: 'right',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    height: '20px',
                                                    fontSize: 13,
                                                    textAlign: 'right',
                                                },
                                                '& .Mui-focused .MuiOutlinedInput-notchedOutline':
                                                {
                                                    border: 0,
                                                    borderWidth: 0,
                                                    textAlign: 'right',
                                                },
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            }
                        </Stack>
                    </Box>
                    {isOddsFilterOpen && (
                        <Box mx={1}>
                            <Stack className={classes.oddsFilterWarapper}>
                                <Stack
                                    sx={{
                                        width: '80%',
                                    }}
                                >
                                    <Typography fontSize={12}>
                                        Odds range
                                        <b>{` $${sliderValue[0]} -$${sliderValue[1]}`}</b>
                                    </Typography>
                                </Stack>
                                <Stack
                                    sx={{
                                        width: '20%',
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        endIcon={<DeleteIcon />}
                                        className={classes.clearButton}
                                        size="small"
                                        onClick={() => handleClearOddsFilter()}
                                        sx={{
                                            minWidth: "auto"
                                        }}
                                    >
                                        <Typography
                                            fontSize={12}
                                            color="inherit"
                                        >
                                            Clear
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Stack>
                            <OddsFilter
                                handleChange={handleOnChangeRangSlider}
                                value={sliderValue}
                                onChangeCommitted={() => {
                                    onClickOddsFilter(
                                        isOddsFilterOpen,
                                        sliderValue[0],
                                        sliderValue[1]
                                    );
                                }}
                                min={HOT_BET_ODD_FILTER.min}
                                max={HOT_BET_ODD_FILTER.max}
                            />
                        </Box>
                    )}
                    <Stack className={classes.rowsWrapper} spacing={0.3}>
                        <RenderTableHeader />
                        {stake?.length > 0 &&
                            stake.map((item, index) => (
                                <RenderRow key={index} item={item} />
                            ))}
                    </Stack>
                    {error && (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                                mx: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'error.main',
                                    fontSize: 14,
                                }}
                            >
                                {` $${minHotBet} minimum HOT Bet stake`}
                            </Typography>
                        </Box>
                    )}
                    <Stack className={classes.bottomRowWrapper}>
                        <Typography fontSize={13}>
                            <span style={{ fontSize: 11 }}>Total stake: </span>
                            <RenderDollerValue value={totalStake} />
                        </Typography>
                        <Typography fontSize={13}>
                            <span style={{ fontSize: 11 }}>
                                Potential Return:
                            </span>
                            <b>{totalStake > 0 ? "TBD" : <RenderDollerValue value={potentialReturnStake} />}</b>
                        </Typography>
                    </Stack>
                </>
            )}
        </>
    );
};

export default BetDetailsExpandedView;

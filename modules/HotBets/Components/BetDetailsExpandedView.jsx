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
    useMediaQuery,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Divider,
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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
        textAlign: 'left',
        fontWeight: '600',
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
        // width: '30%',
    },
    //
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '60%',
        borderBottom: 'solid',
        borderBottomColor: '#d0d1d2',
        borderBottomWidth: 1,
        paddingTop: 1,
    },
    headerText: {
        fontSize: 12,
        color: '#9e9e9e',
        textAlign: 'left',
        padding: '4px 0'
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
    showGetTips = false,
    setstakeErr,
    stakeErr = false
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const theme = useTheme();
    const minDistance = 1;
    const classes = useStyles();
    let showOddsFilter = localStorage.getItem("showOddsFilter") ? JSON.parse(localStorage.getItem("showOddsFilter")) : false
    const [isOddsFilterOpen, setIsOddsFilterOpen] = useState(showOddsFilter);
    let hbFilterInit = process.env.APP_BRAND == 'gto' ? HOT_BET_ODD_FILTER.initialGTOStart : HOT_BET_ODD_FILTER.initialStart
    let hbFilterEnd = process.env.APP_BRAND == 'gto' ? HOT_BET_ODD_FILTER.initialGTOEnd : HOT_BET_ODD_FILTER.initialEnd
    let oddsFilter = localStorage.getItem("oddsfilter") ? JSON.parse(localStorage.getItem("oddsfilter")) : [hbFilterInit, hbFilterEnd]
    const [sliderValue, setSliderValue] = useState(oddsFilter);
    const [isLoadAllStake, setIsLoadAllStake] = useState(true);
    const [isDetailsExpanded, setisDetailsExpanded] = useState(false);

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

    const handelOnClickOddsFilter = () => {
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
        stakeErr && setstakeErr(false)
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
            <TableRow
                key={item.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="right" size="small" sx={{ p: 0, width: "18%", border: 0 }}>
                    {item?.NBETS > 0 && <Typography className={classes.rowOddText} sx={{ width: 1 }} > {item?.NBETS} bet{item?.NBETS > 1 && 's'}</Typography>}
                </TableCell>
                <TableCell align="left" sx={{ pl: 0.5, border: 0, py: 0 }}>
                    <Typography className={classes.rowOddText} sx={{ width: 1 }} >  {item?.NBETS > 0 && " @"} {item?.ODDSRANGE}
                    </Typography>
                </TableCell>
                <TableCell size="small" align="right" sx={{ width: "45%", border: 0, py: 0 }}>
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
                                                color="black.main"
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
                                    borderRadius: 1.2,
                                    border: 1,
                                    borderColor: '#d3cece',
                                    textAlign: 'right',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 0,
                                        textAlign: 'right',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: '25px',
                                        fontSize: 13,
                                        textAlign: 'right',
                                    },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderRadius: 1.2,
                                        textAlign: 'right',
                                    },
                                }}
                            />
                        </Box>
                    </Stack>
                </TableCell>
            </TableRow>
        );
    };

    const RenderTableHeader = () => {
        return (
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ pb: 0.5 }}>
                <Stack className={classes.headerLeftContainer}>
                    <Typography className={classes.headerText} sx={{ width: 1 }}>
                        <i>Odds range (approx.)</i>
                    </Typography>
                </Stack>
                <Stack className={classes.headerRight}>
                    <Box>
                        <Typography className={classes.headerText} sx={{ width: 1 }}>
                            <i>Stake each bet</i>
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

    const handleOnClickSeeStakeDetails = () => {
        isDetailsExpanded ? setisDetailsExpanded(false) : setisDetailsExpanded(true)
        isDetailsExpanded ? setIsOddsFilterOpen(false) : setIsOddsFilterOpen(true)
        !isDetailsExpanded && handelOnClickOddsFilter()
    }

    return (
        <>
            {isloading && <CircularLoader />}
            {!isloading && !stake?.length > 0 && <NoDataLabal color="black" />}
            {!isloading && stake?.length > 0 && (
                <>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Stack className={classes.topRowWrapper} sx={{ width: "95%" }}>
                            {
                                !showGetTips &&
                                <Box
                                    className={
                                        isOddsFilterOpen
                                            ? classes.oddsFilteButtonExpanded
                                            : classes.oddsFilteButton
                                    }
                                    onClick={() => {
                                        handelOnClickOddsFilter();
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
                            }
                            {
                                stake?.length > 1 &&
                                <Stack flexDirection={'row'} justifyContent={'end'} alignItems="center">
                                    <Typography fontSize={showGetTips ? 16 : 13} mr={0.4}>
                                        <span style={{ fontSize: showGetTips ? 14 : 11 }}>Stake all </span>
                                        <b>{`${allBets} bet${allBets > 1 ? "s" : ""} `}</b>&nbsp;
                                    </Typography>
                                    <Box sx={{ width: '45%' }}>
                                        <TextField
                                            id={'stakeAll'}
                                            onChange={handleChangeStakeAll}
                                            classes={{
                                                root: classes.customTextField,
                                            }}
                                            value={allStake}
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
                                                            color="black.main"
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
                                                borderRadius: 1.2,
                                                border: 1,
                                                borderColor: (showGetTips && stakeErr) ? 'error.alerttext' : '#d3cece',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 0,
                                                    textAlign: 'right',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    height: '25px',
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
                    {
                        showGetTips &&
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            pb={2}
                            onClick={() => {
                                handleOnClickSeeStakeDetails();
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                fontSize={12}
                                sx={{
                                    cursor: 'pointer',
                                    color: 'info.comment',
                                }}
                            >
                                {isDetailsExpanded ? 'Hide staking options' : 'More staking options'}&nbsp;
                            </Typography>
                            {isDetailsExpanded ? (
                                <ExpandLess sx={{ color: '#3069d8', fontSize: 20 }} />
                            ) : (
                                <ExpandMore sx={{ color: '#3069d8', fontSize: 20 }} />
                            )}
                        </Stack>
                    }
                    {isOddsFilterOpen && (
                        <Box mx={1}>
                            <Typography component={"p"} fontSize={12} align="center" sx={{ width: 1 }}>
                                Odds range
                                <b>{` $${sliderValue[0]} -$${sliderValue[1]}`}</b>
                            </Typography>
                            {/*<Stack className={classes.oddsFilterWarapper}>
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
                            </Stack>*/}
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
                    {
                        showGetTips && isDetailsExpanded &&
                        <Stack className={classes.rowsWrapper} spacing={0.3}>
                            <RenderTableHeader />
                            <TableContainer sx={{ pl: 2, overflowY: "hidden" }}>
                                <Table aria-label="simple table" size="small">
                                    <TableBody>
                                        {stake?.length > 0 &&
                                            stake.map((item, index) => (
                                                <React.Fragment>
                                                    <RenderRow key={index} item={item} />
                                                    <TableRow>
                                                        <TableCell colSpan={2} sx={{ border: 0, p: 0 }}>
                                                            <Divider sx={{ borderColor: "#dfe3e8", boxShadow: "0 1px #fff" }} />
                                                        </TableCell>
                                                        <TableCell sx={{ border: 0 }}></TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    }
                    {
                        !showGetTips &&
                        <Stack className={classes.rowsWrapper} spacing={0.3}>
                            <RenderTableHeader />
                            <TableContainer sx={{ pl: 2, overflowY: "hidden" }}>
                                <Table aria-label="simple table" size="small">
                                    <TableBody>
                                        {stake?.length > 0 &&
                                            stake.map((item, index) => (
                                                <React.Fragment>
                                                    <RenderRow key={index} item={item} />
                                                    <TableRow>
                                                        <TableCell colSpan={2} sx={{ border: 0, p: 0 }}>
                                                            <Divider sx={{ borderColor: "#dfe3e8", boxShadow: "0 1px #fff" }} />
                                                        </TableCell>
                                                        <TableCell sx={{ border: 0 }}></TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    }
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
            )
            }
        </>
    );
};

export default BetDetailsExpandedView;

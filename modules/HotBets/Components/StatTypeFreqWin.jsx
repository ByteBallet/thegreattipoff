import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { getFormattedArray } from '@utils/hotBetUtils';
import { FREQ_WIN_TIL_TYPE } from '@lib/constants';

const useStyles = makeStyles((theme) => ({
    mainWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    dateSection: {
        width: '30%',
        background: '#ffffff',
        marginRight: -10,
        height: 80,
    },
    middleSection: {
        width: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        zIndex: 1,
    },
    dataSection: {
        width: '70%',
        marginLeft: -8,
        height: 80,
        flexDirection: 'column',
    },
    dataSectionContainer: {
        height: 70,
        background: theme.palette.background.default,
        paddingTop: 10,
        paddingLeft: 18,
        paddingRight: 8,
    },
    middleLine: {
        width: 2,
        background: theme.palette.border.yellow,
        height: 29,
    },
    middleCirculWrapper: {
        width: 22,
        height: 22,
        borderRadius: 20,
        border: 'solid',
        borderColor: '#ffff',
        borderWidth: 3,
        background: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    middleCircul: {
        width: 16,
        height: 16,
        borderRadius: 20,
        border: 'solid',
        borderColor: theme.palette.border.yellow,
        borderWidth: 2.5,
        background: 'white',
    },
    dataRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    //row start
    rowStartMainWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 5,
        marginTop: 23,
    },
    rowStartLeft: {
        width: '30%',
        background: '#ffffff',
        marginRight: -10,
        height: 5,
    },
    rowStartRight: {
        width: '70%',
        marginLeft: -8,
        height: 5,
        flexDirection: 'column',
    },
    smallCircul: {
        width: 8,
        height: 8,
        borderRadius: 20,
        border: 'solid',
        borderColor: theme.palette.border.yellow,
        borderWidth: 2.5,
        background: theme.palette.border.yellow,
    },
    smallLine: {
        width: 2,
        background: theme.palette.border.yellow,
        height: 20,
        marginTop: 3,
    },
    //row end
    rowEndMainWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 5,
        marginBottom: 20,
    },
    rowEndLeft: {
        width: '30%',
        background: '#ffffff',
        marginRight: -10,
        height: 5,
    },
    rowEndRight: {
        width: '70%',
        marginLeft: -8,
        height: 5,
        flexDirection: 'column',
    },
    endLine: {
        width: 2,
        background: theme.palette.border.yellow,
        height: 9,
        marginBottom: 3,
    },
}));

const StatTypeFreqWin = ({ data }) => {
    const classes = useStyles();
    const [newDataSet, setNewDataSet] = useState([]);

    useEffect(() => {
        const formattedArray = getFormattedArray(data);
        setNewDataSet(formattedArray);
    }, [data]);

    const RenderRow = ({ item }) => {
        return (
            <Stack className={classes.mainWrapper}>
                <Stack className={classes.dateSection}>
                    <Stack
                        sx={{ marginTop: 1.6, marginX: 1.5, marginBottom: 2 }}
                    >
                        <Typography fontSize={10} fontWeight="600">
                            {`${item?.RUNTYPE} ${item?.countRows}`}
                        </Typography>
                        <Typography fontSize={10}>
                            {(item?.RUNTYPE == "WEEK" || item?.RUNTYPE == "DAY") ? moment(item?.RACEDATE).format('DD MMM YYYY') : moment(item?.RACEDATE).format('MMM YYYY')}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack className={classes.middleSection}>
                    <Box className={classes.middleLine} />
                    <Box className={classes.middleCirculWrapper}>
                        <Box className={classes.middleCircul} />
                    </Box>
                    <Box className={classes.middleLine} />
                </Stack>

                <Stack className={classes.dataSection}>
                    <Stack className={classes.dataSectionContainer}>
                        <Stack className={classes.dataRowWrapper}>
                            <Typography fontSize={10}>
                                Number of tips
                            </Typography>
                            <Typography fontWeight={'600'} fontSize={10}>
                                {item?.TOTALTIPS}
                            </Typography>
                        </Stack>
                        <Stack className={classes.dataRowWrapper}>
                            <Typography fontSize={10}>
                                Profit on turnover
                            </Typography>
                            <Typography fontWeight={'600'} fontSize={10}>
                                {parseInt(item?.WINPROFIT)}%
                            </Typography>
                        </Stack>
                        <Stack className={classes.dataRowWrapper}>
                            <Typography fontSize={10}>
                                Cash profit @ $100 win bets
                            </Typography>
                            <Typography fontWeight={'600'} fontSize={10}>
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={parseInt(item?.WINRETURN * 100) - parseInt(item?.TOTALTIPS * 100)}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                    prefix="$ "
                                />
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack style={{ height: 10, background: 'white' }} />
                </Stack>
            </Stack>
        );
    };

    const RowStart = () => {
        return (
            <Stack className={classes.rowStartMainWrapper}>
                <Stack className={classes.rowStartLeft} />
                <Stack className={classes.middleSection}>
                    <Box className={classes.smallCircul} />
                    <Box className={classes.smallLine} />
                </Stack>
                <Stack className={classes.rowStartRight} />
            </Stack>
        );
    };

    const RowEnd = () => {
        return (
            <Stack className={classes.rowEndMainWrapper}>
                <Stack className={classes.rowEndLeft} />
                <Stack className={classes.middleSection}>
                    <Box className={classes.endLine} />
                    <Box className={classes.smallCircul} />
                </Stack>
                <Stack className={classes.rowEndRight} />
            </Stack>
        );
    };

    const RenderContent = ({ item }) => {
        switch (item?.type) {
            case FREQ_WIN_TIL_TYPE.START:
                return <RowStart />;
            case FREQ_WIN_TIL_TYPE.END:
                return <RowEnd />;
            case FREQ_WIN_TIL_TYPE.WIN:
                return <RenderRow item={item} />;
            case FREQ_WIN_TIL_TYPE.LOST:
                return (
                    <Typography fontSize={10} fontWeight="600">
                        {(item?.id == 0) ?
                            ""
                            :
                            (item?.grandtotaltips == 0) ?
                                `${item?.thiswinners} winners and ${item?.thisplacing} placings from ${item?.thistotaltips}`
                                :
                                `${item?.totalwinners} winners and ${item?.totalplacingings} placings from ${item?.grandtotaltips}`

                        }
                    </Typography>
                );
            default:
                break;
        }
    };

    return (
        <Stack>
            <Stack sx={{ marginTop: 1, marginX: 1.5, marginBottom: 2 }}>
                {newDataSet.length > 0 &&
                    newDataSet.map((item, idx) => (
                        <RenderContent item={item} key={idx} />
                    ))}
            </Stack>
        </Stack>
    );
};

export default StatTypeFreqWin;

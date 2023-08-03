import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import moment from 'moment';

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
}));

const StatTypeStrk = ({ data }) => {
    const classes = useStyles();

    const RenderRow = ({ item, num }) => {
        return (
            <Stack className={classes.mainWrapper}>
                <Stack className={classes.dateSection}>
                    <Stack
                        sx={{ marginTop: 1.6, marginX: 1.5, marginBottom: 2 }}
                    >
                        <Typography fontSize={10} fontWeight="600">
                            {item?.STREAKUNIT}&nbsp;{num}
                        </Typography>
                        <Typography fontSize={10}>
                            {(item?.STREAKUNIT == "WEEK" || item?.STREAKUNIT == "DAY") ? moment(item?.RACEDATE).format('DD MMM YYYY') : moment(item?.RACEDATE).format('MMM YYYY')}
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
                                    value={parseInt(item?.PROFITAMT * 100)}
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
    return (
        <Stack>
            <Stack sx={{ marginTop: 1, marginX: 1.5, marginBottom: 2 }}>
                {data.length > 0 &&
                    data.map((item, idx) => <RenderRow key={idx} item={item} num={data.length - idx} />)}
            </Stack>
        </Stack>
    );
};

export default StatTypeStrk;

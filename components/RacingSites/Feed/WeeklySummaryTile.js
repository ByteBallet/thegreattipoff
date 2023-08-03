import React from 'react';
import NumberFormat from 'react-number-format';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Batch from './Batch';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        paddingTop: '10px',
        borderColor: 'grey.joinBorder',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        paddingTop: '5px',
    },
    dot: {
        backgroundColor: theme.palette.primary.main,
        width: '8px',
        height: '8px',
        borderRadius: '20px',
        marginRight: '5px',
    },
    resultRowTitle: {
        fontSize: 13.5,
        fontWeight: '600',
        padding: 0,
        margin: 0,
    },
    resultRowText: {
        fontSize: 13,
        paddingLeft: '12px',
    },
}));

function Row({ label, stat, author, sublabel, stattype }) {
    return (
        <Stack my={0.5}>
            <Typography fontSize={13} color="grey.main">
                {label}
            </Typography>
            <Stack direction="row" mt={-0.5}>
                <Typography mr={0.5} fontSize={13} fontWeight="bold">
                    {author}
                </Typography>
                <Typography fontSize={13}>
                <NumberFormat
                    thousandSeparator={true}
                    value={stat}
                    decimalSeparator="."
                    decimalScale={0}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix={stattype}
                /> {sublabel}
                </Typography>
            </Stack>
        </Stack>
    );
}

function OverAllStat({ totaltips, totalwin, totalplace }) {
    return (
        <Typography fontSize={13}>
            <Typography fontSize={13} component={'span'} fontWeight="bold">
            <NumberFormat
                thousandSeparator={true}
                value={totaltips}
                decimalScale={0}
                fixedDecimalScale={true}
                displayType="text"
            /> tips&nbsp;
            </Typography>
            <Typography fontSize={13} component={'span'}>
                posted for&nbsp;
            </Typography>
            <Typography component={'span'} fontSize={13} fontWeight="bold">
            <NumberFormat
                thousandSeparator={true}
                value={totalwin}
                decimalScale={0}
                fixedDecimalScale={true}
                displayType="text"
            /> winners&nbsp;
            </Typography>
            <Typography component={'span'} fontSize={13}>
                and&nbsp;
            </Typography>
            <Typography component={'span'} fontSize={13} fontWeight="bold">
            <NumberFormat
                thousandSeparator={true}
                value={totalplace}
                decimalScale={0}
                fixedDecimalScale={true}
                displayType="text"
            /> placings.
            </Typography>
        </Typography>
    );
}

const WeeklySummaryTile = ({ postTypeLabel, content }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.cardContainer} container mx={2}>
                <Stack className={classes.topRow}>
                    <Batch text={postTypeLabel} />
                </Stack>
                <Box sx={{ width: '100%' }}>
                    <Row label="Top profit %" author={content?.topprofit?.tipster?.alias} stat={`${content?.topprofit?.stat}`} sublabel="%" stattype=''/>
                    <Divider />
                    <Row
                        label="Top cash profit"
                        author={content?.topcash?.tipster?.alias}
                        stat={content?.topcash?.stat}
                        sublabel=" from $100 bets"
                        stattype="$"
                    />
                    <Divider />
                    <Row label="Highest strike rate" author={content?.strikerate?.tipster?.alias} stat={`${content?.strikerate?.stat}`} sublabel="%" stattype=''/>
                    <Divider />

                    <Box my={2}>
                        <OverAllStat
                            totaltips={content.overall.totaltips}
                            totalwin={content.overall.totalwin}
                            totalplace={content.overall.totalplace}
                        />
                    </Box>
                </Box>
            </Grid>
        </React.Fragment>
    );
};

export default WeeklySummaryTile;

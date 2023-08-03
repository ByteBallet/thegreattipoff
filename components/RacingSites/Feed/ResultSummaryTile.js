import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Batch from './Batch';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        paddingTop: '10px',
        borderColor: 'grey.joinBorder',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
        paddingTop: '5px',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#f0f1f2',
        height: '55px',
        marginBottom: '15px',
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

const ResultSummaryTile = ({ content, siteName }) => {
    const classes = useStyles();

    const ResultRow = ({ result }) => {
        return (
            <Stack direction={'column'} sx={{ mb: 1.5 }}>
                <Stack direction={'row'} alignItems={'center'}>
                    <Box className={classes.dot} />{' '}
                    <Typography
                        className={classes.resultRowTitle}
                    >{`${result?.tipster?.firstname} ${result?.tipster?.surname}`}</Typography>
                </Stack>
                {result.stat.profit > 1 ? (
                    <Typography className={classes.resultRowText}>
                        <b>{result?.stat?.totaltips}</b> tips, <b>{result?.stat?.totalwin}</b> winners averaging{' '}
                        <b>${result?.stat?.avgwin}</b> making <b>${result?.stat?.profit}</b> from $100 win bets
                    </Typography>
                ) : (
                    <Typography className={classes.resultRowText}>
                        <b>{result?.stat?.totaltips}</b> tip{result?.stat?.totaltips > 1 ? 's' : ''}, <b>{result?.stat?.totalwin}</b>{' '}
                        winners
                    </Typography>
                )}
            </Stack>
        );
    };

    const date = moment(content.resultdate).format('dddd DD/MM/YYYY');

    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.cardContainer} container mx={2} pb={2}>
                <Stack className={classes.topRow}>
                    <Box sx={{ width: '76%' }}>
                        <Stack spacing={0} alignItems="flex-start">
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: 13,
                                }}
                            >
                                <b>{siteName}</b> {`tips result for ${date ?? ''}`}
                            </Typography>
                        </Stack>
                    </Box>
                    <Batch text={'RESULTS'} />
                </Stack>
                <Stack direction={'column'}>
                    {content?.results?.length > 0 &&
                        content?.results?.map(
                            (result) => <ResultRow key={result?.tipster?.surname} result={result} />
                            // result?.stat.profit > 1 ? <ResultRow key={result?.tipster?.surname} result={result} /> : <></>
                        )}
                </Stack>
            </Grid>
        </React.Fragment>
    );
};

export default ResultSummaryTile;

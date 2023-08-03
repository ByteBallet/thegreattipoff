import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import ExpandingCards from './ExpandingCards';

const useStyles = makeStyles((theme) => ({
    deskTopWrapper: {
        backgroundColor: '#fff',
        paddingTop: '15px',
    },

    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10px',
        borderBottomColor: '#d4d5d7',
        borderBottomWidth: '1px',
        paddingBottom: '4px',
    },
    detailsRowsWrapper: {
        backgroundColor: '#fff',
        width: '100%',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '15px',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    text: {
        fontSize: '12px',
    },
    textDesktop: {
        fontSize: '14px',
    },
}));

const DetailsSummary = ({ details, handleLoadPreviousLeaderBoard, isSelected, handleShowCurrentMonth }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');

    const date = new Date(details.startdate);
    const month = date.toLocaleString('default', { month: 'long' });

    const formattedDate = `${month} ${details.startdate.substring(0, 4)}`;

    const yourDetails = [
        { id: 1, label: 'Competion in progress:', data: { value: formattedDate, extra: '' } },
        { id: 2, label: 'Your tips entered:', data: { value: details.tipsentered, extra: ` (${details.tipsdue} tips due)` } },
        { id: 3, label: 'Your winners:', data: { value: details.mywinners, extra: ` (${details.wintips} winners needed)` } },
    ];

    const ExpandingCardData = [
        { id: 1, label: 'Prizes:', data: details.prize },
        { id: 2, label: 'Rules', data: details.rules },
        { id: 3, label: 'How are winners determined?', data: details.winnerdesc },
        { id: 4, label: 'Previous competitions', data: details.previouscomps, isArray: true },
    ];

    const DetailsRow = ({ detailSet, index }) => {
        return (
            <Stack className={classes.detailsRow} sx={{ borderBottom: index === 2 ? 'none' : 'solid' }}>
                {' '}
                <Typography className={isDesktop ? classes.textDesktop : classes.text}>{detailSet.label}</Typography>
                <Typography className={isDesktop ? classes.textDesktop : classes.text}>
                    <b>{detailSet.data.value}</b>
                    {detailSet.data.extra && <span style={{ color: 'red' }}>{detailSet.data.extra}</span>}
                </Typography>
            </Stack>
        );
    };
    return (
        <Grid container columns={16} className={isDesktop ? classes.deskTopWrapper : ''}>
            <Grid item xs={16} sm={8} md={8}>
                <Box className={classes.detailsRowsWrapper}>
                    {yourDetails.map((item, index) => (
                        <DetailsRow detailSet={item} key={item.id} index={index} />
                    ))}
                </Box>
            </Grid>
            <Grid item xs={16} sm={8} md={8}>
                <Box marginBottom={'20px'} marginTop={'10px'}>
                    {ExpandingCardData.map((item) => (
                        <ExpandingCards
                            key={item.id}
                            item={item}
                            handleLoadPreviousLeaderBoard={handleLoadPreviousLeaderBoard}
                            handleShowCurrentMonth={handleShowCurrentMonth}
                            isSelected={isSelected}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default DetailsSummary;

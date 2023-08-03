import React from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import GetTipsButton from '../Buttons/GetTipsButton';

import Batch from './Batch';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        paddingTop: '10px',
        borderColor: 'grey.joinBorder',
        paddingLeft: '15px',
        paddingRight: '15px',
    },
}));

function TipHeader({ postTypeLabel, name, tipcount, date }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box maxWidth={'90%'}>
                <Typography fontSize={14}>
                    {name} <span style={{ fontWeight: 'bold' }}>{tipcount}</span> Tips <br />
                </Typography>
                <Typography color="grey.main" fontSize={13}>
                    {moment(date).format('dddd DD/MM/YYYY')}{' '}
                </Typography>
            </Box>
            <Box>
                <Batch text={postTypeLabel} />
            </Box>
        </Box>
    );
}

function TipBody({ tips }) {
    // function getTipsString(arr) {
    //     let str = '';
    //     arr.forEach((element, index) => {
    //         str += `${element.availtips}@${element.location} ${arr.length - 1 == index ? '' : ','} `;
    //     });

    //     return str;
    // }

    if (!tips) return null;

    return (
        <Stack pb={0.5} direction="row">
            <Box>
                <Typography fontSize={14} noWrap fontWeight="bold">
                    {tips?.alias ? `${tips.alias} -` : ''} &nbsp;
                </Typography>
            </Box>
            <Box>
                {Array.isArray(tips.atips) &&
                    tips?.atips.map((tip, idx) => (
                        <Typography fontSize={14} key={idx} sx={{ textTransform: 'capitalize' }}>
                            <Typography fontSize={14} fontWeight="bold">
                                {tip.availtips}
                            </Typography>
                            @{tip.location.toLowerCase()}
                            {tips.atips.length - 1 == idx ? '' : ', '}
                        </Typography>
                    ))}
            </Box>
            {/* <Typography fontSize={13}>{getTipsString(tip.atips)}</Typography> */}
        </Stack>
    );
}

const TipTile = ({ postTypeLabel, content, siteName, handleChange }) => {
    const classes = useStyles();

    const tips = Object.values(content);

    if (tips.length == 0) return <></>;

    const totalTips = 0;
    tips.forEach((atip) => {
        if (Array.isArray(atip.atips)) {
            atip?.atips.forEach((item) => {
                totalTips += item?.totaltips;
            });
        }
    });

    function getTipDate(date) {
        if (date) {
            const currentDate = moment();
            const tip_date = moment(date);
            let diff = currentDate.diff(tip_date);
            if (diff < 0) return true;
            console.log('Diff date is', tip_date.format('DD-MM-YYYY-HH:MM'), currentDate.format('DD-MM-YYYY-HH:MM'), diff);
        }
        return false;
    }

    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.cardContainer} container>
                <TipHeader postTypeLabel={postTypeLabel} name={siteName} tipcount={totalTips ?? 0} date={tips[0].atips[0].racedate} />

                <Box width="100%" mt={1}>
                    <Divider light />
                </Box>
                <Box my={1}>
                    {tips.map((tip, key) => (
                        <TipBody key={key} tips={tip} />
                    ))}
                </Box>
            </Grid>
            {content?.lasttipdate && getTipDate(content?.lasttipdate) && (
                <Box width="100%" pb={2} mx={2}>
                    <Stack alignItems="center" justifyContent="center">
                        <Box width="60%">
                            <GetTipsButton content={null} onParentClick={handleChange} />
                        </Box>
                    </Stack>
                </Box>
            )}
        </React.Fragment>
    );
};

export default TipTile;

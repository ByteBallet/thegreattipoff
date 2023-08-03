import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({

    batchWrapper: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        paddingLeft: '5px',
        paddingRight: '5px',
        borderRadius: '4px',
    },
    batchText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff'
    },

}));

const Batch = ({ text }) => {

    const classes = useStyles();

    function getWidth() {
        if (text == "RESULTS" || text == "NEWS" || text == "TIPS") {
            return '75px'
        } else if (text == "WEEKLY SUMMARY") {
            return '130px'
        }
        return '100px'
    }

    return (<Box className={classes.batchWrapper} sx={{ width: getWidth() }}>
        <Typography className={classes.batchText}>
            {text}
        </Typography>
    </Box>
    )




};

export default Batch;




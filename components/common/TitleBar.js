import React from 'react';
import { makeStyles } from '@mui/styles';
import { Stack, Typography, useMediaQuery } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    titleBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    titleBarText: {
        fontWeight: 'bold', color: '#fff'
    }

}));

const TitleBar = ({ title, rightSideLink, racepage = false }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');


    return (

        <Stack className={classes.titleBar} sx={{ py: 1 }}>
            <Typography className={classes.titleBarText}>{title} {!racepage && "Races"}</Typography>
            {rightSideLink && rightSideLink()}
        </Stack>

    );
};

export default TitleBar;
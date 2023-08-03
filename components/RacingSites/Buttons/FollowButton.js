import React from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const useStyles = makeStyles((theme) => ({
    //
}));

const FollowButton = ({ content, siteName }) => {
    const classes = useStyles();

    return (<Button
        size="small"
        onClick={() => { }}
        variant="contained"
        startIcon={

            <NotificationsActiveIcon
                sx={{
                    fontSize: 10,
                    color: 'white.main',
                }}
            />

        }
        sx={{
            width: 'auto',
            borderRadius: 10,
            mr: 1,
            minWidth: 'auto',
            height: '35px',
            px: 1.5,
            py: 0.5,
            bgcolor: 'black.main',
            border: process.env.APP_BRAND == 'gto' ? 1 : 0,
            borderColor: 'black.main',

        }}
    >
        <Typography
            fontSize={13}
            color={'white.main'}
            fontWeight="600"
        >
            Follow
        </Typography>
    </Button>)

};

export default FollowButton;

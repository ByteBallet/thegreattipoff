import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const Footer18Plus = () => {
    return (
        <React.Fragment>
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ width: 50, height: 47, bgcolor: "white.main", border: 4, borderColor: "error.main" }}>
                    <Typography fontWeight="bold" fontSize={18}>18+</Typography>
                </Avatar>
                <Stack direction="column" >
                    <Typography color="inherit" fontSize={13} sx={{ mb: 1 }}>Help is close at hand</Typography>
                    <a href="https://www.gambleaware.nsw.gov.au" target="_blank" rel="noreferrer"><Typography color="inherit" fontSize={13}>www.gambleaware.nsw.gov.au</Typography></a>
                    <Typography color="inherit" fontSize={13}>1800 858 858</Typography>
                </Stack>
            </Stack>
        </React.Fragment >
    );
};

export default Footer18Plus;
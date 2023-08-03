import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const NoDataLabal = ({
    py = 10,
    color = 'white',
    text = "There's currently no HOT Bets available for your search criteria. Check back soon!",
}) => {
    return (
        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ py }}>
            <Typography style={{ color: color }} fontSize={14}>
                {text}
            </Typography>
        </Stack>
    );
};

export default NoDataLabal;

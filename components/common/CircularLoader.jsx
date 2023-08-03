import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CircularLoader = ({ py = 10 }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                py,
            }}
        >
            <CircularProgress color="primary" />
        </Box>
    );
};

export default CircularLoader;

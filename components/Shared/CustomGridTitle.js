import React from 'react';
import { Stack, Typography } from '@mui/material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

const CustomGridTitle = ({ size = 16, title, component = "h2" }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <GridViewRoundedIcon color="primary" />
            <Typography fontWeight="bold" noWrap component={component} fontSize={size}>{title}</Typography>
        </Stack>
    );
};

export default CustomGridTitle
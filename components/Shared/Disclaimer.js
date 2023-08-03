import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Stack, Typography } from '@mui/material';

const Disclaimer = () => {
    return (
        <Stack direction="row" sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={1}>
            <InfoIcon sx={{ color: 'info.comment', fontSize: 18 }} />
            <Typography fontSize={11}>
                <b>Disclaimer</b>&nbsp;GTO is not associated with other tipping sites.
            </Typography>
        </Stack>
    );
};

export default Disclaimer;

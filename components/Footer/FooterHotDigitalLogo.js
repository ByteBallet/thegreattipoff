import React from 'react';
import { Stack, Typography } from '@mui/material';

const FooterHotDigitalLogo = () => {
    return (
        <Stack direction="row" spacing={0} justifyContent="center" alignItems="center" sx={{ width: 1 }}>
            <a href="https://hotbettech.com.au" target="_blank" style={{ cursor: "pointer" }} rel="noreferrer">
                <img src="/images/tools/hotdigital.png" width={40} />
            </a>
            <Typography fontSize={12} align="right" sx={{ color: "#EC412B" }}>
                Betting system by&nbsp;
                <a href="https://hotbettech.com.au" target="_blank" style={{ cursor: "pointer" }} rel="noreferrer">
                    HOT Bet Technologies
                </a>
            </Typography>
        </Stack>
    );
};

export default FooterHotDigitalLogo;
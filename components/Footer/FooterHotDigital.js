import { Typography, Stack } from '@mui/material';
import Link from 'next/Link';
import React from 'react';

const FooterHotDigital = () => {
    return (
        <React.Fragment>
            <Stack direction="column">
                <a target="_blank" href="https://thegreattipoff.com/" style={{ textDecoration: "none", lineHeight: 1 }} rel="noreferrer">
                    <Typography color="inherit" fontSize={12} align="right" sx={{ cursor: "pointer" }} >
                        HOT Bet by <u>thegreattipoff.com</u>
                    </Typography>
                </a>
            </Stack>
        </React.Fragment >
    );
};

export default FooterHotDigital;
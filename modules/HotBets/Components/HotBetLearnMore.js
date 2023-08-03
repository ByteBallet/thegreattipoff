import React, { useState } from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HotBetInfo from './HotBetInfo';

const HotBetLearnMore = ({ textcolor = "white.main" }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');

    const [open, setopen] = useState(false);

    const onClose = () => {
        setopen(false)
    }

    const handleClick = () => {
        setopen(true)
    }
    return (
        <React.Fragment>
            <Stack
                flexDirection={'row'}
                alignItems={'center'}
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
            >
                <Typography
                    variant="p"
                    color={isDesktop ? "inherit" : textcolor}
                    align="left"
                    fontSize={14}
                >
                    Learn more
                </Typography>
                <InfoIcon
                    sx={{ ml: 1, color: isDesktop ? "inherit" : textcolor }}
                    fontSize="12"
                />
            </Stack>
            {
                open && <HotBetInfo open={open} onClose={onClose} />
            }
        </React.Fragment>
    );
};

export default HotBetLearnMore;
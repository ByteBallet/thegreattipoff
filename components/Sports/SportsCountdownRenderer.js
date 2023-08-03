import React from 'react';
import { Typography } from '@mui/material';

const SportsCountdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    props,
}) => {
    let data = "";
    let sign = ""
    if (completed) {
        sign = '-';
    }
    if (days > 0) {
        data = <Typography fontSize={12} color="inherit">{days} day{days > 1 && "s"}</Typography>;
    }
    else if (hours > 0) {
        data = hours < 1 && minutes < 10 ? (
            <Typography color="inherit" fontSize={13}>{minutes}m</Typography>
        ) : (
            <Typography color="inherit" fontSize={13}>{hours}h {minutes}m</Typography>
        );
    }
    else if (minutes > 0 && (minutes <= process.env.countdown || sign == '-')) {
        data = <Typography color="error.main" fontSize={13}>{sign} {minutes}m {seconds}s</Typography>
    } else if (minutes > 0 && minutes > process.env.countdown) {
        data = <Typography color={sign == '-' ? "error.main" : "inherit"} fontSize={13}>{sign} {minutes}m {seconds}s</Typography>
    } else {
        data = (
            <Typography fontSize={12} color="error.countdown">
                {sign} {seconds}s
            </Typography>
        );
    }
    return data
};

export default SportsCountdownRenderer;
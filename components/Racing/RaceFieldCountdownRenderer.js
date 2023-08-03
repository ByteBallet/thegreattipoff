import React from 'react';
import { Typography, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RaceFieldCountdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    props,
}) => {
    let sign = ""
    if (props.status !== 'open' && props.status !== '') {
        return (
            <Typography fontWeight="bold" fontSize={13} sx={{ display: "flex", alignItems: "end" }} noWrap className="textCapitalize">
                {props.status.toLowerCase() == "final" ? "Final Results" : props.status}
                {(props.status.toLowerCase() == "final") && <CheckCircleIcon color="black" sx={{ ml: 0.3 }} fontSize="small" />}
            </Typography>
        );
    }
    if (completed) {
        sign = '-';
    }

    if (days > 0) {
        return (
            <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>
        );
    } else if (hours > 0) {
        return hours <= 1 && minutes < 10 ? (
            <Typography color="text.default" fontSize={13} noWrap>{hours}h {minutes}m</Typography>
        ) : (
            <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>
        );
    } else {
        if (minutes > 0 && (minutes <= process.env.countdown || sign == '-')) {
            return (
                <Typography color="error.main" fontSize={13} noWrap>{sign}
                    {minutes}m {seconds}s</Typography>
            );
        } else if (minutes > 0 && minutes > process.env.countdown) {
            return (
                <Typography color="text.default" fontSize={13} noWrap>{sign}
                    {minutes}m</Typography>
            );
        } else {
            return (
                <Typography color="error.main" fontSize={13} noWrap>{sign} {seconds}s</Typography>
            );
        }
    }
};


export default RaceFieldCountdownRenderer;
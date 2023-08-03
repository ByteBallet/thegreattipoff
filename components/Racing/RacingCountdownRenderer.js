import React from 'react';
import { Typography, Avatar } from '@mui/material';

const RacingCountdownRenderer = ({
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
            <Typography color="text.default" fontSize={13} fontWeight="bold" className='textCapitalize'>
                {props.status == "final" ? "Resulted" : props.status}
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
            <Avatar variant="rounded" sx={{ bgcolor: "text.default", width: 60, height: 25, float: "right" }}>
                <Typography color="text.active" fontSize={13}>{hours}h {minutes}m</Typography>
            </Avatar>
        ) : (
            <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>
        );
    } else {
        if (minutes > 0 && (minutes <= process.env.countdown || sign == '-')) {
            return (
                <Avatar variant="rounded" sx={{ bgcolor: "error.main", width: 60, height: 25, float: "right" }}>
                    <Typography color="text.active" fontSize={13}>{sign}
                        {minutes}m {seconds}s</Typography>
                </Avatar>
            );
        } else if (minutes > 0 && minutes > process.env.countdown) {
            return (
                <Avatar variant="rounded" sx={{ bgcolor: "text.default", width: 60, height: 25, float: "right" }}>
                    <Typography color="text.active" fontSize={13}>{sign}
                        {minutes}m</Typography>
                </Avatar>
            );
        } else {
            return (
                <Avatar variant="rounded" sx={{ bgcolor: "error.main", width: 60, height: 25, float: "right" }}>
                    <Typography color="text.active" fontSize={13}>{sign} {seconds}s</Typography>
                </Avatar>
            );
        }
    }
};

export default RacingCountdownRenderer;
import React from 'react';
import { Typography, Avatar, Box } from '@mui/material';

const CountdownRenderHome = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    props,
}) => {
    let sign = '';
    if (props.status !== 'open' && props.status !== '') {
        return (
            <Typography
                color="text.default"
                fontSize={13}
                fontWeight="bold"
                className="textCapitalize"
            >
                {props.status == 'final' ? 'Resulted' : props.status}
            </Typography>
        );
    }
    if (completed) {
        sign = '-';
        // return <Typography color="text.default" fontSize={13}></Typography>;
    }

    if (days > 0) {
        return (
            <Typography color="text.default" fontSize={13}>
                {props.local_time}
            </Typography>
        );
    } else if (hours > 0) {
        return hours <= 1 && minutes < 10 ? (
            <Typography color="text.active" fontSize={13}>
                {hours}h {minutes}m
            </Typography>
        ) : (
            <Typography color="text.default" fontSize={13}>
                {props.local_time}
            </Typography>
        );
    } else {
        if (minutes > 0 && (minutes <= process.env.countdown || sign == '-')) {
            return (
                <div style={{ minWidth: 75 }}>
                    <Typography color="red" fontSize={13}>
                        {sign}
                        {minutes}m {seconds}s
                    </Typography>
                </div>
            );
        } else if (minutes > 0 && minutes > process.env.countdown) {
            return (
                <Typography color="black" fontSize={13}>
                    {sign}
                    {minutes}m
                </Typography>
            );
        } else {
            return (
                <Typography color="red" fontSize={13}>
                    {sign} {seconds}s
                </Typography>
            );
        }
    }
};

export default CountdownRenderHome;

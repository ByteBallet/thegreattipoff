import React from 'react';
import { Typography, Box, TableCell, Stack } from '@mui/material';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

const RacingDesktopCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    props,
}) => {
    let sign = ""
    let data = ""
    let redFlag = false
    if (props.status !== 'open' && props.status !== '') {
        data = (
            props.status.toLowerCase() == "final" ?
                <Typography component={"p"} fontWeight="bold" fontSize={11} className="textCapitalize" color="inherit">
                    Final<br />Results
                </Typography> :
                <Typography component={"p"} fontWeight="bold" fontSize={11} className="textCapitalize" color="inherit">
                    {props.status}
                </Typography>
        );
    } else {
        if (completed) {
            sign = '-';
            redFlag = true
        }

        if (days > 0) {
            data = (
                <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>
            );
        } else if (hours > 0) {
            data = hours <= 1 && minutes < 10 ? (
                <Typography color="text.default" fontSize={13} noWrap>{hours}h {minutes}m</Typography>
            ) : (
                <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>
            );
        } else {
            if (minutes > 0 && (minutes <= process.env.countdown || sign == '-')) {
                redFlag = true
                data = (
                    <Typography color="error.main" fontSize={13} noWrap>{sign}
                        {minutes}m {seconds}s</Typography>
                );
            } else if (minutes > 0 && minutes > process.env.countdown) {
                data = (
                    <Typography color="text.default" fontSize={13}>{sign}
                        {minutes}m</Typography>
                );
            } else {
                redFlag = true
                data = (
                    <Typography color="error.main" fontSize={13}>{sign} {seconds}s</Typography>
                );
            }
        }
    }
    data = <TableCell
        align="center"
        sx={{
            bgcolor: redFlag ? "error.alert" : "inherit",
            borderLeft: 1,
            borderBottom: props.borderBottom,
            borderColor: "border.secondary",
            color: "inherit",
            cursor: "pointer",
            py: 0
        }}
        onClick={() => props.onLink(props.pagelink)}>
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column" }}>
            {
                props.isSpecial &&
                <Box
                    sx={{
                        position: "absolute",
                        top: -15,
                        right: -12
                    }}>
                    <CurrencyExchangeOutlinedIcon sx={{ color: "info.comment" }} fontSize="15" />
                </Box>
            }
            {data}
        </Box>
    </TableCell>
    return data
};


export default RacingDesktopCountdown;
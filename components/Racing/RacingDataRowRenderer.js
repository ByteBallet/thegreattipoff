import React from 'react';
import { Typography, Avatar, Stack } from '@mui/material';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

// Renderer callback with condition
const RacingDataRowRenderer = ({ days, hours, minutes, seconds, completed, props }) => {
    let data = "";
    let redFlag = false;
    let iBadge = true;
    let ele = "";
    let sign = ""
    if (props.status !== 'open' && props.status !== '') {
        redFlag = true
        return (
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                <Typography fontSize={13} sx={{ display: "flex", alignItems: "end" }} noWrap className="textCapitalize">
                    {props.status == "final" ? "Resulted" : props.status}
                </Typography>
                {props.nextjumprace != "" && (
                    <Avatar className={redFlag ? "redBadge" : "greyBadge"} sx={{ width: 35, height: 35 }}>
                        <Typography className="tableFontsize" color={redFlag ? "error.countdown" : "text.default"}>
                            R{props.raceno}
                        </Typography>
                    </Avatar>
                )}
            </Stack>
        );
    }
    if (completed) {
        sign = '-';
    }

    if (days > 0) {
        data = <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>;
        iBadge = false;
    } else if (hours > 0) {
        data = hours <= 1 && minutes < 10 ? <Typography color="text.active" fontSize={13}>{hours}h</Typography> : <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>;
        iBadge = hours <= 1 && minutes < 10 ? true : false;
    } else {
        if (minutes > 0) {
            data = <Typography fontSize={13} color="text.active">{sign} {minutes}m {(minutes <= process.env.countdown || sign == '-') && seconds + "s"}</Typography>;
            redFlag = (minutes <= process.env.countdown || sign == '-') ? true : false;
        } else {
            data = <Typography fontSize={13} color="text.active" >{sign} {seconds}s</Typography>;
            redFlag = true;
        }
    }
    ele = <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
        {
            props.isSpecial &&
            <CurrencyExchangeOutlinedIcon sx={{ color: "info.comment" }} />
        }
        {data != "" &&
            iBadge ?
            <Avatar variant="rounded" sx={{ bgcolor: redFlag ? "error.main" : "text.default", width: 60, height: 25, float: "right" }}>
                {data}
            </Avatar> :
            <Avatar variant="rounded" sx={{ bgcolor: "white.main", width: 60, height: 25, float: "right" }}>
                {data}
            </Avatar>
        }
        {props.nextjumprace != "" && (
            <Avatar className={redFlag ? "redBadge" : "greyBadge"} sx={{ width: 35, height: 35 }}>
                <Typography className="tableFontsize" color={redFlag ? "error.countdown" : "text.default"}>
                    R{props.raceno}
                </Typography>
            </Avatar>
        )}
    </Stack>
    return ele;
};

export default RacingDataRowRenderer;
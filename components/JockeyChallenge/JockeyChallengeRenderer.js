import React from 'react';
import { Typography, Avatar, Stack } from '@mui/material';

// Renderer callback with condition
const JockeyChallengeRenderer = ({ days, hours, minutes, seconds, completed, props }) => {
    let data = "";
    let redFlag = false;
    let iBadge = true;
    let ele = "";
    let sign = ""
    if (props.status !== 'open' && props.status !== '') {
        redFlag = true
        return (
            <Typography fontSize={13} sx={{ display: "flex", alignItems: "end" }} noWrap className="textCapitalize">
                {props.status == "final" ? "Resulted" : props.status}
            </Typography>
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
    ele = <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
        {data != "" &&
            iBadge ?
            <Avatar variant="rounded" sx={{ bgcolor: redFlag ? "error.main" : "text.default", width: 60, height: 25, float: "right" }}>
                {data}
            </Avatar> : data
        }
    </Stack>
    return ele;
};

export default JockeyChallengeRenderer;
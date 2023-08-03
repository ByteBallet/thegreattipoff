
import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Countdown from 'react-countdown';
import { Typography, Stack, SvgIcon } from '@mui/material';
import moment from 'moment';
import horses from "../../public/images/svg/horse-racing.svg";
import harness from "../../public/images/svg/harness-racing.svg";
import greys from "../../public/images/svg/greys-racing.svg";
// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
    let data = "";
    let redFlag = false;
    let ele = "";
    if (completed) {
        return ele;
    } else {
        if (days > 0) {
            data = <Typography fontSize={15}>{props.local_time}</Typography>;
        } else if (hours > 0) {
            data = hours <= 1 && minutes < 10 ? <Typography fontSize={15}>{hours}h</Typography> : <Typography fontSize={15}>{props.local_time}</Typography>;
        } else {
            if (minutes > 0) {
                data = <Typography fontSize={15} color={(minutes <= process.env.countdown || sign == '-') ? "error.countdown" : "text.default"}>{minutes}m {minutes < process.env.countdown && seconds + "s"}</Typography>;
                redFlag = (minutes <= process.env.countdown || sign == '-') ? true : false;
            } else {
                data = <Typography fontSize={15} color="error.countdown" >{seconds}s</Typography>;
                redFlag = true;
            }
        }
    }
    ele = <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
        <Avatar className={redFlag ? "redBadge" : "greyBadge"} sx={{ width: 35, height: 35 }}>
            <Typography fontSize={12} color={redFlag ? "error.countdown" : "text.default"}>R{props.raceno}</Typography>
        </Avatar>
        {data}
    </Stack>;
    return ele;
};
const NextRaceJumpRow = (props) => {
    let local_date = moment.utc(props.race.RACETIMEUTC).local().format();
    let local_time = moment.utc(props.race.RACETIMEUTC).local().format('HH:mm');
    return (
        <TableRow key={props.race.RACEID}>
            <TableCell align="left" padding="none">
                {props.race.RACETYPE == 'R' ?
                    <SvgIcon color="grey.light" component={horses} viewBox="0 0 466.36 510.95" /> : props.race.RACETYPE == 'H' ?
                        <SvgIcon color="grey.light" component={harness} viewBox="0 0 1101 1850" /> :
                        <SvgIcon color="grey.light" component={greys} viewBox="0 0 1633 1465" />
                }
            </TableCell>
            <TableCell>
                <Typography className='textCapitalize'>{props.race.RACEMEET.toLowerCase()}</Typography>
            </TableCell>
            <TableCell padding="none">
                <Countdown
                    date={new Date(local_date)}
                    renderer={renderer}
                    raceno={props.race.RACENUM}
                    local_time={local_time} />
            </TableCell>
            <TableCell align="right" padding="none">
                <KeyboardArrowRightOutlinedIcon fontSize="medium" sx={{ mt: 1 }} />
            </TableCell>
        </TableRow >
    );
};

export default NextRaceJumpRow;
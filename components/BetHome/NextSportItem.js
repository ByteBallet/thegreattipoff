import { useState, useCallback, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
// import Countdown from "react-countdown";
import { Typography, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import moment from 'moment';
import horses from '../../public/images/svg/horse-racing.svg';
import { useRouter } from 'next/router';
import Countdown from 'react-countdown';
import RacingCountdownRenderer from '@Components/Racing/RacingCountdownRenderer';
import sgm from "@public/images/svg/sgm-icon.svg";

const getTimeString = (time) => {
    if (time >= 3600) {
        return `${parseInt(time / 3600)}h`;
    } else if (time > 60) {
        // return new Date(time * 1000).toISOString().substr(14, 5);
        // return `${parseInt(time / 60)}M ${time % 60}S`;
        return `${parseInt(time / 60)}m`;
    }
    return `${time}s`;
};
const isTimeUrgent = (time) => {
    return time <= 300;
};

const NewCountdown = ({ time }) => {
    let timeUrgent = isTimeUrgent(time);
    let timeString = getTimeString(time);
    return (
        <Stack
            direction="row"
            spacing={1.5}
            alignItems="right"
            className="floatRight"
        >
            <Typography
                sx={{ float: 'right', textAlign: 'right' }}
                color={timeUrgent ? 'error.countdown' : 'black.main'}
                fontSize={13}
            >
                {timeString}
            </Typography>
        </Stack>
    );
};
const NextSportItem = ({ data, isHome = false, showBorder = true }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter();
    // console.log('NextSportItem data=', data);

    let local_date = moment
        .utc(Date.now() + 1000 * data.mjs)
        .local()
        .format();
    let local_time = moment
        .utc(Date.now() + 1000 * data.mjs)
        .local()
        .format('HH:mm');

    const [time, setTimer] = useState(data.mjs);
    let idx;

    // console.log("local_date", local_date, "local_time", local_time);
    // const [time, setTimer] = useState(0);

    useEffect(() => {
        setTimer(data.mjs);
        return () => clearInterval(idx);
    }, [data]);
    useEffect(() => {
        idx = setInterval(() => {
            if (time > 0) {
                setTimer(time - 1);
            } else {
                return () => clearInterval(idx);
            }
        }, 1000);
        return () => clearInterval(idx);
    }, [time]);

    const link = `/sports/${data.sn.split(' ').join('_')}/${(data.mg ? data.mg : data.eventgroup)
        .split(' ')
        .join('_')}/${data.eid}`;

    const onLink = (href) => {
        router.push({
            pathname: href + `/${data.sc}`
        });
    };
    let isSGM = data.sgm
    return (
        <TableRow key={data.eid} onClick={() => onLink(link)} sx={{ cursor: "pointer" }}>
            <TableCell align="left" padding="none" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                {/* <SvgIcon
          color="grey.light"
          component={horses}
          viewBox="0 0 466.36 510.95"
        /> */}
                <object
                    data={`/images/svg/icon-${data.sc}.svg`}
                    type="image/svg+xml"
                    width={data.sc == "RGLE" ? "30" : "35"}
                    height="35"
                    alt={data.sc}
                />
            </TableCell>
            <TableCell padding="none" style={{ paddingLeft: '1px' }} sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                <Typography className="tableFontsize" component="p">
                    <Typography
                        noWrap
                        className="tableFontsize"
                        component="p"
                        sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            width: isDesktop && !isHome ? 300 : 190,
                        }}
                    >
                        {data.tan}{' '}
                        <span style={{ textTransform: 'none' }}>vs</span>{' '}
                        {data.tbn}
                    </Typography>
                    {
                        !isDesktop &&
                        <Typography sx={{ opacity: '50%', fontSize: 12 }}>
                            {data.gn}
                        </Typography>
                    }
                </Typography>
            </TableCell>
            <TableCell padding="none" style={{ paddingLeft: '1px' }} sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                {isSGM &&
                    // <img src="/images/svg/sgm-icon.svg" alt="SGM" width={30} />
                    <SvgIcon
                        fontSize='small'
                        sx={{ width: 30, mt: 1 }}
                        color="grey.light"
                        component={sgm}
                        viewBox="0 0 2032.96 1048.56"
                    />
                }
            </TableCell>
            <TableCell padding="none" style={{ paddingLeft: '1px' }} align="right" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                <NewCountdown time={time} className="floatRight" />
            </TableCell>
            <TableCell align="right" padding="none" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                <KeyboardArrowRightOutlinedIcon
                    fontSize="medium"
                    sx={{ mt: 1 }}
                />
            </TableCell>
        </TableRow>
    );
};

export default NextSportItem;

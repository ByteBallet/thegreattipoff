import React from 'react';
import { TableCell, Avatar, TableRow, Typography, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import moment from "moment";
import Countdown from "react-countdown";
import horses from "../../public/images/svg/horse-racing.svg";
import harness from "../../public/images/svg/harness-racing.svg";
import greys from "../../public/images/svg/greys-racing.svg";
import Link from "next/Link"
import RacingCountdownRenderer from "./RacingCountdownRenderer";
import { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from "../../Context/User/UserProvider";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

const RacingNextToJumpRow = (props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    let local_date = moment.utc(props.race.RACETIMEUTC).local().format();
    let local_time = moment.utc(props.race.RACETIMEUTC).local().format('HH:mm');
    const pagelink = `racing/${props.race.RACEMEET.toLowerCase()}`;
    const countDownRef = useRef();
    const refIDHome = useRef();
    const [status, setStatus] = useState('');

    useEffect(() => {
        return () => clearInterval(refIDHome.current);
    }, []);

    function resultsCheck() {
        const newIntervalId = setInterval(() => {
            const url = `${process.env.server}/selecttips/getRacePrices`;
            // TODO: To be replaced by clientid
            let body = { raceid: props.race.RACEID, clientid: user.clientID ? user.clientID : "" };
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                },
                body: JSON.stringify(body),
            };

            fetch(url, options)
                .then((res) => res.json())
                .then((data) => {
                    let raceState = data.raceStatus.status.toLowerCase();
                    if (!raceState) return;

                    if (raceState.toLowerCase() !== 'open') {
                        setStatus(raceState);
                        if (
                            countDownRef.current &&
                            !countDownRef.current.isStopped()
                        ) {
                            countDownRef.current.stop();
                        }
                    }

                    if (raceState.toLowerCase() == 'final') {
                        clearInterval(refIDHome.current);
                    }
                })
                .catch((e) => console.log(e));
        }, 10000);

        refIDHome.current = newIntervalId;
    }

    return (
        <>
            {(status.toLowerCase() != 'final') &&
                <Link href={`/${pagelink}/${props.race.RACEID}`}>
                    <TableRow key={props.race.RACEID} sx={{ cursor: "pointer" }}>
                        <TableCell align="left" padding="none">
                            <Stack direction="row" spacing={1} alignItems="center">
                                {props.race.RACETYPE == 'R' ?
                                    <SvgIcon color="grey.light" component={horses} viewBox="0 0 466.36 510.95" sx={{ fontSize: 25 }} /> : props.race.RACETYPE == 'H' ?
                                        <SvgIcon color="grey.light" component={harness} viewBox="0 0 1101 1850" sx={{ fontSize: 25 }} /> :
                                        <SvgIcon color="grey.light" component={greys} viewBox="0 0 1633 1465" sx={{ fontSize: 25 }} />
                                }
                                <Typography className='tableFontsize'>{props.race.RACEMEET.toLowerCase()} {!isDesktop && "-"} R{props.race.RACENUM}
                                    {
                                        !isDesktop && <Typography color="grey.dark" fontSize={13} className="textCapitalize">&nbsp;{props.race.COUNTRYLABEL ? props.race.COUNTRYLABEL.toLowerCase() : ""}</Typography>
                                    }
                                </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell padding="none">
                            {
                                user.clientID && props.race.ISSPECIAL > 0 && <CurrencyExchangeOutlinedIcon sx={{ color: "info.comment", mr: 0.5 }} />
                            }
                        </TableCell>
                        <TableCell padding="none" align="right">
                            <Countdown
                                ref={countDownRef}
                                overtime={true}
                                date={new Date(local_date)}
                                renderer={RacingCountdownRenderer}
                                local_time={local_time}
                                status={status.toLowerCase()}
                                onStart={() => {
                                    let a = moment().utc();
                                    if (moment.utc(props.race.RACETIMEUTC).diff(a) < 0 && props.race.FINALEVENTSTATUS != 1) {
                                        resultsCheck();
                                    }
                                }}
                                onStop={() => {
                                    //if (flag) setFlag(false);
                                }}
                                onComplete={() => {
                                    //if (flag) setFlag(false);
                                    resultsCheck();
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </Link>
            }
        </>
    );
};

export default RacingNextToJumpRow;
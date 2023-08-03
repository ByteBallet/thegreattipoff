import React from 'react';
import { TableCell, Avatar, TableRow, Typography, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import moment from "moment";
import Countdown from "react-countdown";
import horses from "../../public/images/svg/horse-racing.svg";
import harness from "../../public/images/svg/harness-racing.svg";
import greys from "../../public/images/svg/greys-racing.svg";
import Link from "next/Link"
import { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from "../../Context/User/UserProvider";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import RaceFieldCountdownRenderer from '@Components/Racing/RaceFieldCountdownRenderer';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

const NextRacingItem = ({ race, reloadData, showBorder = true }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    let local_date = moment.utc(race.RACETIMEUTC).local().format();
    let local_time = moment.utc(race.RACETIMEUTC).local().format('HH:mm');
    const pagelink = `racing/${race.RACEMEET.toLowerCase()}`;
    const countDownRef = useRef();
    const refIDHome = useRef();
    const [status, setStatus] = useState('open');

    const raceid = useRef();

    useEffect(() => {
        return () => {
            resetTimer()
        }
    }, [race.RACEID]);

    useEffect(() => {
        raceid.current = race.RACEID;
        return () => {
            resetTimer()
        }
    }, []);

    const resetTimer = () => {
        clearInterval(refIDHome.current);
        setStatus('open')
        refIDHome.current = 0
    }

    function resultsCheck() {
        const url = `${process.env.server}/selecttips/getRacePrices`;
        // TODO: To be replaced by clientid
        let body = { raceid: race.RACEID, clientid: user.clientID ? user.clientID : "", status: true };
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

                if (raceState !== 'open') {
                    setStatus(raceState);
                    if (
                        countDownRef.current &&
                        !countDownRef.current.isStopped()
                    ) {
                        countDownRef.current.stop();
                    }
                    clearInterval(refIDHome.current);
                    refIDHome.current = 0
                    reloadData()
                }
            })
            .catch((e) => console.log(e));

    }

    function startResultCheck() {
        const newIntervalId = setInterval(() => {
            if (status.toLowerCase() != 'open') return;
            resultsCheck()
        }, 30000);
        refIDHome.current = newIntervalId;
    }

    return (
        <>
            {(race?.FINALEVENTSTATUS != 1) &&
                <Link href={`/${pagelink}/${race.RACEID}`}>
                    <TableRow key={race.RACEID} sx={{ cursor: "pointer", border: 0 }}>
                        <TableCell align="left" padding="none" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                {race.RACETYPE == 'R' ?
                                    <SvgIcon color="grey.light" component={horses} viewBox="0 0 466.36 510.95" sx={{ fontSize: 25 }} /> : race.RACETYPE == 'H' ?
                                        <SvgIcon color="grey.light" component={harness} viewBox="0 0 1101 1850" sx={{ fontSize: 25 }} /> :
                                        <SvgIcon color="grey.light" component={greys} viewBox="0 0 1633 1465" sx={{ fontSize: 25 }} />
                                }
                                <Typography className='tableFontsize'>{race.RACEMEET.toLowerCase()} {!isDesktop && "-"} R{race.RACENUM}
                                </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell padding="none" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                            {
                                user.clientID && race.ISSPECIAL > 0 && <CurrencyExchangeOutlinedIcon sx={{ color: "info.comment", mr: 0.5 }} />
                            }
                        </TableCell>
                        <TableCell padding="none" align="right" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                            <Countdown
                                ref={countDownRef}
                                overtime={true}
                                date={new Date(local_date)}
                                renderer={RaceFieldCountdownRenderer}
                                local_time={local_time}
                                status={status}
                                onStart={() => {
                                    // reload after 2 minutes
                                    let a = moment().utc();
                                    if (moment.utc(race.RACETIMEUTC).diff(a) < 0 && race.FINALEVENTSTATUS != 1) {
                                        resultsCheck()
                                        startResultCheck()
                                        // setTimeout(() => {
                                        //     reloadData()
                                        // }, 120000);
                                    }
                                }}
                                onStop={() => {
                                }}
                                onComplete={() => {
                                    startResultCheck()
                                    // reload after 2 minutes
                                    // setTimeout(() => {
                                    //     reloadData()
                                    // }, 120000);
                                }}
                            />
                        </TableCell>
                        <TableCell align="right" padding="none" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.joinBorder" }}>
                            <KeyboardArrowRightOutlinedIcon
                                fontSize="medium"
                                sx={{ mt: 1 }}
                            />
                        </TableCell>
                    </TableRow>
                </Link>
            }
        </>
    );
};

export default NextRacingItem;
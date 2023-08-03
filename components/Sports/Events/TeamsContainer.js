import React from 'react';
import { useState, useRef, useContext, useEffect } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from "next/image";
import moment from 'moment';
import Countdown from 'react-countdown';
import SportsCountdownRenderer from '../SportsCountdownRenderer';
import { UserContext } from '@Context/User/UserProvider';
import BoxDivider from '@Components/Shared/BoxDivider';


const TeamsContainer = ({ match, status, handleStateUpdates, skipTimer = false }) => {
    const { user } = useContext(UserContext);
    const countDownRef = useRef();
    const refIDHome = useRef();
    const [suspendtime, setsuspendtime] = useState(match.suspendtime);
    let local_date = moment.utc(suspendtime).local().format();
    let local_day = moment.utc(suspendtime).local().format('dddd');
    let local_time = moment.utc(suspendtime).local().format('HH:mm');
    let diff = moment(moment().format('YYYY-MM-DD')).diff(moment(local_date).format('YYYY-MM-DD'), "days")
    let event_day = diff == 0 ? "Today" : diff == -1 ? "Tomorrow" : local_day

    useEffect(() => {
        return () => clearInterval(refIDHome.current);
    }, []);

    const getStatusUpdate = () => {
        // TODO: To be replaced by clientid
        const url = `${process.env.server}/sports/GetEventMatch`;
        let body = {
            eventid: match.eventid,
            submarketgroup: true,
            sgm: false,
            clientid: user.clientID ? user.clientID : "",
            status: true
        };
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
                let raceState = status
                if (data.ERROBJ.ERRORCODE > 0) {
                    raceState = "closed"
                } else {
                    raceState = data.sportevent.eventstatus.toLowerCase();
                    setsuspendtime(data.sportevent.suspendtime)
                }
                if (!raceState) return;
                if (raceState.toLowerCase() !== 'open') {
                    handleStateUpdates("status", raceState)
                    if (
                        countDownRef.current &&
                        !countDownRef.current.isStopped()
                    ) {
                        countDownRef.current.stop();
                    }
                }

                if (raceState.toLowerCase() !== 'open') {
                    clearInterval(refIDHome.current);
                }
            })
            .catch((e) => console.log(e));
    }

    function resultsCheck() {
        const newIntervalId = setInterval(() => {
            getStatusUpdate()
        }, 10000);
        refIDHome.current = newIntervalId;
    }

    const getTeam = (teamname, teamcode) => {
        return <Stack direction="column" alignItems="center" sx={{ height: "100%" }}>
            {
                teamcode &&
                <Image
                    src={`https://silks.elitebet.com.au/assets/teamsilks/silks/${teamcode.replace(/_/g, "/")}.png`}
                    alt={teamname}
                    width="45"
                    height="33"
                />
            }
            <Typography component='p' fontWeight="bold" fontSize={12} align="center" mt={0.7} color="inherit" className='lineClamp' lineHeight={1.1}>
                {teamname}
            </Typography>
        </Stack>
    }
    return (
        <Grid
            container
            item
            spacing={0}
            p={1}
            columnSpacing={0.5}
            sx={{
                color: "inherit"
            }}>
            <Grid item xs zeroMinWidth>
                {getTeam(match?.teama?.teamname, match?.teama?.teamcode)}
            </Grid>
            <Grid item xs={3.5} zeroMinWidth>
                <Stack direction="column" alignItems="center">
                    <Typography fontSize={14} fontWeight="bold" color="inherit">{match.isUS ? "@" : "vs"}</Typography>
                    <Typography fontSize={12} noWrap mt={0.7} color="inherit">
                        {event_day}&nbsp;{local_time}
                    </Typography>
                    {status == "open" ?
                        <Countdown
                            overtime={true}
                            date={new Date(local_date)}
                            renderer={SportsCountdownRenderer}
                            onStart={() => {
                                let a = moment().utc();
                                if (moment.utc(suspendtime).diff(a) < 0) {
                                    !skipTimer && getStatusUpdate()
                                    !skipTimer && resultsCheck();
                                }
                            }}
                            onComplete={() => {
                                !skipTimer && resultsCheck();
                            }}
                        /> :
                        <Typography fontSize={12} noWrap mt={0.7} color="inherit" fontWeight="bold">
                            Closed
                        </Typography>
                    }
                </Stack>
            </Grid>
            <Grid item xs zeroMinWidth>
                {getTeam(match.teamb.teamname, match.teamb.teamcode)}
            </Grid>
            {
                !skipTimer && match?.location?.length > 0 &&
                <Grid item xs={12}>
                    <BoxDivider />
                    <Typography color="inherit" fontSize={11} align="center" sx={{ display: "flex", mb: 1, justifyContent: "center" }}>{match?.location}</Typography>
                </Grid>
            }
        </Grid>
    );
};

export default TeamsContainer;
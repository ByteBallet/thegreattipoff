import React from 'react';
import { useEffect, useState, useContext, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Stack, SvgIcon, Divider } from '@mui/material';
import moment from 'moment';
import Countdown from 'react-countdown';
import { UserContext } from '@Context/User/UserProvider';
import authAPI from '@Components/utils/authAPI';
import JockeyChallengeRenderer from './JockeyChallengeRenderer';
import horses from "../../public/images/svg/horse-racing1.svg";
import harness from "../../public/images/svg/harness-racing.svg";
import greys from "../../public/images/svg/greys-racing.svg";
import JockeyChallengeFields from './JockeyChallengeFields';

const JockeyAccordion = ({ expanded, setExpanded, race, handleBetSlip }) => {
    const [details, setDetails] = useState({})
    const [raceStatus, setRaceStatus] = useState(race.jockeyevent.raceStatus.status.toLowerCase());
    const [raceResulted, setRaceResulted] = useState(false);
    const countDownRef = useRef();
    const refIDHome = useRef();
    const { user } = useContext(UserContext);
    let local_date = moment.utc(race.jockeyevent.racetimeUTC).local().format();
    let jcdate = moment.utc(race.jockeyevent.racetimeUTC).local().format("DD MMM YY");
    let local_time = moment.utc(race.jockeyevent.racetimeUTC).local().format("HH:mm");

    const getJockeyChallengeDetails = async (raceid) => {
        let body = {
            clientid: user.clientID ? user.clientID : "",
            raceid: raceid
        };
        const url = `${process.env.server}/races/getjockeychallenge`;
        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE == 0) {
                setDetails(response.data.jockeyset[0])
            }
        }
    }

    const handleClick = (panel) => (event, isExpanded) => {
        if (raceStatus == "open") {
            setExpanded(isExpanded ? panel : false);
            isExpanded && getJockeyChallengeDetails(panel)
        }
    }

    function resultsCheck() {
        const newIntervalId = setInterval(() => {
            const url = `${process.env.server}/selecttips/getRacePrices`;
            // TODO: To be replaced by clientid
            let body = {
                raceid: race.jockeyevent.raceStatus.eventid,
                clientid: user.clientID ? user.clientID : ""
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
                    let raceState = data.raceStatus.status.toLowerCase();
                    if (!raceState) return;

                    if (raceState.toLowerCase() !== 'open') {
                        setRaceStatus(raceState);
                        setExpanded(false)
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

    useEffect(() => {
        (raceStatus == "open" && expanded == race.jockeyevent.raceStatus.eventid) && getJockeyChallengeDetails(expanded)
        return () => clearInterval(refIDHome.current);
    }, [])

    return (
        <Box bgcolor="white.main">
            <Accordion
                defaultExpanded={expanded == race.jockeyevent.raceStatus.eventid}
                expanded={expanded == race.jockeyevent.raceStatus.eventid}
                onChange={handleClick(race.jockeyevent.raceStatus.eventid)}
                square
                elevation={0}
                TransitionProps={{ unmountOnExit: true }}
            >
                <AccordionSummary
                    expandIcon={raceStatus != "open" ? null : <ExpandMoreIcon color="black.main" />}
                    aria-controls={`${race.jockeyevent.raceStatus.eventid}-content`}
                    id={`${race.jockeyevent.raceStatus.eventid}-header`}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                        <Stack direction="row" alignItems="center">
                            {
                                race.jockeyevent.racetype == "G"
                                    ?
                                    <SvgIcon component={greys} viewBox="0 0 1633 1465" sx={{ width: 20, height: 20 }} />
                                    :
                                    race.jockeyevent.racetype == "H"
                                        ?
                                        <SvgIcon component={harness} viewBox="0 0 1101 1850" sx={{ width: 20, height: 20 }} />
                                        :
                                        <SvgIcon component={horses} viewBox="0 0 466.36 510.95" sx={{ width: 20, height: 20 }} />
                            }
                            <Typography mx={0.5} fontSize={14} className="textCapitalize">
                                {race.jockeyevent.eventname}
                            </Typography>
                            <Typography color="grey.dark" fontSize={12}>
                                {jcdate}
                            </Typography>
                        </Stack>
                        <Countdown
                            overtime={true}
                            date={new Date(local_date)}
                            renderer={JockeyChallengeRenderer}
                            local_time={local_time}
                            status={raceStatus.toLowerCase()}
                            onStart={() => {
                                let a = moment().utc();
                                if (moment.utc(race.jockeyevent.racetimeUTC).diff(a) < 0 && raceStatus != "final") {
                                    resultsCheck();
                                }
                            }}
                            onComplete={() => {
                                resultsCheck();
                            }}
                        />
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    <>
                        <Divider sx={{ borderColor: "grey.border1", mx: 2 }} />
                        {
                            details && Object.keys(details).length > 0 &&
                            <JockeyChallengeFields
                                details={details}
                                expanded={expanded}
                                raceStatus={raceStatus}
                                setRaceStatus={setRaceStatus}
                                setRaceResulted={setRaceResulted}
                                raceResulted={raceResulted}
                                handleBetSlip={handleBetSlip}
                                raceid={race.jockeyevent.raceStatus.eventid}
                            />
                        }
                    </>
                </AccordionDetails>
            </Accordion>
        </Box >
    );
};

export default JockeyAccordion;
import React from 'react';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useContext } from 'react';
import RacingDesktopCountdown from './RacingDesktopCountdown';
import { UserContext } from '@Context/User/UserProvider';
import Countdown from 'react-countdown';
import moment from 'moment';
import { TableCell, Typography } from '@mui/material';

const RacingDataCountdown = ({ detail, index, pagelink, results, totallength }) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const countDownRef = useRef();
    const refIDHome = useRef();
    const [status, setStatus] = useState('');

    const onLink = (href) => {
        router.push(href)
    }
    useEffect(() => {
        return () => clearInterval(refIDHome.current);
    }, []);

    const updateStatus = (raceid) => {
        const url = `${process.env.server}/selecttips/getRacePrices`;
        // TODO: To be replaced by clientid
        let body = { raceid: raceid, clientid: user.clientID ? user.clientID : "" };
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
    }

    function resultsCheck(raceid) {
        const newIntervalId = setInterval(() => {
            updateStatus(raceid)
        }, 10000);
        refIDHome.current = newIntervalId;
    }
    let res = results ? results.filter((race) => race.raceid == detail.RACEID && race.status.toLowerCase() == "final").map((item) => item.result.split(",").join(", ").replace(", ,", ",")) : []
    return (
        <React.Fragment>
            {((detail.FINALEVENTSTATUS == 1 && res.length > 0) || detail.ABANDONED == 1) ?
                <TableCell
                    align="center"
                    sx={{
                        bgcolor: "grey.desktop",
                        borderLeft: 1,
                        borderBottom: index + 1 != totallength ? 1 : 0,
                        borderColor: "border.secondary",
                        color: "grey.dark",
                        cursor: "pointer"
                    }}
                    onClick={() => onLink(`/${pagelink}/${detail.RACEID}`)}
                >

                    <Typography noWrap fontSize={11} color="inherit">
                        {detail.ABANDONED == 1 ? "Abnd" : res}
                    </Typography>
                </TableCell> :

                <Countdown
                    overtime={true}
                    date={new Date(moment.utc(detail.RACETIMEUTC).local().format())}
                    renderer={RacingDesktopCountdown}
                    local_time={moment.utc(detail.RACETIMEUTC).local().format('HH:mm')}
                    status={status.toLowerCase()}
                    borderBottom={index + 1 != totallength ? 1 : 0}
                    pagelink={`/${pagelink}/${detail.RACEID}`}
                    isSpecial={detail.ISSPECIAL > 0 && user.clientID}
                    onLink={onLink}
                    onStart={() => {
                        let a = moment().utc();
                        if (moment.utc(detail.RACETIMEUTC).diff(a) < 0) {
                            updateStatus(detail.RACEID)
                            resultsCheck(detail.RACEID);
                        }
                    }}
                    onStop={() => {
                        //if (flag) setFlag(false);
                    }}
                    onComplete={() => {
                        //if (flag) setFlag(false);
                        resultsCheck(detail.RACEID);
                    }}
                />
            }
        </React.Fragment>
    );
};

export default RacingDataCountdown;
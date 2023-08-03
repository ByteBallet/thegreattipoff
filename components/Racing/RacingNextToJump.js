import React from 'react';
import { useEffect, useState, useContext } from 'react';
import authAPI from '../utils/authAPI';
import { Box, CircularProgress } from '@mui/material';
import { Table, TableContainer, TableBody } from '@mui/material';
import RacingNextToJumpRow from './RacingNextToJumpRow';
import { UserContext } from '../../Context/User/UserProvider';
import moment from 'moment';

// This is the next to jump filter on the home screen
const RacingNextToJump = (props) => {
    const { user } = useContext(UserContext);
    let races = [];
    const [data, setRaceData] = useState([]);
    const [loading, setLoading] = useState(true);
    let today = moment();
    let racedate = today.format('YYYY-MM-DD');

    useEffect(() => {
        async function getRaceEventsdata(racetype, racemeet) {
            let body = {
                racetype: JSON.stringify(racetype),
                startdate: racedate,
                enddate: racedate,
                country: JSON.stringify(racemeet),
                jsonresp: '1',
                paramsObj: '1',
                nexttojump: '1',
                clientid: user.clientID ? user.clientID : "",
                userid: user.userID ? user.userID : 0,
                reclimit: 50,
                promo: user.promo,
            };
            const url = `${process.env.server}/races/getRaceDayEvents`;
            const response = await authAPI(url, body, 'POST', false);
            races = !response.error
                ? response.data.ERROBJ.ERRORCODE == 0
                    ? response.data.qRace
                    : []
                : [];

            setRaceData(races);
            setLoading(false);
        }
        getRaceEventsdata(props.racetype, props.racemeet);
    }, [props]);

    return (
        <>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color="primary" />
                </Box>
            )}
            {!loading && data.length > 0 && (
                <Box sx={{ backgroundColor: 'text.active' }}>
                    <TableContainer component={Box} px={2}>
                        <Table
                            aria-label="caption table"
                            size="small"
                            className="racingTable"
                        >
                            <TableBody>
                                {data.map((row, idx) => (
                                    <RacingNextToJumpRow
                                        racedate={racedate}
                                        race={row}
                                        idx={idx}
                                        key={`Race-${row.RACEID}-${idx}`}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
};

export default RacingNextToJump;

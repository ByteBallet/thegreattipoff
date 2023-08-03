import React from 'react';
import { Box, TableContainer, Table, TableBody, Typography } from '@mui/material';
import moment from 'moment';
import RaceMeetRaces from './RaceMeetRaces';

const RaceMeetGroups = ({ racesOpen, racesResulted, races, setRender, render }) => {
    return (
        <>
            {
                racesOpen.length > 0 &&
                <Box sx={{ backgroundColor: 'text.active' }}>
                    <TableContainer component={Box} px={2}>
                        <Table
                            aria-label="caption table"
                            size="small"
                            className="racingTable"
                        >
                            <TableBody>
                                {racesOpen.map((row, idx) => (
                                    <RaceMeetRaces
                                        racedate={moment(
                                            row.RACEDATE
                                        ).format('YYYY-MM-DD')}
                                        nextjump={
                                            races.filter(
                                                (race, idx) =>
                                                    race.RACEID ==
                                                    row.raceid
                                            )[0]}
                                        idx={row.raceid}
                                        key={`Race-${row.raceid}-${idx}`}
                                        status={0}
                                        setRender={setRender}
                                        render={render}
                                        raceid={row.raceid}
                                        result={row}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            }
            {
                racesResulted.length > 0 &&
                <Box sx={{ backgroundColor: 'text.active' }}>
                    <Typography
                        fontSize={14}
                        component="p"
                        fontWeight="fontWeightBold"
                        py={1}
                        px={2}
                        sx={{
                            backgroundColor:
                                'background.default',
                        }}
                    >
                        Resulted
                    </Typography>
                    <TableContainer component={Box} px={2}>
                        <Table
                            aria-label="caption table"
                            size="small"
                            className="racingTable"
                        >
                            <TableBody>
                                {racesResulted.map((row, idx) => (
                                    <RaceMeetRaces
                                        racedate={moment(
                                            row.RACEDATE
                                        ).format('YYYY-MM-DD')}
                                        nextjump={
                                            races.filter(
                                                (race, idx) =>
                                                    race.RACEID ==
                                                    row.raceid
                                            )[0]}
                                        idx={row.raceid}
                                        key={`Race-${row.raceid}-${idx}`}
                                        status={1}
                                        setRender={setRender}
                                        render={render}
                                        raceid={row.raceid}
                                        result={row}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            }
        </>
    );
};

export default RaceMeetGroups;
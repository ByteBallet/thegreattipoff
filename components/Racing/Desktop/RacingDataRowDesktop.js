import React from 'react';
import { Stack, TableCell, Typography, TableRow } from '@mui/material';
import RacingDataCountdown from './RacingDataCountdown';

const RacingDataRowDesktop = ({ race, colCount, length, index, results }) => {
    let leftoverCols = race.RACEDETAIL ? colCount - race.RACEDETAIL.length : colCount
    const raceType = race.RACETYPE === "R" ? "racing" : race.RACETYPE === "G" ? "greyhound" : "harness";
    const pagelink = `${raceType}/${race.RACEMEET.toLowerCase()}`;
    return (
        <TableRow>
            <TableCell
                align="left"
                sx={{
                    borderBottom: 1,
                    borderColor: "border.secondary",
                    pl: 0
                }}>
                <Stack direction="column" alignItems="start">
                    <Typography mr={0.5} fontSize={14} className="textCapitalize" fontWeight="bold">
                        {race.RACEMEET.toLowerCase().trim()}
                    </Typography>
                    <Typography color="grey.dark" fontSize={12}>
                        {race.RACECOUNTRY == "AU" ? race.REGION : race.RACECOUNTRY}
                    </Typography>
                </Stack>
            </TableCell>
            {
                [...Array(colCount)].map((col, idx) =>
                    <React.Fragment key={idx}>
                        {
                            (race.RACEDETAIL && race.RACEDETAIL.filter((r) => r.RACENUM == idx + 1).length > 0) ?
                                <RacingDataCountdown
                                    detail={race.RACEDETAIL.filter((r) => r.RACENUM == idx + 1)[0]}
                                    key={idx}
                                    index={index}
                                    pagelink={pagelink}
                                    results={results}
                                    totallength={length} /> :
                                <TableCell
                                    key={idx}
                                    sx={{
                                        borderLeft: 1,
                                        borderBottom: 1,
                                        borderColor: "border.secondary"
                                    }}>
                                </TableCell>
                        }
                    </React.Fragment>
                )
            }
        </TableRow>
    );
};

export default RacingDataRowDesktop;
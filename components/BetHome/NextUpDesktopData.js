import React, { useEffect, useCallback, useState } from 'react';
import moment from 'moment';
import { Table, TableBody } from '@mui/material';
import NextSportItem from './NextSportItem';
import NextRacingItem from './NextRacingItem';

const NextUpDesktopData = ({ data, type, switchFilter = false, reloadData }) => {
    return (
        <Table
            aria-label="caption table"
            size="small"
            className="racingTable"
        >
            <TableBody>
                {type == "Sports" &&
                    data &&
                    data.length > 0 &&
                    data[0].mjs &&
                    data.map((row, idx) => (
                        <NextSportItem
                            data={row}
                            idx={idx}
                            key={idx}
                            reloadData={reloadData}
                            isHome={true}
                            showBorder={idx < 4}
                        />
                    ))}
                {type != "Sports" &&
                    data &&
                    data.length > 0 &&
                    data[0].RACETIMEUTC &&
                    data.map((row, idx) => (
                        <NextRacingItem
                            race={row}
                            idx={idx}
                            key={idx}
                            reloadData={reloadData}
                            showBorder={idx != (data.length - 1)}
                        />
                        // <RacingNextToJumpRow
                        //     racedate={moment().format('YYYY-MM-DD')}
                        //     race={row}
                        //     idx={idx}
                        //     key={`Race-${row.RACEID}-${idx}`}
                        // />
                    ))}
            </TableBody>
        </Table>
    );
};

export default NextUpDesktopData;
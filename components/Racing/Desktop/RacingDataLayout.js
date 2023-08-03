import React from 'react';
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Table, Divider, Paper } from '@mui/material';
import RacingDataRowDesktop from './RacingDataRowDesktop';
import BoxDivider from '@Components/Shared/BoxDivider';

const RacingDataLayout = ({ data, results }) => {
    let colCount = data ? Math.max(...data.map(o => o.TOTALRACES)) : 0
    return (
        <React.Fragment>
            <TableContainer component={Paper} elevetion={1}
                sx={{
                    pl: 1.5
                }}>
                <Table aria-label="a dense table" size="small" className='RacingDesktopTable'>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="left"
                                padding="none"
                                sx={{
                                    borderBottom: 1,
                                    borderColor: "border.secondary",
                                    color: "grey.dark",
                                }}>Location</TableCell>
                            {
                                [...Array(colCount)].map((col, idx) =>
                                    <TableCell
                                        align="center"
                                        key={idx}
                                        sx={{
                                            borderLeft: 1,
                                            borderBottom: 1,
                                            borderColor: "border.secondary",
                                            color: "grey.dark"
                                        }}>{idx + 1}
                                    </TableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((race, idx) =>
                                <RacingDataRowDesktop
                                    race={race}
                                    colCount={colCount}
                                    index={idx}
                                    length={data.length}
                                    key={idx}
                                    results={results}
                                />
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ backgroundColor: "background.default", pt: 2, pb: 0.5 }}>
                <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
            </Box>
        </React.Fragment>
    );
};

export default RacingDataLayout;
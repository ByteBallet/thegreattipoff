import React from 'react';
import { TableCell, TableHead, TableContainer, Table, TableBody, TableRow, Box, Typography, Avatar, Stack } from '@mui/material';
import NumberFormat from 'react-number-format';

const Exotics = (props) => {
    const res = props.data.RESULT.split(",")
    let exotics = { "PAYQN": "Quinella", "PAYEX": "Exacta", "PAYTR": "Trifecta", "PAYFF": "First 4", "PAYQD": "Quaddie" }
    return (
        <TableContainer component={Box} mt={0.5}>
            <Table aria-label="caption table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan='2' padding="none" ><Typography fontSize={11} color="grey.dark">Bet Type</Typography> </TableCell>
                        <TableCell align="right" padding="none" ><Typography fontSize={11} color="grey.dark">Dividend</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(exotics).map((key, index) => (
                            (index != "3" || res.length == 4) && (props.raceStatus == "interim" || props.data[key] != "") &&
                            <TableRow key={index}>
                                <TableCell padding="none">
                                    <Typography fontWeight="600" fontSize={13}>{exotics[key]}</Typography>
                                </TableCell>
                                <TableCell>
                                    {
                                        key == "PAYQD" ?
                                            <Box py={2}></Box>
                                            :
                                            <Stack direction="row" spacing={1}>
                                                <Box className="textAlignCoulmnCenter">
                                                    <Typography color="grey.dark" fontSize={11}>1st</Typography>
                                                    <Avatar variant="square" sx={{ width: 40, height: 22, bgcolor: "background.default" }}>
                                                        <Typography fontWeight="600" fontSize={13}>{res[0]}</Typography>
                                                    </Avatar>
                                                </Box>
                                                <Box className="textAlignCoulmnCenter">
                                                    <Typography color="grey.dark" fontSize={11}>2nd</Typography>
                                                    <Avatar variant="square" sx={{ width: 40, height: 22, bgcolor: "background.default" }}>
                                                        <Typography fontWeight="600" fontSize={13}>{res[1]}</Typography>
                                                    </Avatar>
                                                </Box>
                                                {index >= 2 &&
                                                    <Box className="textAlignCoulmnCenter">
                                                        <Typography color="grey.dark" fontSize={11}>3rd</Typography>
                                                        <Avatar variant="square" sx={{ width: 40, height: 22, bgcolor: "background.default" }}>
                                                            <Typography fontWeight="600" fontSize={13}>{res[2]}</Typography>
                                                        </Avatar>
                                                    </Box>
                                                }
                                                {index >= 3 &&
                                                    <Box className="textAlignCoulmnCenter">
                                                        <Typography color="grey.dark" fontSize={11}>4th</Typography>
                                                        <Avatar variant="square" sx={{ width: 40, height: 22, bgcolor: "background.default" }}>
                                                            <Typography fontWeight="600" fontSize={13}>{res[3]}</Typography>
                                                        </Avatar>
                                                    </Box>
                                                }
                                            </Stack>
                                    }
                                </TableCell>
                                <TableCell align="right" padding="none">
                                    <Typography fontWeight="600" fontSize={13}>
                                        {props.data[key] != "" ?
                                            <NumberFormat
                                                thousandSeparator
                                                value={props.data[key]}
                                                decimalSeparator="."
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                displayType="text" />
                                            :
                                            "TBD"
                                        }
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer >
    );
};

export default Exotics;
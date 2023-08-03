import React from 'react';
import { TableCell, TableRow, Table, Typography, Grid, Box } from '@mui/material';
import NumberFormat from 'react-number-format';

const ShowDividends = ({ race, field }) => {
    let states = ["QLD", "VIC", "NSW"]
    return (
        <Box>
            {
                race.TOPFLUC != 0 &&
                <Grid container sx={{ py: 0.3 }}>
                    <Grid container item xs justifyContent="flex-end">
                        <Typography fontSize={13} color="grey.dark">Top Fluc</Typography>
                    </Grid>
                    <Grid item xs={1.5} sx={{ fontSize: 13 }} container justifyContent="flex-end">
                        <NumberFormat
                            value={race.TOPFLUC}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text" />
                    </Grid>
                    <Grid item xs={1.5} sx={{ fontSize: 13 }} container justifyContent="flex-end"></Grid>
                    <Grid item xs={1.5}></Grid>
                </Grid>
            }
            {
                states.map((state, idx) =>
                    <Grid container key={idx} sx={{ py: 0.3 }}>
                        <Grid container item xs justifyContent="flex-end">
                            <Typography fontSize={13} color="grey.dark">{state}</Typography>
                        </Grid>
                        <Grid item xs={1.5} sx={{ fontSize: 13 }} container justifyContent="flex-end">
                            {
                                race.POSITION == 1 &&
                                <NumberFormat
                                    value={state == "QLD" ? race.WINQLD : state == "VIC" ? race.WINVIC : race.WINNSW}
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    displayType="text" />
                            }

                        </Grid>
                        <Grid item xs={1.5} sx={{ fontSize: 13 }} container justifyContent="flex-end">
                            <NumberFormat
                                value={state == "QLD" ? race.PLACEQLD : state == "VIC" ? race.PLACEVIC : race.PLACENSW}
                                decimalSeparator="."
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType="text" />
                        </Grid>
                        <Grid item xs={1.5}></Grid>
                    </Grid>
                )
            }
        </Box >


    );
};

export default ShowDividends;
import React, { useState } from 'react';
import BetSlipSingleLegs from '@Components/BetSlip/BetSlipSingleLegs';
import { Divider, Box, Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ShowTipDetails = ({ singles, stakeSettings }) => {
    const [endRow, setendRow] = useState(5);
    const slicedArray = singles.slice(0, endRow);
    return (
        <React.Fragment>
            <Grid container spacing={0}>
                {slicedArray?.map((tip, idx) => (
                    <React.Fragment key={idx}>
                        <Grid item xs={12}>
                            <BetSlipSingleLegs
                                tip={tip}
                                showX={false}
                                betReceipt={true}
                                stakeSettings={stakeSettings}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider
                                sx={{ my: 2, borderColor: 'grey.dividends' }}
                            />
                        </Grid>
                    </React.Fragment>
                ))}
                {singles.length > 5 && endRow <= singles.length && (
                    <React.Fragment>
                        <Grid
                            item
                            xs={12}
                            container
                            alignItems={'center'}
                            justifyContent="center"
                        >
                            <Button
                                color="white"
                                variant="text"
                                endIcon={
                                    <KeyboardArrowDownIcon fontSize="small" />
                                }
                                onClick={() => setendRow(endRow + 5)}
                            >
                                show more
                            </Button>
                        </Grid>
                    </React.Fragment>
                )}
            </Grid>
        </React.Fragment>
    );
};

export default ShowTipDetails;

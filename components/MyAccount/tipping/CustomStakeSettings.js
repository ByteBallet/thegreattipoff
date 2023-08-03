import React, { useRef, useState } from 'react';
import { Box, Stack, Typography, TextField, Divider, Grid, Button } from '@mui/material';
import { getUserStaking } from '@services/user/userService';
import { MyFormHelperText2 } from '@Components/common/MyFormHelperText';
import { calculateStakeSettings, validateStakeSettings } from '@Components/utils/util';

const CustomStakeSettings = ({ error1, setError1, lowRef, highRef, setsettings, defaultStake }) => {
    const handleBlur = (e) => {
        let low = +lowRef?.current?.value
        let high = +highRef?.current?.value
        const validate = validateStakeSettings(low, high)
        if (validate?.err) {
            setError1({
                status: 404,
                type: "error",
                msg: validate?.msg
            })
        } else {
            setError1(null)
            let stakes = calculateStakeSettings(+lowRef?.current?.value, +highRef?.current?.value)
            setsettings(stakes)
        }
    }
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            {
                defaultStake &&
                <React.Fragment>
                    <Box my={2} sx={{ bgcolor: "background.default", height: 2, width: 1 }}>
                    </Box>
                    <Stack direction="column" alignItems={"center"} justifyContent="center">
                        <Typography component="p" fontSize={14}>
                            Enter your staking range in units/dollars.<br />Maximum stake amount is $1000.
                        </Typography>
                        <Grid container mt={2} alignItems="center">
                            <Grid container item xs={5} justifyContent="center">
                                <Typography component="p" fontSize={13}>Lowest</Typography>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid container item xs={5} justifyContent="center">
                                <Typography component="p" fontSize={13}>Highest</Typography>
                            </Grid>
                            <Grid container item xs={5} justifyContent="center">
                                <TextField
                                    inputRef={lowRef}
                                    type="number"
                                    id="input-with-icon-textfield"
                                    variant="outlined"
                                    placeholder='Enter stake'
                                    size="small"
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            fontSize: 14,
                                        }
                                    }}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    sx={{
                                        bgcolor: "background.default",
                                        '& .Mui-focused': {
                                            bgcolor: 'white.main',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            textAlign: "center"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Divider />
                            </Grid>
                            <Grid container item xs={5} justifyContent="center">
                                <TextField
                                    inputRef={highRef}
                                    type="number"
                                    id="input-with-icon-textfield"
                                    variant="outlined"
                                    placeholder='Enter stake'
                                    size="small"
                                    onBlur={handleBlur}
                                    InputProps={{
                                        style: {
                                            fontSize: 14,
                                        }
                                    }}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                    }}
                                    sx={{
                                        bgcolor: "background.default",
                                        '& .Mui-focused': {
                                            bgcolor: 'white.main',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            textAlign: "center"
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </React.Fragment>
            }
            {error1 && (
                <MyFormHelperText2>
                    {error1}
                </MyFormHelperText2>
            )}
        </Box>
    );
};

export default CustomStakeSettings;
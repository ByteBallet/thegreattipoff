import { Box, Grid, SvgIcon, Typography } from '@mui/material';
import Link from 'next/Link';
import React from 'react';
import hotbet from '@public/images/svg/hotbet-blue.svg';
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import NumberFormat from 'react-number-format';

const HotbetRacingRow = ({ racetype, data, racedate }) => {
    let rtype = racetype === "R" ? "racing" : racetype === "G" ? "greyhound" : "harness";

    let hrefLink = `/hotbets/${rtype}/${racedate}`

    if(process.env.APP_BRAND === 'gto'){
        let gRtype = racetype === "R" ? "horse" : racetype === "G" ? "greyhound" : "harness";
        hrefLink = `/tipmarket/${gRtype}-racing-tips`
    }

    return (
        <Link href={hrefLink}>
            <Box sx={{
                width: "100%",
                height: "100%",
                borderBottom: 1,
                borderColor: 'grey.border1',
                mx: 2,
                display: 'flex',
                alignItems: "center",
                cursor: "pointer"
            }}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <Typography fontWeight="bold" fontSize={14}>
                            HOT Bets
                        </Typography>
                        <SvgIcon component={hotbet} viewBox="0 0 44.593 55.624"
                            sx={{
                                fontSize: 17,
                                ml: 0.5,
                                color: "info.comment"
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-end" container alignItems="center">
                        <Typography color="info.comment" fontSize={14}>
                            <NumberFormat
                                thousandSeparator={true}
                                value={data}
                                displayType="text"
                            /> Tips available
                        </Typography>
                        <KeyboardArrowRightOutlinedIcon fontSize="20" />
                    </Grid>
                </Grid>
            </Box>
        </Link>
    );
};

export default HotbetRacingRow;
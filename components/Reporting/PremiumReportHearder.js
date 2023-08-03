import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import moment from 'moment';

const PremiumReportHearder = ({ report, isDesktop }) => {
    return (
        <React.Fragment>
            <Box>
                <Avatar
                    src={`${process.env.cdn}/images/racecontent/reportavatar/${report?.qUser?.[0].ALIAS}-Profile.png`}
                    sx={{ width: 200, height: 200, ml: 2, border: 4, borderColor: "white.main" }}
                />
                <Stack
                    direction="column" spacing={1.5} alignItems={isDesktop ? "start" : "center"}
                    sx={{
                        pb: 5,
                        position: "absolute",
                        left: isDesktop ? "5%" : "10%"
                    }}>
                    <Typography
                        component={"p"}
                        sx={{
                            bgcolor: "black.main",
                            p: 1.5,
                            color: "white.main",
                            fontWeight: "bold",
                            fontSize: 20,
                            mt: 1,
                            '@media print': {
                                bgcolor: "black.main",
                                color: "white.main",
                                WebkitPrintColorAdjust: "exact"
                            }
                        }}>
                        {report?.qUser?.[0].FIRSTNAME}&nbsp;{report?.qUser?.[0].SURNAME}&apos;s
                    </Typography>
                    <Typography
                        component={"p"}
                        sx={{
                            bgcolor: "#672089",
                            p: 1.5,
                            color: "white.main",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 20,
                            '@media print': {
                                bgcolor: "#672089",
                                color: "white.main",
                                WebkitPrintColorAdjust: "exact"
                            }
                        }}>
                        Premium Racing package
                    </Typography>
                </Stack>
                <Box sx={{
                    bgcolor: "#672089",
                    '@media print': {
                        bgcolor: "#672089",
                        WebkitPrintColorAdjust: "exact"
                    }
                }}>
                    <img
                        src={`${process.env.cdn}/images/racecontent/tipreport-titlepage-${report?.client}.png`}
                        style={{
                            maxHeight: isDesktop ? 1000 : 400,
                            marginTop: -120,
                            width: "100%",
                            minHeight: 400,
                        }}
                    />
                </Box>
                <Box sx={{
                    bgcolor: "#672089",
                    mt: -1,
                    '@media print': {
                        bgcolor: "#672089",
                        WebkitPrintColorAdjust: "exact"
                    },
                    display: "flex",
                    flexDirection: isDesktop ? "row" : "column",
                    justifyContent: "start",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        bgcolor: "background.legs",
                        p: 1.5,
                        mx: { xs: 5, md: 5 },
                        width: { xs: "auto", md: "40%" },
                        mt: -1,
                        '@media print': {
                            bgcolor: "background.legs",
                            WebkitPrintColorAdjust: "exact",
                            mx: { xs: 5, md: "auto" },
                            mb: 2,
                            width: { xs: "auto", md: "40%" },
                            mt: -1,
                        }
                    }} >
                        <Typography component={"p"} color="primary.main" fontSize={18} fontWeight="bold" align="center" sx={{ width: 1 }}>CONTENTS</Typography>
                        <ul className="ListSquareStyle">
                            {
                                (report?.qPackage?.[0]?.AUDIOFILE?.length > 0 || report?.qPackage?.[0]?.DATAFILE?.length > 0 ||
                                    report?.qPackage?.[0]?.DATAFILE2?.length > 0) &&
                                <li>
                                    <Typography component={"p"} color="white.main" fontSize={16}>Premium Features</Typography>
                                </li>
                            }
                            {
                                (report?.qBestTips?.length > 0) &&
                                <li>
                                    <Typography component={"p"} color="white.main" fontSize={16}>Best Bets</Typography>
                                </li>
                            }
                            {
                                (report?.qStake?.length > 0) && report?.client == "gto" &&
                                <li>
                                    <Typography component={"p"} color="white.main" fontSize={16}>Staking Plan</Typography>
                                </li>
                            }
                            {
                                report?.qmeetingSummary?.map((item, idx) =>
                                    <li key={idx}>
                                        <Typography component={"p"} color="white.main" fontSize={16}>{item?.RACEMEET}&nbsp;({item?.RACESTATE})</Typography>
                                        <Typography component={"p"} color="white.main" fontSize={16}>Top Rated Runners</Typography>
                                    </li>
                                )
                            }
                        </ul>
                    </Box>
                    <Stack direction="column" alignItems={isDesktop ? "start" : "center"} justifyContent={isDesktop ? "start" : "center"} sx={{ mt: { xs: 2, md: 0 } }}>
                        <Typography fontSize={20} fontWeight="bold" color="white.main">
                            {moment(report?.racedate).format("dddd, DD MMMM YYYY")}
                        </Typography>
                        {
                            report?.qmeetingSummary?.map((item, idx) =>
                                <Typography key={idx} fontWeight="bold" component={"p"} color="white.main" fontSize={28} className='textCapitalize'>
                                    {item?.RACEMEET?.toLowerCase()}&nbsp;({item?.RACESTATE})
                                </Typography>
                            )
                        }
                    </Stack>
                </Box>
            </Box>
        </React.Fragment >
    );
};

export default PremiumReportHearder;
import { Avatar, Box, Typography, Grid, Divider } from '@mui/material';
import React from 'react';
import { groupByKey } from '@Components/utils/util';
import NumberFormat from 'react-number-format';

const PremiumReportBestBets = ({ report, renderTitle, renderAvatar, renderRacemeet, isDesktop }) => {
    let data = report?.qBestTips?.length > 0 ? groupByKey(report?.qBestTips, "RACEMEET") : {}

    const renderByHighlight = (data) => {
        let grpByHighlights = data?.length > 0 ? groupByKey(data, "HIGHLIGHT") : {}
        return <React.Fragment>
            {
                Object.keys(grpByHighlights).map((key, idx) =>
                    <Box key={idx}>
                        <Typography component={"p"} color="primary.main" fontSize={22} mb={3} mt={4} px={1} fontWeight={"bold"}>
                            {key == "EachWay" ? "Best Each Way" : key == "Roughie" ? "Best Roughie" : key + " Bet"}
                        </Typography>
                        {
                            renderRaceDetails(grpByHighlights[key])
                        }
                    </Box>
                )
            }
        </React.Fragment>
    }

    const renderRaceDetails = (data) => {
        let grpByRacenum = data?.length > 0 ? groupByKey(data, "RACENUM") : {}
        return <React.Fragment>
            {
                Object.keys(grpByRacenum).map((key, idx) =>
                    <Box key={idx}>
                        <Typography component={"p"} color="black.main" fontSize={16} mb={2} mt={4} px={1}>
                            <b>Race&nbsp;{key}</b>&nbsp;-&nbsp;{grpByRacenum?.[key]?.[0]?.EVENT}&nbsp;-&nbsp;{grpByRacenum?.[key]?.[0]?.RACESTATE}&nbsp;-&nbsp;<b>{grpByRacenum?.[key]?.[0]?.RACEDISTANCE}</b>
                        </Typography>
                        {
                            grpByRacenum[key]?.map((item, idx) =>
                                <React.Fragment key={idx}>
                                    <Typography component={"p"} fontSize={12} align="right">Fixed Odds<sup>*</sup></Typography>
                                    <Box sx={{ ml: 1, my: 1 }}>
                                        <Grid container spacing={1} sx={{ border: 1, borderColor: "grey.border1", pb: 1, pt: 0.5 }}>
                                            {
                                                !isDesktop && item?.SCRATCHING != "Y" && item?.JOCKEYCOLORSLINK?.length > 0 && !item?.JOCKEYCOLORSLINK?.includes("/.png") &&
                                                <Grid item xs={2} md={1}>
                                                    <img style={{ width: 50 }}
                                                        src={`${process.env.cdn}/images/silks/${item?.JOCKEYCOLORSLINK}`} />
                                                </Grid>
                                            }
                                            {
                                                isDesktop &&
                                                <Grid item xs={2} md={1}>
                                                    {
                                                        item?.SCRATCHING != "Y" && item?.JOCKEYCOLORSLINK?.length > 0 && !item?.JOCKEYCOLORSLINK?.includes("/.png") &&
                                                        <img style={{ width: 50 }}
                                                            src={`${process.env.cdn}/images/silks/${item?.JOCKEYCOLORSLINK}`} />
                                                    }
                                                </Grid>
                                            }
                                            <Grid item xs={10} md={4} sx={{ fontSize: 14 }}>
                                                <b style={{ fontSize: 14 }}>
                                                    {item?.SELECTIONNUMBER}.&nbsp;{item?.FIELDNAME}
                                                </b>&nbsp;
                                                ({item?.BARRIER})&nbsp;{item?.WEIGHT}&nbsp;kg&nbsp;{item?.LASTTEN}
                                                <Typography component={"p"} fontSize={14}>
                                                    J:&nbsp;{item?.JOCKEY}&nbsp;{item?.TRAINER ? "T: " + item?.TRAINER : ""}&nbsp;
                                                    {item?.GEAR ? "G: " + item?.GEAR : ""}&nbsp;
                                                    {item?.SPEEDMAP ? "Speedmap: " + item?.SPEEDMAP : ""}&nbsp;
                                                </Typography>
                                            </Grid>
                                            {
                                                !isDesktop &&
                                                <Grid item xs={12} mb={1}>
                                                    <Divider />
                                                </Grid>
                                            }
                                            <Grid item xs={10} md={6}>
                                                <Typography component={"p"} fontSize={14}>
                                                    {item?.TIPCOMMENT || "No Comment"}
                                                </Typography>
                                            </Grid>
                                            <Grid container item xs={2} md={1} justifyContent="end" sx={{ pr: 1, fontWeight: "bold", fontSize: 14 }}>
                                                <NumberFormat
                                                    thousandSeparator={true}
                                                    value={item?.FIXEDODDS || '0'}
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    displayType="text"
                                                    prefix="$"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Box>
                )
            }
        </React.Fragment>

    }
    return (
        <React.Fragment>
            {
                (report?.qBestTips?.length > 0 || report?.qParlayTitle?.length > 0) &&
                <Box px={1}>
                    <Box sx={{
                        position: "relative",
                        bottom: { xs: 0, md: -50 }
                    }}>
                        {renderAvatar(140, 140)}
                        {renderTitle("Best Bets & Plays")}
                    </Box>
                    <Typography component="p" mt={2} align='center' fontSize={14}>
                        <strong>An outline of {report?.qUser?.[0]?.FIRSTNAME}&apos;s standout selections in the tipping package. </strong>
                    </Typography>
                    <Typography component="p" mt={2} align='center' fontSize={14}>
                        This may include his most confident tip (<strong>Best Bet</strong>), his best rated horse at long odds (<strong>Best Roughie</strong>), the horse he thinks is over the odds (<strong>Best Value</strong>), and the horse he thinks is under the odds (<strong>Lay of the Day</strong>).
                    </Typography>
                    {
                        report?.qBestTips?.length == 0 ?
                            <Typography component="p" mt={2}>
                                No Best Bets Available
                            </Typography> :
                            <React.Fragment>
                                {
                                    Object.keys(data).map((key, idx) =>
                                        <Box key={idx} my={8}>
                                            {renderRacemeet(key, data?.[key]?.[0]?.RACESTATE)}
                                            <Box mt={2}>
                                                {renderByHighlight(data?.[key])}
                                            </Box>

                                        </Box>
                                    )
                                }
                            </React.Fragment>
                    }
                </Box>
            }
        </React.Fragment>
    );
};

export default PremiumReportBestBets;
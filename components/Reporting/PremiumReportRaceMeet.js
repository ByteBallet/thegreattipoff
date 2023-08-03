import { groupByKey } from '@Components/utils/util';
import { Box, Stack, Typography, Grid, Divider } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

const PremiumReportRaceMeet = ({ report, renderTitle, renderAvatar, renderRacemeet, isDesktop }) => {
    let data = report?.qmeeting?.length > 0 ? groupByKey(report?.qmeeting, "RACEMEET") : {}
    const [hideImage, setHideImage] = useState(false);

    const renderStake = (stake) => {
        let stkLevel = report?.qStakeDetails?.filter((item) => stake >= item?.STAKEMIN && item?.STAKEMAX >= stake)
        return <Typography fontSize={14} fontWeight={"bold"}>
            {stkLevel?.[0]?.LABEL}
        </Typography>
    }

    const renderByRaceNum = (data) => {
        let grpByRacenum = data?.length > 0 ? groupByKey(data, "RACENUM") : {}
        return <React.Fragment>
            {
                Object.keys(grpByRacenum).map((key, idx) =>
                    <Box key={idx}>
                        <Typography component={"p"} color="balck.main" fontSize={20} mt={6} mb={2} >
                            <b>Race&nbsp;{key}</b>&nbsp;-&nbsp;{grpByRacenum?.[key]?.[0]?.EVENT}&nbsp;-&nbsp;{grpByRacenum?.[key]?.[0]?.RACESTATE}&nbsp;-&nbsp;<b>{grpByRacenum?.[key]?.[0]?.RACEDISTANCE}</b>
                        </Typography>
                        {
                            grpByRacenum?.[key]?.[0]?.RACECOMMENT &&
                            <Typography component={"p"} color="black.main" fontSize={13} mt={1} >
                                <b>Overview:</b>:&nbsp;&nbsp;{grpByRacenum?.[key]?.[0]?.RACECOMMENT}
                            </Typography>
                        }
                        {
                            grpByRacenum?.[key]?.[0]?.TEMPO &&
                            <Typography component={"p"} color="black.main" fontSize={13} mt={1} >
                                <b>Tempo</b>:&nbsp;&nbsp;{grpByRacenum?.[key]?.[0]?.TEMPO}
                            </Typography>
                        }
                        {
                            report?.client == "gto" && isDesktop &&
                            <Grid container spacing={0} sx={{ mt: 1, alignItems: "center", justifyContent: "center" }}>
                                <Grid item xs={1} md={2}></Grid>
                                <Grid item xs={10} md={3.5}></Grid>
                                <Grid item xs={10} md={4.2}></Grid>
                                <Grid item xs={6} md={"auto"} container justifyContent={"center"}>
                                    <Typography component={"p"} color="black.main" fontSize={13} align="center" mr={0.5}>
                                        Stake Level
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={"auto"} container justifyContent={"end"} >
                                    <Typography component={"p"} color="black.main" fontSize={13} align="right">
                                        Fixed Odds<sup>*</sup>
                                    </Typography>
                                </Grid>
                            </Grid>

                        }
                        {
                            grpByRacenum[key]?.map((item, idx) =>
                                <React.Fragment key={idx}>
                                    {
                                        item?.TIPRANK != 50 &&
                                        <Box sx={{ ml: 1, my: 0 }}>
                                            <Grid container columnSpacing={1} rowSpacing={0} sx={{ border: 1, borderColor: "grey.border1", pt: 1.5 }}>
                                                {
                                                    !isDesktop && item?.SCRATCHING != "Y" && item?.JOCKEYCOLORSLINK?.length > 0 && !item?.JOCKEYCOLORSLINK?.includes("/.png") &&
                                                    <Grid item xs={2} md={1}>
                                                        <img style={{ height: 50 }}
                                                            src={`${process.env.cdn}/images/silks/${item?.JOCKEYCOLORSLINK}`} />
                                                    </Grid>
                                                }
                                                {
                                                    isDesktop &&
                                                    <Grid item xs={1} md={1}>
                                                        {
                                                            item?.SCRATCHING != "Y" && item?.JOCKEYCOLORSLINK?.length > 0 && !item?.JOCKEYCOLORSLINK?.includes("/.png") &&
                                                            <img style={{ width: 50 }}
                                                                src={`${process.env.cdn}/images/silks/${item?.JOCKEYCOLORSLINK}`} />
                                                        }
                                                    </Grid>
                                                }
                                                <Grid item xs={10} md={3.5} sx={{ fontSize: 12, textDecoration: item?.SCRATCHING == "Y" ? "line-through" : null }}>
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
                                                <Grid item xs={12} md={5}>
                                                    <Typography component={"p"} fontSize={14}>
                                                        {item?.TIPCOMMENT || "No Comment"}
                                                    </Typography>
                                                </Grid>
                                                {
                                                    !isDesktop &&
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                }
                                                <Grid item xs={6} md={1.5} container justifyContent={"center"} flexDirection="column" alignItems={isDesktop ? "center" : "start"}
                                                    sx={{
                                                        borderRight: isDesktop ? 0 : 1,
                                                        borderColor: "grey.light",
                                                        pt: 1,
                                                        pb: 1.5
                                                    }}>
                                                    {
                                                        !isDesktop &&
                                                        <Typography component={"p"} color="black.main" fontSize={13} mb={1}>
                                                            Stake Level
                                                        </Typography>
                                                    }
                                                    {item?.STAKE ? renderStake(item?.STAKE) : null}
                                                </Grid>
                                                <Grid item xs={6} md={1} container justifyContent={isDesktop ? "center" : "start"} flexDirection="column" alignItems={"start"}
                                                    sx={{ fontSize: 14, pr: 1, fontWeight: "bold", pt: 1, pb: 1.5 }}>
                                                    {
                                                        !isDesktop &&
                                                        <Typography component={"p"} color="black.main" fontSize={13} mb={1}>
                                                            Fixed Odds<sup>*</sup>
                                                        </Typography>
                                                    }
                                                    {
                                                        item?.SCRATCHING == "Y" ? "SCR" :
                                                            <NumberFormat
                                                                thousandSeparator={true}
                                                                value={item?.FIXEDODDS || '0'}
                                                                decimalSeparator="."
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                displayType="text"
                                                                prefix="$"
                                                            />
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    }

                                    {renderNonRatedRunners(item?.RACEID, idx == 0)}
                                </React.Fragment>
                            )
                        }
                    </Box>
                )
            }
        </React.Fragment >
    }
    const renderNonRatedRunners = (raceid, firstRow) => {
        let nonRunners = report?.qTipData?.filter((item) => item?.TIPRANK == 50 && item?.RACEID == raceid)
        return <React.Fragment>
            {
                nonRunners?.length > 0 &&
                <React.Fragment>
                    {renderTitle("Non-Rated Runners")}
                    {
                        nonRunners?.map((item, idx) =>
                            <Box sx={{ ml: 1, my: 1 }} key={idx}>
                                <Grid container spacing={1} sx={{ border: 1, borderColor: "grey.border1" }}>
                                    {
                                        item?.SCRATCHING != "Y" && item?.JOCKEYCOLORSLINK?.length > 0 && !item?.JOCKEYCOLORSLINK?.includes("/.png") &&
                                        <Grid item xs={2}>
                                            <img style={{ width: 30 }}
                                                src={`${process.env.cdn}/images/silks/${item?.JOCKEYCOLORSLINK}`} />
                                        </Grid>
                                    }
                                    <Grid item xs={10} md={4} sx={{ fontSize: 12, textDecoration: item?.SCRATCHING == "Y" ? "line-through" : null }}>
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
                                    <Grid item xs={12} mb={1}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography component={"p"} fontSize={14}>
                                            {item?.TIPCOMMENT || "No Comment"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    }
                </React.Fragment>

            }
        </React.Fragment>
    }
    return (
        <React.Fragment>
            <Box px={1}>
                <Box sx={{
                    position: "relative",
                    bottom: { xs: 0, md: -50 }
                }}>
                    {renderAvatar(140, 140)}
                </Box>
                {
                    Object.keys(data).map((key, idx) =>
                        <Box key={idx} my={6}>
                            <Box sx={{
                                position: "relative",
                                bottom: { xs: 0, md: -55 }
                            }}>
                                {renderTitle(key)}
                            </Box>
                            <Stack direction="column" spacing={1} my={3}>
                                <Typography component={"p"} fontSize={14} align="center" fontWeight={"bold"}>
                                    {report?.qUser?.[0]?.FIRSTNAME}&apos;s&nbsp;{key} analysis is outlined below.
                                </Typography>
                                <Typography component={"p"} fontSize={14} align="center">
                                    The numbered list of runners in each race resembles {report?.qUser?.[0]?.FIRSTNAME}&apos;s top rated runners in the race from his analysis.
                                    {
                                        report?.client == "gto" &&
                                        <Typography component={"p"} fontSize={14} align="center">
                                            The <b>Stake Level</b> represents the suggested bets to place. Units are given as a guide.
                                        </Typography>
                                    }
                                </Typography>
                                {
                                    report?.client == "gto" &&
                                    <Typography component={"p"} fontSize={14} align="center" mt={8}>
                                        You can reduce or increase these units according to your own budget.
                                    </Typography>
                                }
                            </Stack>
                            {renderRacemeet(key, data?.[key]?.[0]?.RACESTATE)}
                            {
                                data?.[key]?.[0]?.MEETINGCOMMENT?.length > 0 &&
                                <Stack direction="column">
                                    <Typography component={"p"} fontSize={14} align="left">
                                        Meeting Overview
                                    </Typography>
                                    <Typography component={"p"} fontSize={14} align="left">
                                        {data?.[key]?.[0]?.MEETINGCOMMENT}
                                    </Typography>
                                </Stack>
                            }
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={6}>
                                    <Box my={0}>
                                        {
                                            data?.[key]?.[0]?.RAILPOSITION?.length > 0 &&
                                            <Stack direction="row">
                                                <Typography component={"p"} fontSize={14} align="left">
                                                    Rail Position:&nbsp;
                                                    <b>{data?.[key]?.[0]?.RAILPOSITION}</b>
                                                </Typography>
                                            </Stack>
                                        }
                                        {
                                            data?.[key]?.[0]?.CURRENTTRACK?.length > 0 &&
                                            <Stack direction="row">
                                                <Typography component={"p"} fontSize={14} align="left">
                                                    Current Track Condition:&nbsp;
                                                    <b>{data?.[key]?.[0]?.CURRENTTRACK}</b>
                                                </Typography>
                                            </Stack>
                                        }
                                        {
                                            data?.[key]?.[0]?.PREDICTEDTRACK?.length > 0 &&
                                            <Stack direction="row">
                                                <Typography component={"p"} fontSize={14} align="left">
                                                    Predicted Track Condition:&nbsp;
                                                    <b>{data?.[key]?.[0]?.PREDICTEDTRACK}</b>
                                                </Typography>
                                            </Stack>
                                        }
                                        {
                                            data?.[key]?.[0]?.TRACKCOMMENT?.length > 0 &&
                                            <Stack direction="column">
                                                <Typography component={"p"} fontSize={14} align="left">
                                                    Track Comment:&nbsp;
                                                </Typography>
                                                <Typography component={"p"} fontSize={14} align="left">
                                                    <b>{data?.[key]?.[0]?.TRACKCOMMENT}</b>
                                                </Typography>
                                            </Stack>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {
                                        !hideImage &&
                                        <Image
                                            layout='responsive'
                                            src={`${process.env.cdn}/images/racecontent/racetrack/${key?.replace(/ /g, '-')?.toLowerCase()}-track-map.jpg`}
                                            width={isDesktop ? 2 : 1}
                                            height={isDesktop ? 1.5 : 1}
                                            onError={() => {
                                                setHideImage(true);
                                            }}
                                            alt={`${key?.replace(/ /g, '-')?.toLowerCase()}`}
                                        />
                                    }
                                </Grid>
                            </Grid>
                            {renderRacemeet("Top Rated Runners")}
                            <Box mb={20}>
                                {
                                    renderByRaceNum(data?.[key])
                                }
                            </Box>
                        </Box>
                    )}
            </Box>
        </React.Fragment>
    );
};

export default PremiumReportRaceMeet;
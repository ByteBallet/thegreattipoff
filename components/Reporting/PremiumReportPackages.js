import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, IconButton, Link, Typography, Stack } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

const PremiumReportPackages = ({ report, renderAvatar, renderTitle, renderRacemeet }) => {
    let url = `${process.env.cdn}/usersite/${report?.qPackage?.[0]?.ALIAS}/datafile/${report?.qPackage?.[0]?.AUDIOFILE}`
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing])
    return (
        <React.Fragment>
            {
                (report?.qPackage?.[0]?.AUDIOFILE?.length > 0 || report?.qPackage?.[0]?.DATAFILE?.length > 0 ||
                    report?.qPackage?.[0]?.DATAFILE2?.length > 0) &&
                <Box px={1}>
                    <Box sx={{
                        position: "relative",
                        bottom: { xs: 0, md: -50 }
                    }}>
                        {renderAvatar(140, 140)}
                        {renderTitle("Premium Features")}
                    </Box>
                    <Typography component="p" mt={2} align='center' fontSize={14}>
                        <strong>Additional features included in {report?.qUser?.[0]?.FIRSTNAME}&apos;s Premium race day package. </strong>
                    </Typography>
                    <Typography component="p" mt={2} align='center' fontSize={14}>
                        These exclusive features are included enhance your race day experience and aim to give you an edge when it comes to finding a winner.
                    </Typography>
                    {
                        report?.qPackage?.[0]?.AUDIOFILE?.length > 0 &&
                        <React.Fragment>
                            {renderRacemeet("Audio Preview")}
                            <Stack direction="row" alignItems={"start"} justifyContent={"center"} my={4}>
                                <IconButton aria-label="delete" size="small" onClick={toggle}
                                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 1 / 3, p: 0 }}>
                                    <Avatar
                                        sx={{
                                            width: 50, height: 50,
                                            border: 2,
                                            borderColor: "#ec5555",
                                            bgcolor: "white.main",
                                            p: 0
                                        }}>
                                        <VolumeUpIcon fontSize="large" sx={{ color: "#ec5555" }} />
                                    </Avatar>
                                    <Typography fontSize={11} fontWeight={"bold"}><i>Listen</i></Typography>
                                </IconButton>
                                <Typography fontSize={14} align='left' sx={{ width: 2 / 3 }}>
                                    Click to listen to an exclusive race day preview from {report?.qUser?.[0].FIRSTNAME}.
                                </Typography>
                            </Stack>
                        </React.Fragment>
                    }
                    {
                        (report?.qPackage?.[0]?.DATAFILE?.length > 0 ||
                            report?.qPackage?.[0]?.DATAFILE2?.length > 0) &&
                        <React.Fragment>
                            {renderRacemeet("Speed Maps")}
                            {
                                report?.qPackage?.[0]?.DATAFILE?.length > 0 &&
                                <Stack direction="row" alignItems={"start"} justifyContent={"center"} my={4}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            flexDirection: "column",
                                            width: 1 / 3
                                        }}
                                    >
                                        <a
                                            href={`${process.env.cdn}/usersite/${report?.qPackage?.[0]?.ALIAS}/datafile/${report?.qPackage?.[0]?.DATAFILE}`}
                                            download
                                            rel="noreferrer"
                                            target="_blank"
                                            style={{
                                                textDecoration: "none"
                                            }}>
                                            <Avatar
                                                sx={{
                                                    width: 50, height: 50,
                                                    border: 2,
                                                    borderColor: "#e99523",
                                                    bgcolor: "white.main"
                                                }}>
                                                <DownloadOutlinedIcon fontSize="large" sx={{ color: "#e99523" }} />
                                            </Avatar>
                                            <Typography fontSize={11} fontWeight={"bold"}><i>Download</i></Typography>
                                        </a>
                                    </Box>
                                    <Typography component={"p"} fontSize={14} align='left' sx={{ width: 2 / 3 }}>
                                        Click on the download icon to access {report?.qUser?.[0]?.FIRSTNAME}&apos;s personalised speed maps.
                                        It gives you guidance on the predicted running position of each horse in each race, providing unrivalled
                                        insights that are sought after from industry experts around the country.
                                    </Typography>
                                </Stack>
                            }
                            {
                                report?.qPackage?.[0]?.DATAFILE2?.length > 0 &&
                                <Stack direction="row" alignItems={"start"} justifyContent={"center"} my={4}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            flexDirection: "column",
                                            width: 1 / 3
                                        }}
                                    >
                                        <a
                                            href={`${process.env.cdn}/usersite/${report?.qPackage?.[0]?.ALIAS}/datafile/${report?.qPackage?.[0]?.DATAFILE2}`}
                                            download
                                            rel="noreferrer"
                                            target="_blank">
                                            <Avatar
                                                sx={{
                                                    width: 50, height: 50,
                                                    border: 2,
                                                    borderColor: "#e99523",
                                                    bgcolor: "white.main"
                                                }}>
                                                <DownloadOutlinedIcon fontSize="large" sx={{ color: "#e99523" }} />
                                            </Avatar>
                                            <Typography fontSize={11} fontWeight={"bold"}><i>Download</i></Typography>
                                        </a>
                                    </Box>
                                    <Typography component={"p"} fontSize={14} align='left' sx={{ width: 2 / 3 }}>
                                        Click on the download icon to access {report?.qUser?.[0]?.FIRSTNAME}&apos;s analysis report.
                                    </Typography>
                                </Stack>
                            }
                        </React.Fragment>
                    }
                </Box>
            }
        </React.Fragment >
    );
};

export default PremiumReportPackages;
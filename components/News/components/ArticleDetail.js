/* eslint-disable @next/next/no-img-element */
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';

import CustomTitle from '@Components/Shared/CustomTitle';
import Image from 'next/image';

import moment from 'moment';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/Link';
import { getTagLink, getTipsterAlias } from '@Components/utils/util';
import FollowButton from '@Components/Tipster/FollowButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import RenderNewsDetail from './RenderNewsDetail';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import BoxDivider from '@Components/Shared/BoxDivider';
import AuthorGetTips from './AuthorGetTips';

function ArticleDetail({ data }) {
    const [tipsterResults, setResults] = useState("")
    const [openBetSlip, setopenBetSlip] = useState(false);
    const innerHTML = data?.[0]?.NEWSDETAIL

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const handleOnClickRevealBtn = () => {
        document.getElementById("hidecontent_a").classList.remove("hideme")
        document.getElementById("showcontentbutton_a").classList.remove("d-flex")
        document.getElementById("showcontentbutton_a").classList.add("hideme")
    }

    useEffect(() => {
        if (document.getElementById("showcontentbutton_a")) {
            document.getElementById("showcontentbutton_a").addEventListener("click", handleOnClickRevealBtn);
        }
        return () => {
            if (document.getElementById("showcontentbutton_a")) {
                document.getElementById("showcontentbutton_a").removeEventListener("click", handleOnClickRevealBtn);
            }
        }
    }, [data])

    useEffect(() => {
        if (document.getElementById("generateTipsterResults")) {
            setResults(document.getElementById("generateTipsterResults")?.dataset?.article)
        }
    }, [])


    const renderTags = (item, idx) => {
        let pageLink = getTagLink(item?.trim(), data?.[0]?.AUTHOR)
        return (pageLink?.length > 0 ? <Link href={pageLink} key={idx}>
            <Typography fontSize={"inherit"} color="primary.main" fontWeight={"bold"}
                sx={{ cursor: "pointer" }}>
                {item}{idx != data?.[0]?.TAGS.split(",")?.length - 1 && ", "}
            </Typography>
        </Link> :
            <Typography fontSize={"inherit"} color="grey.main" fontWeight={"bold"}>
                {item}{idx != data?.[0]?.TAGS.split(",")?.length - 1 && ", "}
            </Typography>)
    }

    return (
        <Card sx={{ p: 2 }}>
            <Box sx={{ mb: 1 }}>
                <Typography color="primary.main" fontSize={12} fontWeight="bold">
                    TOP STORY
                </Typography>
            </Box>
            <Box style={{ lineHeight: 1 }} sx={{ mb: 2 }}>
                <Typography fontSize={12} variant={'h1'}>
                    {data[0].NEWSTITLE}
                </Typography>

                <Box mt={2} sx={{}}>
                    {/* <Image
                                src={`https://thegreattipoff.com/assets/images/latestnews/feature/${data[0].IMAGEFILENAME}`}
                                height={50}
                                width={'100%'}
                                alt="J-image"
                            /> */}
                    <img
                        src={`${process.env.cdn}/images/latestnews/feature/${data[0].IMAGEFILENAME}`}
                        alt={process.env.client.sitelabel}
                        width={'100%'}
                    />
                </Box>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
                    <Typography
                        variant="h2"
                        gutterBottom
                        sx={{
                            lineHeight: 1.2, fontSize: 17, marginTop: '10px',
                            mb: 0,
                            color: "#414141",
                            fontWeight: 600
                        }}>
                        {data?.[0]?.NEWSHEADLINE}
                    </Typography>
                    {
                        data?.[0]?.PHOTOGRAPHER?.length > 0 &&
                        <Typography color="grey.main" fontSize={12} sx={{ display: "flex", alignItems: "center" }}>
                            <PhotoCameraIcon sx={{ fontSize: 15 }} />&nbsp;{data?.[0]?.PHOTOGRAPHER}
                        </Typography>
                    }
                </Stack>
                {data?.[0]?.TAGS &&
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ lineHeight: 1.2, fontSize: 12, mt: 0.5, marginBottom: '10px' }}>
                        Tagged:&nbsp;
                        {data?.[0]?.TAGS.split(",").map((item, idx) =>
                            renderTags(item, idx)
                        )}
                    </Typography>
                }
                <Grid container columnSpacing={1} alignItems={"center"} >
                    <Grid item xs={6}>
                        <BoxDivider />
                        <Stack direction="column" spacing={1} justifyContent="space-between" mt={0.5} alignItems={"start"}>
                            <Box>
                                <Typography color="grey.main" fontSize={12} fontWeight="bold">
                                    By{' '}
                                </Typography>
                                <Link href={`/tipster/${getTipsterAlias(data[0]?.AUTHOR)}`}>
                                    <Typography color="primary.main" fontSize={12} fontWeight="bold" sx={{ cursor: "pointer" }}>
                                        {data[0]?.AUTHOR}
                                    </Typography>
                                </Link>
                            </Box>
                            {
                                data[0]?.TWITTERID &&
                                <a href={`https://twitter.com/${data[0]?.TWITTERID}`} target="_blank" rel="noreferrer"
                                    style={{
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                    <TwitterIcon sx={{ color: "info.comment" }} />
                                    <Typography color="primary.main" fontWeight={"bold"} fontSize={13} sx={{ cursor: "pointer" }}>
                                        @{data[0]?.TWITTERID}
                                    </Typography>
                                </a>
                            }
                            <Stack direction="row" spacing={0.5} justifyContent="start">
                                <AccessTimeIcon fontSize="12" color="primary" />
                                <Typography fontSize={12} color="grey.dark">
                                    {moment(data[0].NEWSDATE).format('MMM DD, YYYY')}&nbsp;{moment(data[0].NEWSTIME).format('hh:mm A')}
                                </Typography>
                            </Stack>
                        </Stack>
                        <BoxDivider />
                    </Grid>
                    <Grid item xs={6}>
                        <AuthorGetTips tipsterid={data[0]?.AUTHORID} alias={data[0]?.AUTHOR} card={data[0]} handleBetSlip={handleBetSlip} isDesktop={false} />
                    </Grid>
                </Grid>
            </Box>
            <RenderNewsDetail innerHTML={innerHTML} tipsterDetails={tipsterResults ? tipsterResults?.split("_") : []} data={data} />
        </Card>
    );
}

export default ArticleDetail;

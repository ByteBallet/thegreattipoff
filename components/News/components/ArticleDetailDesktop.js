/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AuthorGetTips from './AuthorGetTips';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import BoxDivider from '@Components/Shared/BoxDivider';
import HorizontalCard from '../HorizontalCard';
import Link from 'next/Link';
import { getNewsTitle, getTagLink, getTipsterAlias } from '@Components/utils/util';
import { useRouter } from 'next/router';
import FollowButton from '@Components/Tipster/FollowButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import RenderNewsDetail from './RenderNewsDetail';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function ArticleDetailDesktop({ data, getMoreNews, news }) {
    const [tipsterResults, setResults] = useState("")
    const router = useRouter()
    const [openBetSlip, setopenBetSlip] = useState(false);
    const [mounted, setmounted] = useState(false)
    const innerHTML = data?.[0]?.NEWSDETAIL;

    const handleOnClickRevealBtn = () => {
        document.getElementById("hidecontent_a").classList.remove("hideme")
        document.getElementById("showcontentbutton_a").classList.remove("d-flex")
        document.getElementById("showcontentbutton_a").classList.add("hideme")
    }

    useEffect(() => {
        if (document.getElementById("showcontentbutton_a")) {
            document.getElementById("showcontentbutton_a").addEventListener("click", handleOnClickRevealBtn);
        }
        if (document.getElementById("generateTipsterResults")) {
            setResults(document.getElementById("generateTipsterResults")?.dataset?.article)
        }
        return () => {
            if (document.getElementById("showcontentbutton_a")) {
                document.getElementById("showcontentbutton_a").removeEventListener("click", handleOnClickRevealBtn);
            }
            setResults("")
        }
    }, [data])

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

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
        <React.Fragment>
            <Card sx={{ p: 2 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography color="primary.main" fontSize={15} fontWeight="bold">
                        TOP STORY
                    </Typography>
                </Box>
                <Grid container spacing={1.5} alignItems={"start"}>
                    <Grid item xs={12}>
                        <Typography fontSize={24} variant={'h1'}>
                            {data?.[0]?.NEWSTITLE}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Stack direction="column">
                            <Box >
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
                                        lineHeight: 1.2, fontSize: 17, marginTop: '10px', marginBottom: '10px',
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
                                    sx={{ lineHeight: 1.2, fontSize: 12, marginTop: '10px', marginBottom: '10px' }}>
                                    Tagged:&nbsp;
                                    {data?.[0]?.TAGS.split(",").map((item, idx) =>
                                        renderTags(item, idx)
                                    )}
                                </Typography>
                            }
                            <RenderNewsDetail innerHTML={innerHTML} tipsterDetails={tipsterResults ? tipsterResults?.split("_") : []} data={data} />
                        </Stack>
                    </Grid>
                    <Grid container item xs={4}>
                        <Grid item xs={3}>
                            <Avatar
                                sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: 'background.default',
                                }}
                                src={`${process.env.cdn}/images/avatar/${data[0]?.AVATARPATH}`}
                            >
                            </Avatar>
                        </Grid>
                        <Grid item xs={9} container alignItems={"center"}>
                            <Stack direction="column" spacing={0} justifyContent="space-between">
                                <Stack direction="row" spacing={0.5} justifyContent="start">
                                    <AccessTimeIcon fontSize="12" color="primary" />
                                    <Typography fontSize={12} color="grey.dark">
                                        {moment(data[0].NEWSDATE).format('MMM DD, YYYY')}&nbsp;{moment(data[0].NEWSTIME).format('hh:mm A')}
                                    </Typography>
                                </Stack>
                                <Box >
                                    <Typography color="grey.dark" fontSize={12}>
                                        by{' '}
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
                                            marginBottom: 5
                                        }}>
                                        <TwitterIcon sx={{ color: "info.comment" }} />
                                        <Typography color="grey.dark" fontSize={13} sx={{ cursor: "pointer" }}>
                                            @{data[0]?.TWITTERID}
                                        </Typography>
                                    </a>
                                }
                                <FollowButton
                                    format="btn"
                                    fullwidth={1}
                                    follow={data[0]?.FOLLOWING || 0}
                                    tipster={data[0]?.AUTHOR}
                                    tipsterid={data[0]?.AUTHORID}
                                    showIcon={true}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <AuthorGetTips tipsterid={data[0]?.AUTHORID} alias={data[0]?.AUTHOR} card={data[0]} handleBetSlip={handleBetSlip} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component={"p"} fontSize={16} fontWeight={"bold"} mt={3} mb={2}>
                                MORE NEWS
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} columnSpacing={1} rowSpacing={0}>
                            {
                                news?.slice(0, 5)?.map((item, idx) =>
                                    <React.Fragment key={idx}>
                                        <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`}>
                                            <Grid item xs={5} sx={{ cursor: "pointer" }}>
                                                <Avatar alt={item?.AUTHOR} src={`${process.env.cdn}/images/latestnews/thumbnail/t-${item?.IMAGEFILENAME}`} sx={{ width: 1, height: 90 }} variant="square">
                                                    <Avatar
                                                        src={`${process.env.gtoImgPath}/latestnews/feature/${item?.IMAGEFILENAME}`}
                                                        sx={{ width: '100%', height: '100%', cursor: "pointer" }}
                                                        variant="square"
                                                    />
                                                </Avatar>
                                            </Grid>
                                        </Link>
                                        <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`}>
                                            <Grid item xs={7} sx={{ cursor: "pointer" }}>
                                                <Typography variant="subtitle1" fontWeight="fontWeightBold" gutterBottom
                                                    sx={{ lineHeight: 1.2, fontSize: 14, cursor: "pointer" }} className="lineClamp3">
                                                    {item.NEWSTITLE}
                                                </Typography>
                                            </Grid>
                                        </Link>
                                        <Grid item xs={12}>
                                            <BoxDivider />
                                        </Grid>
                                    </React.Fragment>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </React.Fragment>
    );
}

export default ArticleDetailDesktop;

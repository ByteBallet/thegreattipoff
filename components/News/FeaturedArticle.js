import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { getNewsTitle } from '@Components/utils/util';
import Link from 'next/Link';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Image from 'next/image';

const FeaturedArticle = ({ isFeature = false, news }) => {
    return (
        <React.Fragment>
            {news?.length > 0 &&
                news?.map((article, idx) => (
                    <Card key={idx}>
                        <CardContent sx={{ px: 0 }}>
                            <Grid container spacing={0} sx={{ pb: 2 }}>
                                <Grid item xs={12} sx={{ px: 2 }}>
                                    <Typography color="primary.main" fontSize={14} fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                                        {isFeature ? 'Featured' : 'Top'}&nbsp;Story
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ px: 2 }}>
                                    <Link href={`/news/${getNewsTitle(article.NEWSTITLE)}`}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            gutterBottom
                                            sx={{ lineHeight: 1.2, cursor: "pointer" }}
                                            className="lineClamp"
                                        >
                                            {article.NEWSTITLE}
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sx={{ px: 2, pb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccessTimeIcon className="font10" color="primary" />
                                        <Typography variant="p" className="font10" color="grey.main" sx={{ ml: 0.3 }}>
                                            {moment(article.NEWSDATE).format('DD MMM YYYY')}, {moment(article.NEWSTIME).format('hh:mm A')}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5.5}>
                                    <Link href={`/news/${getNewsTitle(article.NEWSTITLE)}`} className="lineClamp">
                                        <Box className={'image-container'}>
                                            <Image
                                                layout="fill"
                                                src={`${process.env.cdn}/images/latestnews/thumbnail/t-${article.IMAGEFILENAME}`}
                                                alt={article.IMAGEFILENAME}
                                                className={'image'}
                                                priority={true}
                                            />
                                        </Box>
                                    </Link>
                                </Grid>
                                <Grid item xs={6.5} sx={{ px: 2 }}>
                                    <Typography fontSize={14} className="lineClamp4 newsDetail" sx={{ width: 1, lineHeight: 1.3 }}>
                                        {article.NEWSINTRO}
                                    </Typography>
                                    <Stack direction={"row"} justifyContent={article?.PHOTOGRAPHER?.length > 0 ? "space-between" : "end"}
                                        alignItems={"center"}
                                        spacing={1} mt={1}>
                                        {
                                            article?.PHOTOGRAPHER?.length > 0 &&
                                            <Typography color="grey.main" fontSize={12} sx={{ display: "flex", alignItems: "center", width: "45%" }} noWrap>
                                                <PhotoCameraIcon sx={{ fontSize: 15 }} />&nbsp;{article?.PHOTOGRAPHER}
                                            </Typography>
                                        }
                                        <Link href={`/news/${getNewsTitle(article.NEWSTITLE)}`} className="lineClamp">
                                            <Typography
                                                color="primary.main"
                                                fontSize={12}
                                                sx={{
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                }}
                                                noWrap
                                            >
                                                Read more <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                            </Typography>
                                        </Link>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
        </React.Fragment>
    );
};

export default FeaturedArticle;

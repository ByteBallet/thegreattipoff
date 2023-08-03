import React from 'react';
import Link from 'next/Link';
import { Card, CardContent, Typography, Grid, Box, Stack } from '@mui/material';
import Image from 'next/image';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { getNewsTitle } from '@Components/utils/util';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const FeaturedArticleDesktop = ({ isFeature = false, news }) => {
    return (
        <React.Fragment>
            {news.length > 0 &&
                news.map((article, idx) => (
                    <Card key={idx}>
                        <CardContent sx={{ px: 0 }}>
                            <Grid container >
                                <Grid item xs={6} sx={{ paddingRight: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                                    <Link
                                        href={`/news/${getNewsTitle(article?.NEWSTITLE)}`}
                                    >
                                        <Image src={`${process.env.gtoImgPath}/latestnews/feature/${article?.IMAGEFILENAME}`}
                                            width={"100%"}
                                            height={'68%'}
                                            layout="responsive"
                                            style={{
                                                cursor: "pointer"
                                            }}
                                            priority={true}
                                            alt={process.env.gtoImgPath}
                                        />
                                    </Link>
                                </Grid>
                                <Grid item xs={6} sx={{ pr: 2 }}>
                                    <Box mb={1}>
                                        <Typography color="primary.main" fontSize={14} fontWeight="bold" sx={{ textTransform: 'uppercase', marginBottom: '20px' }}>
                                            {isFeature ? 'Featured' : 'Top'}&nbsp;Story
                                        </Typography>
                                    </Box>
                                    <Link
                                        href={`/news/${getNewsTitle(article?.NEWSTITLE)}`}
                                    >
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
                                    <Typography
                                        variant="h2"
                                        gutterBottom
                                        sx={{
                                            lineHeight: 1.2, fontSize: 15.5, my: 2,
                                            fontWeight: 600,
                                            color: "#414141"
                                        }}
                                        className="lineClamp"
                                    >
                                        {article.NEWSHEADLINE}
                                    </Typography>
                                    <Typography fontSize={14} className="lineClamp6 newsDetail" sx={{ width: 1 }}>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: article?.NEWSINTRO + "...",
                                            }}
                                        />
                                    </Typography>
                                    <Stack direction={"row"} justifyContent={article?.PHOTOGRAPHER?.length > 0 ? "space-between" : "end"} spacing={1}>
                                        {
                                            article?.PHOTOGRAPHER?.length > 0 &&
                                            <Typography color="grey.main" fontSize={12} sx={{ display: "flex", alignItems: "center" }}>
                                                <PhotoCameraIcon sx={{ fontSize: 15 }} />&nbsp;{article?.PHOTOGRAPHER}
                                            </Typography>
                                        }

                                        <Link
                                            href={`/news/${getNewsTitle(article?.NEWSTITLE)}`}
                                        >
                                            <Typography
                                                color="primary.main"
                                                fontSize={12}
                                                sx={{
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'flex-end',
                                                    paddingTop: '15px',
                                                    paddingBottom: '15px'
                                                }}
                                            >
                                                Read more <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                            </Typography>
                                        </Link>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))
            }
        </React.Fragment >
    );
};

export default FeaturedArticleDesktop;

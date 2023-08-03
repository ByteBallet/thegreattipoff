import { Card, Stack, useMediaQuery } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import moment from 'moment';
import { Link } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { getNewsTitle } from '@Components/utils/util';
import React from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Image from 'next/image';

const HorizontalCard = (props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    let imgpath =
        props.category.indexOf('Featured') > -1 ? `feature/${props.article.IMAGEFILENAME}` : `thumbnail/t-${props.article.IMAGEFILENAME}`;
    imgpath = `${process.env.cdn}/images/latestnews/${imgpath}`;
    let alttext = props.article.IMAGEFILENAME.replace('t-', ' ');
    alttext = alttext.replace('-', ' ');
    alttext = alttext.replace('.png', ' ');
    alttext = alttext.replace('.jpg', ' ');
    let punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let news_title = props.article.NEWSTITLE.replace(punc_regex, '');
    news_title = news_title.replace(/ /g, '-');
    const category_link = props.article.CATEGORY ? `/topic/${props.article.CATEGORY.replace(/ /g, '-')}` : '';

    const router = useRouter();
    return (
        <Card>
            <CardContent
                sx={{ pr: 0, cursor: "pointer" }}
                onClick={() => {
                    router.push(`/news/${getNewsTitle(props?.article?.NEWSTITLE)}`);
                }}
            >
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={6} md={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Stack direction="column">
                            <Typography
                                gutterBottom
                                variant="subtitle2"
                                sx={{ color: 'primary.main', textTransform: 'uppercase', fontSize: 12 }}
                                underline="none"
                                fontWeight="fontWeightBold"
                                component={Link}
                                to={category_link}
                                noWrap
                            >
                                {props.article.CATEGORY}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="fontWeightBold" gutterBottom
                                sx={{ lineHeight: 1.2, fontSize: 14 }} className="lineClamp3">
                                {props.article.NEWSTITLE}
                            </Typography>
                            {
                                props?.showContent && isDesktop &&
                                <React.Fragment>
                                    <Typography fontSize={14} className="lineClamp3 newsDetail" sx={{ width: 1, lineHeight: 1.3, mt: 0.5 }}>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: props?.article?.NEWSINTRO + " ..."
                                            }}
                                        />
                                    </Typography>
                                    <Typography
                                        color="primary.main"
                                        fontSize={12}
                                        my={1}
                                        sx={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        Read more <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                    </Typography>
                                </React.Fragment>
                            }
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon className="font10" color="primary" />
                            <Typography variant="p" className="font10" color="grey.main" sx={{ ml: 0.3 }}>
                                {moment(props.article.NEWSDATE).format('DD MMM YYYY')}, {moment(props.article.NEWSTIME).format('hh:mm A')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{ width: 1, height: { xs: 110, md: 1 }, position: "relative" }} >
                            <Image
                                layout="fill"
                                alt={alttext}
                                src={imgpath}
                                style={{ width: '100%', height: '100%', position: "relative" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );
};

export default HorizontalCard;

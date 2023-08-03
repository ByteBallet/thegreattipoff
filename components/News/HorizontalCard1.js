import { Card, useMediaQuery } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import moment from 'moment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar, Box } from '@mui/material';
import { getNewsTitle } from '@Components/utils/util';
import Link from 'next/Link';

const HorizontalCard1 = (props) => {
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
    let news_date = moment(props.article.NEWSDATE);
    const news_link = `/news/${moment(props.article.NEWSDATE).format('MM')}/${moment(props.article.NEWSDATE).format('YYYY')}/${news_title}`;
    const category_link = props.article.CATEGORY ? `/topic/${props.article.CATEGORY.replace(/ /g, '-')}` : '';
    return (
        <Card>
            <CardContent sx={{ pr: 0 }}>
                <Link href={`/news/${getNewsTitle(props.article?.NEWSTITLE)}`}>
                    <Grid container spacing={1} sx={{ pb: 2, cursor: "pointer" }}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" component={"h3"} fontWeight="bold" gutterBottom sx={{ lineHeight: 1.2 }} className="lineClamp">
                                {props.article.NEWSTITLE}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon className="font10" color="primary" />
                                <Typography variant="p" className="font10" color="grey.main" sx={{ ml: 0.3 }}>
                                    {moment(props.article.NEWSDATE).format('DD MMM YYYY')}, {moment(props.article.NEWSTIME).format('hh:mm A')}
                                </Typography>
                            </Box>
                            <Typography className={"lineClamp4"} component="p" fontSize={14} sx={{ width: 1 }}>
                                {props.article?.NEWSINTRO}{isDesktop && "..."}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Avatar alt={alttext} src={imgpath} sx={{ width: 140, height: 110 }} variant="square">
                                <Avatar
                                    src={`${process.env.gtoImgPath}/latestnews/feature/${props?.article?.IMAGEFILENAME}`}
                                    sx={{ width: '100%', height: '100%' }}
                                    variant="square"
                                />
                            </Avatar>
                        </Grid>
                    </Grid>
                </Link>
            </CardContent>
        </Card>
    );
};

export default HorizontalCard1;

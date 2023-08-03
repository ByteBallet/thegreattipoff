import { Card, useMediaQuery } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import moment from 'moment';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/router';
import { getNewsTitle } from '@Components/utils/util';
import Image from 'next/image';

const VerticalCard = (props) => {
    const isFeatured = props.category.indexOf('Featured') > -1 ? true : false;
    let imgpath = isFeatured ? `feature/${props.article.IMAGEFILENAME}` : `thumbnail/t-${props.article.IMAGEFILENAME}`;
    imgpath = `${process.env.cdn}/images/latestnews/${imgpath}`;
    let alttext = props.article.IMAGEFILENAME.replace('t-', ' ');
    alttext = alttext.replace('-', ' ');
    alttext = alttext.replace('.png', ' ');
    alttext = alttext.replace('.jpg', ' ');
    let punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let html_regex = /<[^>]*>/g;
    let news_title = props.article.NEWSTITLE.replace(punc_regex, '');
    news_title = news_title.replace(/ /g, '-');
    //const category_link = `/topic/${props.article.CATEGORY.replace(/ /g, '-')}`;
    let news_detail = isFeatured ? props.article.NEWSDETAIL.replace(html_regex, '') : '';
    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width:900px)');
    return (
        <Card sx={{ maxHeight: isFeatured ? 'auto' : 400, cursor: "pointer" }}>
            <CardActionArea
                onClick={() => {
                    router.push(`/news/${getNewsTitle(props?.article?.NEWSTITLE)}`)
                }}
            >
                <Box sx={{ width: '100%', height: isFeatured ? '100%' : isDesktop ? 200 : 100, position: "relative" }}>
                    <Image
                        layout="fill"
                        src={`${process.env.gtoImgPath}/latestnews/feature/${props?.article?.IMAGEFILENAME}`}
                        alt={alttext}
                        className={'image'}
                        style={{ width: '100%', height: isFeatured ? '100%' : isDesktop ? 200 : 100, position: "relative" }}
                    />
                </Box>
                <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {!props?.isDesktop &&
                            <Typography
                                gutterBottom
                                variant="subtitle2"
                                sx={{ color: 'primary.main', textTransform: 'uppercase', fontSize: 12 }}
                                underline="none"
                                fontWeight="fontWeightBold"
                                noWrap
                            >
                                {props.article.CATEGORY}
                            </Typography>
                        }
                        {props.showContent && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon className="font9" color="primary" />
                                <Typography variant="p" className="font9" color="grey.main" sx={{ ml: 0.3 }}>
                                    {moment(props.article.NEWSDATE).format('DD MMM YYYY')},{' '}
                                    {moment(props.article.NEWSTIME).format('hh:mm A')}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Typography
                        variant={isFeatured ? 'h2' : 'subtitle1'}
                        fontWeight="fontWeightBold"
                        gutterBottom
                        sx={{ lineHeight: 1.3, fontSize: isFeatured ? "inherit" : props?.isDesktop ? 16 : 14, mt: 0.5 }}
                        className={props?.isDesktop ? "lineClamp" : "lineClamp3"}
                    >
                        {props.article.NEWSTITLE}
                    </Typography>
                    {props.showContent && <div dangerouslySetInnerHTML={{ __html: `<p>${news_detail.substring(0, 120) + '...'}</p>` }} />}
                    {!props.showContent && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }} mt={2}>
                            <AccessTimeIcon className="font9" color="primary" />
                            <Typography variant="p" className="font9" color="grey.main" sx={{ ml: 0.3 }}>
                                {moment(props.article.NEWSDATE).format('DD MMM YYYY')}, {moment(props.article.NEWSTIME).format('hh:mm A')}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default VerticalCard;

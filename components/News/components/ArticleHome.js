import { Avatar, Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { getNews, getNewsDetails } from '@services/Shared/newsService';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ArticleDetail from './ArticleDetail';
import ArticleDetailDesktop from './ArticleDetailDesktop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';
import BoxDivider from '@Components/Shared/BoxDivider';
import Link from 'next/Link';
import { getNewsTitle } from '@Components/utils/util';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserContext } from '@Context/User/UserProvider';

const ArticleHome = () => {
    const { user } = useContext(UserContext)
    const [data, setdata] = useState([])
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [news, setnews] = useState([]);
    const router = useRouter();

    const getMoreNews = async (pagestart = 0, reset = false) => {
        let body = {
            maxrecs: 10,
            pagestart: reset ? 0 : pagestart,
            userid: user?.userID
        };
        const response = await getNews(body);

        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            let filteredNews = response?.data?.news?.filter((item) => item?.NEWSID != data?.[0]?.NEWSID)
            reset ? setnews(filteredNews) : setnews([...news, ...filteredNews]);
        }
    };

    const getNewsItem = async () => {
        const resp = await getNewsDetails({ newsitem: router?.query?.nparams?.[0], userid: user?.userID });
        setdata(resp?.data)
    }

    useEffect(() => {
        getMoreNews(0, true);
    }, [data])

    useEffect(() => {
        getNewsItem()
        return () => {
            setnews([])
        }
    }, [router?.asPath]);

    return <Box container>
        {
            data?.length > 0 &&
            <React.Fragment>
                {
                    isDesktop ?
                        <React.Fragment>
                            <Box sx={{ bgcolor: "background.default" }}>
                                <ArticleDetailDesktop data={data} getMoreNews={getMoreNews} news={news} />
                                <Card sx={{ p: 2, my: 2 }}>
                                    <CardContent sx={{ p: 0 }}>
                                        <Grid container spacing={1.5}>
                                            <Grid item xs={12}>
                                                <Typography component={"p"} fontSize={16} fontWeight={"bold"} mb={1}>
                                                    MORE NEWS
                                                </Typography>
                                            </Grid>
                                            <Grid container item xs={12} rowSpacing={0} columnSpacing={1}>
                                                {
                                                    news?.slice(5)?.map((item, idx) =>
                                                        <React.Fragment key={idx}>
                                                            <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`}>
                                                                <Grid item xs={8.5}>
                                                                    <Typography
                                                                        gutterBottom
                                                                        variant="subtitle2"
                                                                        sx={{ color: 'primary.main', textTransform: 'uppercase', fontSize: 12, cursor: "pointer" }}
                                                                        underline="none"
                                                                        fontWeight="fontWeightBold"
                                                                        noWrap
                                                                    >
                                                                        {item?.CATEGORY}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="h2"
                                                                        fontWeight="fontWeightBold"
                                                                        gutterBottom
                                                                        sx={{ lineHeight: 1.2, fontSize: 18, cursor: "pointer" }}
                                                                        className="lineClamp3">
                                                                        {item?.NEWSTITLE}
                                                                    </Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <AccessTimeIcon color="primary" sx={{ fontSize: 12 }} />
                                                                        <Typography variant="p" color="grey.main" sx={{ ml: 0.3, fontSize: 12 }}>
                                                                            {moment(item?.NEWSDATE).format('DD MMM YYYY')}, {moment(item?.NEWSTIME).format('hh:mm A')}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Link>
                                                            <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`}>
                                                                <Grid item xs={3.5}>
                                                                    <Avatar
                                                                        alt={item?.AUTHOR}
                                                                        src={`${process.env.cdn}/images/latestnews/thumbnail/t-${item?.IMAGEFILENAME}`}
                                                                        sx={{ width: 1, height: 100, cursor: "pointer" }} variant="square">
                                                                        <Avatar
                                                                            src={`${process.env.gtoImgPath}/latestnews/feature/${item?.IMAGEFILENAME}`}
                                                                            sx={{ width: '100%', height: '100%' }}
                                                                            variant="square"
                                                                        />
                                                                    </Avatar>
                                                                </Grid>
                                                            </Link>
                                                            <Grid item xs={12}>
                                                                <BoxDivider />
                                                            </Grid>
                                                        </React.Fragment>
                                                    )}
                                            </Grid>
                                            <Grid item xs={12} container justifyContent={"center"}>
                                                <Button
                                                    variant="text"
                                                    endIcon={<ExpandMoreIcon />}
                                                    onClick={() => getMoreNews(news?.length)}
                                                    sx={{
                                                        color: "info.comment"
                                                    }}>
                                                    More News
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        </React.Fragment >
                        :
                        <ArticleDetail data={data} />
                }

            </React.Fragment>
        }
    </Box >;
};

export default ArticleHome;

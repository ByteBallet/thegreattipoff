import BoxDivider from '@Components/Shared/BoxDivider';
import { getNewsTitle } from '@Components/utils/util';
import { UserContext } from '@Context/User/UserProvider';
import { Grid, Avatar, Typography, CardContent, Card } from '@mui/material';
import { getNews } from '@services/Shared/newsService';
import Link from 'next/Link';
import React, { useState, useEffect, useContext } from 'react';

const RecentNews = ({ isHome = false }) => {
    const { user } = useContext(UserContext)
    const [news, setnews] = useState([]);
    const getMoreNews = async () => {
        let body = {
            maxrecs: 3,
            pagestart: isHome ? 4 : 0,
            userid: user?.userID
        };
        const response = await getNews(body);

        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            setnews([...response?.data?.news]);
        }
    };

    useEffect(() => {
        getMoreNews();
    }, []);

    return (
        <Card>
            <CardContent sx={{ px: 0 }}>
                <Grid container columnSpacing={1} rowSpacing={0} sx={{ pb: 2 }}>
                    {
                        news?.map((item, idx) =>
                            <React.Fragment key={idx}>
                                <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`}>
                                    <Grid item xs={5} sx={{ cursor: "pointer" }}>
                                        <Avatar alt={item?.AUTHOR} src={`${process.env.cdn}/images/latestnews/thumbnail/t-${item?.IMAGEFILENAME}`} sx={{ width: 1, height: 90 }} variant="square">
                                            <Avatar
                                                src={`${process.env.gtoImgPath}/latestnews/feature/${item?.IMAGEFILENAME}`}
                                                sx={{ width: '100%', height: '100%', cursor: "pointer" }}
                                                variant="square"
                                                alt={item?.IMAGEFILENAME}
                                            />
                                        </Avatar>
                                    </Grid>
                                </Link>
                                <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`}>
                                    <Grid item xs={7} sx={{ cursor: "pointer" }}>
                                        <Typography variant="subtitle1" fontWeight="fontWeightBold" gutterBottom
                                            sx={{ lineHeight: 1.2, fontSize: 14, cursor: "pointer" }} className="lineClamp4">
                                            {item.NEWSTITLE}
                                        </Typography>
                                    </Grid>
                                </Link>
                                {
                                    idx != news?.length - 1 &&
                                    <Grid item xs={12}>
                                        <BoxDivider />
                                    </Grid>
                                }
                            </React.Fragment>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>

    );
};

export default RecentNews;
import BoxDivider from '@Components/Shared/BoxDivider';
import React, { useEffect, useState } from 'react';
import MoreNews from './MoreNews';
import { Grid, useMediaQuery } from '@mui/material';
import { getNews } from '@services/Shared/newsService';
import HorizontalCard from './HorizontalCard';

const Group1FeatureNews = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [news, setNews] = useState([])

    const getRaceNews = async () => {
        let body = {
            maxrecs: 1,
            pagestart: 0,
            tagname: "Group 1 races",
        };
        const response = await getNews(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            setNews(response?.data?.news)
        }
    };

    useEffect(() => {
        getRaceNews()
    }, [])
    return (
        <React.Fragment>
            <BoxDivider />
            <Grid container spacing={2}>
                {
                    news && news.map((article, idx) =>
                        <React.Fragment key={idx}>
                            <Grid item xs={12} sx={{ height: 1 }}>
                                <HorizontalCard article={article} category="Latest News" showContent={isDesktop ? true : false} />
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Grid>
            <BoxDivider />
        </React.Fragment>
    );
};

export default Group1FeatureNews;
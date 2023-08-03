import React from 'react';
import Link from 'next/Link';
import dynamic from 'next/dynamic';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { toTitleCase } from '@utils/hotBetUtils';
import LazyLoad from 'react-lazy-load';

const NewsList = dynamic(() => import('@Components/News/NewsList'));

const RacingTipsters = ({ racetype, data, isResult = false }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    let tipsters = data?.tipster?.hotbet;
    let news = data?.news;
    let title = '';
    let period = data?.tipster?.periodcode
    let periodlabel = data?.tipster?.periodlabel
    if (period == 'TD') {
        title = title + ' ' + periodlabel?.toLowerCase();
    } else if (period == 'YD') {
        title = title + ' ' + periodlabel?.toLowerCase();
    } else {
        title = title + " " + periodlabel?.toLowerCase();
    }
    title = " & results for " + toTitleCase(title)

    const getPageLink = () => {
        let href = ""
        if (racetype == 'G') {
            href = "/greyhound-racing-"
        } else if (racetype == 'H') {
            href = "/harness-racing-"
        } else {
            href = "/horse-racing-"
        }
        return href + (isResult ? "results" : "tips")
    }
    return (
        <React.Fragment>
            <Link href={getPageLink()}>
                <Typography
                    component={"p"}
                    fontSize={14}
                    fontWeight={"regular"}
                    sx={{ mb: 1 }}>
                    <b style={{ cursor: "pointer" }}>
                        {racetype == 'G' ? 'Greyhound' : racetype == 'H' ? 'Harness' : 'Horse'}
                        &nbsp;Racing {!isResult && "Tips"}
                    </b>
                    {isResult ? <b> Results</b> : title}
                </Typography>
            </Link>
            <TrendingHotBets
                isCarousel={true}
                isDesktop={isDesktop}
                trendingHotBets={tipsters}
                isHomePage={true}
                getTipsterCarousel={() => { }}
            />
            <Box sx={{ mt: { xs: 1, md: 2 } }}>
                <ul style={{padding: 0}}>
                {news?.length > 0 && news?.map((article, idx) => (
                    <LazyLoad>
                        <NewsList article={article} lastRec={news?.length == idx + 1} key={idx} />
                    </LazyLoad>
                ))}
                </ul>
            </Box>
        </React.Fragment>
    );
};

export default RacingTipsters;

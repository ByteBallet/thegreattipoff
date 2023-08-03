import React, { useState, useEffect } from 'react';
import { getMarketNews, getNews } from '@services/Shared/newsService';
import { Box, Button, Card, CardContent, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getNewsParams, getNewsTitle } from '@Components/utils/util';
import NewsList from './NewsList';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerticalCard from './VerticalCard';
import HorizontalCard1 from './HorizontalCard1';
import { getTrackname } from '@Components/utils/RacingUtil';
import { toTitleCase } from '@utils/hotBetUtils';
import BoxDivider from '@Components/Shared/BoxDivider';

const LeaderboardNews = ({ raceType, isMarket, isTop = false, isTrack, pageTitle }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [news, setnews] = useState([]);
    const [loadmore, setloadmore] = useState(true);
    let { eventtype, category, tagname, subcategory } = getNewsParams(raceType, isTrack, pageTitle);
    let ishome = 0;

    const getLatestNews = async (reset = false) => {
        let body = {
            raceType,
            maxrecs: 5,
            pagestart: reset ? 0 : (news?.length > 0 ? news?.length : 0),
            track: isTrack ? getTrackname(pageTitle)?.replace(/ -/g, ' ') : null,
        };
        const response = await getMarketNews(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            reset ? setnews(response?.data?.news) : setnews([...news, ...response?.data?.news]);
            response?.data?.news?.length == 0 && setloadmore(false);
        }
    };

    useEffect(() => {
        getLatestNews(true);
    }, [raceType]);

    function getNTitle(title) {
        const punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        return title.replace(punc_regex, '');
    }
    return (
        <Box px={isTop ? 0 : 2}>
            {!isTop && <CustomGridTitle title={isTrack ? `${toTitleCase(getTrackname(pageTitle)?.replace(/-/g, ' '))} News` : "Latest News"} />}
            <Box mt={1}>
                {news.length > 0 &&
                    news.map((item, idx) =>
                        isTop ? (
                            <Link href={`/news/${getNewsTitle(item?.NEWSTITLE)}`} key={idx}>
                                <Card key={idx} sx={{ mx: 2, cursor: 'pointer' }}>
                                    <CardContent>
                                        <Stack direction="column" alignItems={'start'} sx={{ width: 1 }}>
                                            <Typography fontSize={14} noWrap fontWeight={'bold'} sx={{ width: 1 }}>
                                                {item?.NEWSTITLE}
                                            </Typography>
                                            <Typography component="p" fontSize={12} className="lineClamp" sx={{ width: 1, mt: 1 }}>
                                                {item?.NEWSINTRO}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            align="right"
                                            component="span"
                                            fontSize={12}
                                            color="info.comment"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: 1,
                                                justifyContent: 'end',
                                            }}
                                        >
                                            Read More
                                            <ChevronRightIcon sx={{ fontSize: 20 }} />
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        ) : (
                            <React.Fragment key={idx}>
                                {idx == 0 ? (
                                    <HorizontalCard1 article={item} category="Latest News" showContent={false} />
                                ) : (
                                    <NewsList article={item} lastRec={news?.length == idx + 1} showDetail={true} />
                                )}
                                {
                                    idx == 0 &&
                                    <React.Fragment>
                                        {isDesktop ? <BoxDivider /> : <Divider sx={{ mt: 2 }} />}
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )
                    )}
            </Box>
            {loadmore && news?.length >= 3 && !isTop && (
                <Button
                    variant="text"
                    onClick={() => getLatestNews()}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'black.main',
                        fontSize: 13,
                        width: '100%',
                    }}
                >
                    Load More <KeyboardArrowDownIcon fontSize="small" />
                </Button>
            )}
        </Box>
    );
};

export default LeaderboardNews;

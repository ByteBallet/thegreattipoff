import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DateTitle from '@modules/Transactions/Components/DateTitle';
import CircularLoader from '@Components/common/CircularLoader';

import { getOrgFeed } from '@services/RacingSites/racingSitesService';

import NewsFeedTile from './NewsFeedTile';
import TipTile from './TipTile';
import ResultTile from './ResultTile';
import WeeklySummaryTile from './WeeklySummaryTile';
import ResultSummaryTile from './ResultSummaryTile';
import ResultTipsterTile from './ResultTipsterTile';

const Feed = ({ siteId, siteName, handleChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [startrec, setstartrec] = useState(0);
    const [loadmore, setloadmore] = useState(true);
    const [totalrecs, setTotalRecs] = useState(0);
    const [feeds, setFeeds] = useState([]);
    const recCount = 10;

    const getFeeds = async () => {
        setIsLoading(true);
        try {
            const response = await getOrgFeed(siteId, startrec, recCount);
            if (response) {
                setFeeds(response?.feedobj);
                setstartrec(response?.startrec);
                setTotalRecs(response?.totalrecs);
                response?.feedobj?.length == 0 && setloadmore(false);
            }
        } catch (error) {
            //
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreFeed = async (index) => {
        try {
            const response = await getOrgFeed(siteId, index, recCount);
            if (response) {
                const count = feeds.length + response?.feedobj.length;
                setFeeds([...feeds, ...response?.feedobj]);
                setstartrec(response?.startrec);
                setTotalRecs(response?.totalrecs);
                if (count >= response?.totalrecs) {
                    setloadmore(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFeeds();
    }, [siteId]);

    const RenderTile = ({ feed }) => {
        switch (feed.posttypeid) {
            case 1:
                return (
                    <TipTile siteName={siteName} content={feed.content} postTypeLabel={feed.posttypelabel} handleChange={handleChange} />
                );
            case 2:
                return <></>;
            // return <ResultTile content={feed.content} postTypeLabel={feed.posttypelabel} />
            case 3:
                return <NewsFeedTile content={feed.content} postTypeLabel={feed.posttypelabel} siteName={siteName} />;
            case 4:
                return <WeeklySummaryTile content={feed.content} postTypeLabel={feed.posttypelabel} />;
            case 5:
                return <ResultSummaryTile content={feed.content} postTypeLabel={feed.posttypelabel} siteName={siteName} />;
            case 6:
                return <ResultTipsterTile content={feed.content} postTypeLabel={feed.posttypelabel} />;
            default:
                return null;
        }
    };

    function showLoadMore() {
        if (loadmore) {
            if (feeds.length <= totalrecs) return true;
        }

        return false;
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <CircularLoader />
            ) : (
                <Box sx={{ p: 2 }}>
                    {feeds?.length > 0 ? (
                        feeds.map((feed, idx) => (
                            <>
                                {feed.posttypeid && (
                                    <Box mt={1} key={idx}>
                                        <DateTitle date={feed?.posttime} />
                                        <Card key={idx} sx={{ width: 1 }}>
                                            <CardContent sx={{ p: 0, border: 0, borderColor: 'grey.joinBorder', borderRadius: 2 }}>
                                                <Grid container spacing={0}>
                                                    <RenderTile feed={feed} />
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )}
                            </>
                        ))
                    ) : (
                        <Typography fontSize={14} align="center">
                            No Records Found
                        </Typography>
                    )}
                </Box>
            )}
            {showLoadMore() && (
                <Box sx={{ backgroundColor: 'white.main' }}>
                    <Button
                        variant="text"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'primary.main',
                            fontSize: 13,
                            width: '100%',
                        }}
                        onClick={() => {
                            loadMoreFeed(startrec + recCount);
                        }}
                    >
                        Show More <KeyboardArrowDownIcon fontSize="small" />
                    </Button>
                </Box>
            )}
        </React.Fragment>
    );
};

export default Feed;

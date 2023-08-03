import React, { useContext, useEffect } from 'react';
import Tips from './Layouts/Tips';
import Results from './Layouts/Results';
import News from './Layouts/News';
import WpUpdates from './Layouts/WUpdates';

import ShowMore from './Components/ShowMore';
import useFeed from './Hooks/useFeed';
import { Box, CircularProgress, Typography } from '@mui/material';

import { groupByKey } from '@Components/utils/util';
import moment from 'moment';

import DateTitle from '@modules/Transactions/Components/DateTitle';
import NoFeed from './Components/NoFeed';

const Feed = (props) => {
    let userid = props?.tipster?.USERID;
    const { feed, loadMore } = useFeed(userid);

    const newFeedData = feed?.data?.map((item) => {
        return { ...item, postdate: moment(item.posttime).format('YYYY-MM-DD') };
    });
    const groupedData = newFeedData ? groupByKey(newFeedData, 'postdate') : null;

    useEffect(() => { }, [feed]);

    if (feed.pageNum == 0 && !feed?.data) {
        if (feed?.loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            );
        }
    }
    return (
        <div>
            {
                props?.tipster?.NTIPS == 0 && feed?.data?.length == 0 &&
                <NoFeed tipster={props?.tipster} isUser={props.isUser} />
            }
            <Box>
                {groupedData && Object.entries(groupedData).map(([key, feed]) => (
                    <>
                        <Box mx={2}>
                            <DateTitle showTime={false} date={key} />
                        </Box>
                        {feed.map((feedItem) => {
                            switch (feedItem.posttype) {
                                case 'results': {
                                    return (
                                        <>
                                            <Results item={feedItem} isUser={props.isUser} />
                                        </>
                                    );
                                }
                                case 'tips': {
                                    return <Tips item={feedItem} tipster={props.tipster} isUser={props.isUser} />;
                                }
                                case 'news': {
                                    return <News item={feedItem} isUser={props.isUser} />;
                                }
                                case 'wksummary': {
                                    return <WpUpdates item={feedItem} isUser={props.isUser} />;
                                }
                                default: {
                                    return <></>;
                                }
                            }
                        })}
                    </>
                ))}
            </Box>

            {feed.showLoadMore && <ShowMore onClick={loadMore} />}
            {/* <StaticContent />
            <StaticContent /> */}
        </div>
    );
};

export default Feed;

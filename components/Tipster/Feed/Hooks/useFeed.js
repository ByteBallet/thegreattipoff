import { useContext, useEffect, useState } from 'react';
import { FeedService } from '../feed.service';

import { UserContext } from '@Context/User/UserProvider';

const useFeed = (userid) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        loading: false,
        data: null,
        pageNum: 0,
        showLoadMore: false,
    });

    const loadMore = () => {
        apiGetData(data.pageNum + 1);
    };

    async function apiGetData(pageNum) {
        setData({
            ...data,
            loading: true,
        });
        const response = await FeedService.getFeed({
            userid: user?.userID,
            tipsterid: `${userid ?? user?.userID}`,
            startrec: pageNum,
            maxrec: 6,
        });
        if (!response.error) {
            let feed = pageNum > 0 ? [...data.data, ...response.data.feedobj] : response.data.feedobj;
            let showLoadMore = data?.data ? (response.data.totalrecs > data?.data.length ? true : false) : true;
            if (response?.data?.feedobj.length < 6) {
                showLoadMore = false;
            }
            setData({
                data: feed,
                loading: false,
                pageNum,
                showLoadMore,
            });
        }
    }

    useEffect(() => {
        apiGetData(0);
    }, []);

    return { feed: data, loadMore };
};

export default useFeed;

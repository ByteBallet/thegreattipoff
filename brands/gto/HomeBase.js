import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@mui/material';
import { getHomeAPI, getVideos } from '@services/Home/homeService';

const HomeDesktop = dynamic(() => import('./HomeDesktop'));
const HomeMobile = dynamic(() => import('./HomeMobile'));
const CircularLoader = dynamic(() => import('@Components/common/CircularLoader'));

const HomeBase = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [videos, setvideos] = useState([]);
    const [content, setcontent] = useState();
    const [loading, setloading] = useState(true);

    const getHomeData = async () => {
        const resp = (await getHomeAPI({})) || {};
        setcontent(resp?.data?.content);
        setloading(false);
    };

    const getVideo = async () => {
        let body = {
            nRecs: 3,
        };
        const resp = await getVideos(body);
        setvideos(resp?.data?.videoset);
    };

    useEffect(() => {
        getHomeData();
        getVideo();
    }, []);

    return (
        <>
            {loading && <CircularLoader />}
            {!loading && content && Object?.keys(content)?.length > 0 ? (
                isDesktop ? (
                    <HomeDesktop content={content} videos={videos} />
                ) : (
                    <HomeMobile content={content} videos={videos} />
                )
            ) : (
                <></>
            )}
        </>
    );
};

export default HomeBase;

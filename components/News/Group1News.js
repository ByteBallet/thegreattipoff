import BoxDivider from '@Components/Shared/BoxDivider';
import React, { useEffect, useState } from 'react';
import MoreNews from './MoreNews';
import { useMediaQuery } from '@mui/material';
import { getNews } from '@services/Shared/newsService';

const Group1News = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [data, setNews] = useState([])

    const getRaceNews = async () => {
        let body = {
            maxrecs: 5,
            pagestart: 2,
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
            {data?.length > 0 &&
                <MoreNews
                    data={data}
                    maxRecs={5}
                    showContent={isDesktop ? true : false}
                    frmRace={true}
                    tagname={"Group 1 races"}
                />}
        </React.Fragment>
    );
};

export default Group1News;
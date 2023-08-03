import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import { getNews } from '@services/Shared/newsService';
import HorizontalCard from '@Components/News/HorizontalCard';
import NewsList from '@Components/News/NewsList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { UserContext } from '@Context/User/UserProvider';

const News = ({ tipster, selectedType }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext)
    const [news, setnews] = useState([])
    const [totalRecs, settotalRecs] = useState(news?.length)
    const [loadmore, setloadmore] = useState(true)
    let dispname = (tipster.ROLES == "PROTIP" || tipster.MEDIA == "1") ? (tipster.FIRSTNAME + " " + tipster.SURNAME) : tipster.ALIAS
    let eventType = selectedType == "H" ? "Harness racing" : selectedType == "G" ? "Greyhound racing" : "Horse Racing"

    const getTipsterNews = async () => {
        let body = {
            userid: user?.userID,
            tipsterid: tipster?.USERID,
            tagname: tipster?.ALIAS?.replace(/ /g, "_"),
            ishome: 0,
            eventtype: eventType,
            maxrecs: 4,
            pagestart: news?.length,
            page: 'tipster',
        }
        const response = await getNews(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            response?.data?.news?.length == 0 && setloadmore(false)
            setnews([...news, ...response?.data?.news])
            settotalRecs(response?.data?.totalrecs)
        }
    }
    useEffect(() => {
        getTipsterNews()
    }, [])
    return (
        <React.Fragment>
            {
                news && news?.length > 0 &&
                <Box sx={{ px: 2, mt: 1, pb: 1 }}>
                    <CustomGridTitle title={`Latest ${dispname} News`} />
                    <Grid container spacing={1} sx={{ my: 1 }}>
                        {
                            news?.map((article, idx) =>
                                <Grid item xs={12} md={tipster ? 12 : 7} key={idx}>
                                    {idx == 0 ?
                                        <HorizontalCard article={article} category="Latest News" showContent={isDesktop ? true : false} />
                                        :
                                        <NewsList article={article} lastRec={news?.length == idx + 1} />
                                    }
                                </Grid>
                            )
                        }
                    </Grid>
                    {
                        loadmore && news?.length >= 3 && totalRecs > news?.length &&
                        <Button
                            variant="text"
                            onClick={getTipsterNews}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'black.main',
                                fontSize: 13,
                                width: "100%"
                            }}
                        >
                            Load More <KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                    }
                </Box>
            }
        </React.Fragment>
    )
};

export default News;
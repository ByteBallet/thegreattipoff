import React, { useState, useContext } from 'react';
import { getNews } from '@services/Shared/newsService';
import { Grid, Typography, Box, Button } from '@mui/material';
import HorizontalCard from './HorizontalCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { UserContext } from '@Context/User/UserProvider';

const MoreNews = ({ data, maxRecs = 4, showContent = false, fromDesktopHome = false, frmRace = false, tagname }) => {
    const { user } = useContext(UserContext)
    const [news, setnews] = useState(data)
    const [loadmore, setloadmore] = useState(true)
    const getMoreNews = async () => {
        let body = {
            maxrecs: maxRecs,
            pagestart: (news?.length > 0 ? (frmRace ? news?.length : news?.length + 6) : fromDesktopHome ? 4 : 6),
            userid: user?.userID,
            tagname: tagname
        }
        const response = await getNews(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            response?.data?.news?.length == 0 && setloadmore(false)
            setnews([...news, ...response?.data?.news])
            response?.data?.news?.length == 0 && setloadmore(false)
        }
    }
    return (
        <React.Fragment>
            {
                <Box>
                    {
                        !fromDesktopHome &&
                        <Typography fontSize={16} component="p" fontWeight="fontWeightBold" mb={2}>
                            More News
                        </Typography>
                    }
                    <Grid container spacing={2}>
                        {
                            news && news.map((article, idx) =>
                                <React.Fragment key={idx}>
                                    <Grid item xs={12} sx={{ height: 1 }}>
                                        <HorizontalCard article={article} category="Latest News" showContent={showContent} />
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                        <Grid item xs={12}>
                            {
                                (loadmore && (news?.length >= 3 || fromDesktopHome)) &&
                                <Button
                                    variant="text"
                                    onClick={getMoreNews}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        color: 'black.main',
                                        fontSize: 13,
                                        width: "100%"
                                    }}
                                >
                                    {showContent ? "Show More News" : "Load More"} <KeyboardArrowDownIcon fontSize="small" />
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Box>
            }
        </React.Fragment>
    );
};

export default MoreNews;
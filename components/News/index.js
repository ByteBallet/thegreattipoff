import React, { useState, useEffect, useContext } from 'react';
import { getNews } from '@services/Shared/newsService';
import { Grid, Box, Button } from '@mui/material';

import CustomTitle from '@Components/Shared/CustomTitle';

import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useRouter } from 'next/router';
import HorizontalCard from './HorizontalCard';
import { UserContext } from '@Context/User/UserProvider';

const getNextPage = (currentPage, isNextPage) => {
    let nextPage = 1;
    if (currentPage) {
        nextPage = Number(currentPage) + 1;
    }
    if (isNextPage) {
        return `/news/pages/${nextPage}`;
    }
};

const getPreviousPage = (currentPage) => {
    if (!currentPage) {
        return '/news';
    } else {
        let previousPage = Number(currentPage) - 1;
        if (previousPage === 1) return '/news';
        return `/news/pages/${previousPage}`;
    }
};

const News = (props) => {
    const { user } = useContext(UserContext)
    const router = useRouter();
    let currentPage = 1;
    if (Array.isArray(props.page) && props.page.length > 0) {
        if (!isNaN(props.page[0])) currentPage = Number(props?.page[0]);
    }

    const [news, setnews] = useState([]);
    const [loadmore, setloadmore] = useState(true);
    const [totalRecs, setTotalRecs] = useState();

    const getMoreNews = async () => {
        let body = {
            maxrecs: 10,
            pagenumber: currentPage,
            userid: user?.userID
        };
        const response = await getNews(body);

        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            // response?.data?.news?.length == 0 && setloadmore(false);
            setnews([...response?.data?.news]);
            // response?.data?.news?.length == 0 && setloadmore(false);
            if (!isNaN(Number(response?.data?.totalrecs))) {
                let tRec = Number(response?.data?.totalrecs) / 10;
                setTotalRecs(Math.ceil(tRec));
            }
        }
    };

    useEffect(() => {
        getMoreNews();
    }, [router]);

    const showNextPage = currentPage <= totalRecs ? true : false;

    const showOldEntries = () => {
        if (!currentPage) return false;
        let cPage = Number(currentPage);
        if (isNaN(cPage)) {
            return false;
        }

        if (cPage === 1 || cPage === 0) {
            return false;
        }
        return true;
    };

    function previousPage() {
        const previousPage = getPreviousPage(currentPage);
        router.push(previousPage);
    }

    function nextPage() {
        const nextPageUrl = getNextPage(currentPage, true); // true to be changed to what the check if next page is available
        router.push(nextPageUrl);
    }

    return (
        <React.Fragment>
            {
                <>
                    <CustomTitle title="News" />
                    <Box sx={{ mx: 1, mt: 2 }}>
                        <Grid container spacing={2} sx={{}}>
                            {news.map((article, idx) => (
                                <React.Fragment key={idx}>
                                    <Grid item xs={12} sx={{ height: 1 }}>
                                        <HorizontalCard article={article} category="Latest News" showContent={true} />
                                    </Grid>
                                </React.Fragment>
                            ))}
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: showOldEntries() ? 'space-between' : 'flex-end',
                                        alignItems: 'center',
                                    }}
                                >
                                    {showOldEntries() && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <WestIcon color="success" fontSize="12" />
                                            <Button
                                                variant="text"
                                                sx={{ color: 'success.main', fontWeight: 'bold' }}
                                                onClick={previousPage}
                                            >
                                                Newer Entries
                                            </Button>
                                        </Box>
                                    )}
                                    {showNextPage && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Button variant="text" sx={{ color: 'success.main', fontWeight: 'bold' }} onClick={nextPage}>
                                                Older Entries
                                            </Button>
                                            <EastIcon color="success" fontSize="12" />
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            }
        </React.Fragment>
    );
};

export default News;

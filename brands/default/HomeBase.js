import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Typography, Box, useMediaQuery, Stack } from '@mui/material';

import TipsterCarousel from '@Components/Home/TipsterCarousel';
import FeaturedArticle from '@Components/News/FeaturedArticle';
import BoxDivider from '@Components/Shared/BoxDivider';
import TrackExperts from '@Components/Home/TrackExperts';
import TopNews from '@Components/News/TopNews';
import RacingTipsters from '@Components/Home/RacingTipsters';
import Products from '@Components/Home/Products';
import { MAIN_CATEGORIES } from '@lib/constants';
import { getAllRaces } from '@lib/fetcher';
import NextItemList from '@Components/BetHome/NextItemList';
import { UserContext } from '@Context/User/UserProvider';
import Videos from '@Components/Home/Videos';
import MoreNews from '@Components/News/MoreNews';
import FeaturedArticleDesktop from '@Components/News/FeaturedArticleDesktop';
import TopNewsDesktop from '@Components/News/TopNewsDesktop';

const HomeBase = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    let raceTypes = ['R', 'G', 'H'];
    const [data, setData] = useState();

    const reloadData = useCallback(async () => {
        const data2 = (await getAllRaces(user.promo, 'R')) || {};
        setData(data2?.all);
    }, []);

    useEffect(() => {
        reloadData();
    }, []);


    const HomeMobile = () => {
        return (<>
            <Box
                sx={{
                    height: 'inherit',
                    overflowY: 'auto',
                    p: 2,
                }}
            >
                <Typography component="h1" fontSize={16} fontWeight="bold">
                    Horse Racing Tips
                </Typography>
                <TipsterCarousel isMedia={true} />
                <TipsterCarousel isPro={true} />
                <FeaturedArticle isFeature={true} />
                <BoxDivider />
                <TrackExperts />

                <TopNews />
                <BoxDivider />
                {raceTypes?.map((rtype, idx) => (
                    <RacingTipsters key={idx} racetype={rtype} />
                ))}
                <Products title="Tipping" showText={true} />
                <BoxDivider />
                <NextItemList
                    active={MAIN_CATEGORIES.racings}
                    hotevents={data}
                    reloadData={reloadData}
                    hideTabs={true}
                />
                <Videos />
                <BoxDivider />
                <Products title="Betting Tools" showText={false} />
                <BoxDivider />
                <MoreNews />
            </Box>

        </>)
    }

    const HomeDesktop = () => {
        return (<>
            <Box
                sx={{
                    height: 'inherit',
                    overflowY: 'auto',
                    p: 2,
                }}
            >
                <Typography component="h1" fontSize={16} fontWeight="bold" pb={1}>
                    Horse Racing Tips
                </Typography>
                <TipsterCarousel isMedia={true} />
                <TipsterCarousel isPro={true} />
                <FeaturedArticleDesktop isFeature={true} />
                <TopNewsDesktop />
                <BoxDivider />
                <TrackExperts />
                <Stack sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Box sx={{ backgroundColor: '#fff', height: '100%', width: '50%', margin: '1px', marginRight: 1 }}>
                        <Products title="Tipping" showText={true} isDesktop />
                    </Box>
                    <Box sx={{ backgroundColor: '#fff', height: '100%', width: '50%', margin: '1px', marginLeft: 1 }}>
                        <Products title="Betting Tools" showText={false} />
                    </Box>
                </Stack>
                {raceTypes?.map((rtype, idx) => (
                    <RacingTipsters key={idx} racetype={rtype} />
                ))}

            </Box>

        </>)
    }
    return (
        <>
            {isDesktop ? <HomeDesktop /> : <HomeMobile />}
        </>
    );
};

export default HomeBase;

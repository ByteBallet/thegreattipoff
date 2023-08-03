import React from 'react';
import { Box, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazy-load';

const HomeBanner = dynamic(() => import('./HomeBanner'));
const Products = dynamic(() => import('@Components/Home/Products'));
const MoreNews = dynamic(() => import('@Components/News/MoreNews'));
const BoxDivider = dynamic(() => import('@Components/Shared/BoxDivider'));
const TopNewsDesktop = dynamic(() => import('@Components/News/TopNewsDesktop'));
const RacingTipsters = dynamic(() => import('@Components/Home/RacingTipsters'));
const TipsterCarousel = dynamic(() => import('@Components/Home/TipsterCarousel'));
const FeaturedArticleDesktop = dynamic(() => import('@Components/News/FeaturedArticleDesktop'));

const HomeDesktop = ({ content }) => {
    return (
        <Box
            sx={{
                height: 'inherit',
                overflowY: 'auto',
                pb: 2,
            }}
        >
            <HomeBanner />
            <LazyLoad>
            <Box sx={{ px: 2 }}>
                <LazyLoad>
                    <TipsterCarousel isPro={true} data={content?.punter?.R} />
                </LazyLoad>
                <BoxDivider />
                <FeaturedArticleDesktop isFeature={true} news={content?.news?.news?.slice(0, 1)} />
                <TopNewsDesktop data={content?.news?.news?.slice(1, 4)} />
                <BoxDivider />
                {content?.racetype?.map(
                    (item, idx) =>
                        Object?.keys(item)?.[0] !== 'R' && (
                            <Box key={idx} pt={idx != 0 ? 0.5 : 0}>
                                <LazyLoad>
                                    <RacingTipsters key={idx} data={Object?.values(item)?.[0]} racetype={Object?.keys(item)?.[0]} />
                                </LazyLoad>
                                <BoxDivider mt={2.5} />
                            </Box>
                        )
                )}
                {/* BETTINGS NEWS */}
                <TopNewsDesktop data={content?.betting?.news} isBetting={true} />
                <BoxDivider />
                {content?.racetype?.map(
                    (item, idx) =>
                        Object?.keys(item)?.[0] == 'R' && (
                            <Box key={idx} pt={0}>
                                <LazyLoad>
                                    <RacingTipsters
                                        key={idx}
                                        data={Object?.values(item)?.[0]}
                                        racetype={Object?.keys(item)?.[0]}
                                        isResult={true}
                                    />
                                </LazyLoad>
                            </Box>
                        )
                )}  
                <BoxDivider />
                <Stack sx={{ flexDirection: 'row', justifyContent: 'center', pb: 0.5 }}>
                    <Box sx={{ backgroundColor: '#fff', height: '100%', width: '50%', margin: '1px', marginRight: 1 }}>
                        <LazyLoad >
                            <Products title="Tipping" showText={true} isDesktop />
                        </LazyLoad>
                    </Box>
                    <Box sx={{ backgroundColor: '#fff', height: '100%', width: '50%', margin: '1px', marginLeft: 1 }}>
                        <LazyLoad >
                            <Products title="Betting Tools" showText={false} isDesktop isBetting={true} />
                        </LazyLoad>
                    </Box>
                </Stack>
                <BoxDivider />
                <LazyLoad>
                   <MoreNews data={content?.news?.news?.slice(7)} maxRecs={5} showContent={true} />
                </LazyLoad>
            </Box>
            </LazyLoad>
        </Box>
    );
};

export default HomeDesktop;

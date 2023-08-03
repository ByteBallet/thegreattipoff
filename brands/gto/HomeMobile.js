import React from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazy-load';

const HomeBanner = dynamic(() => import('./HomeBanner'));
const TipsterCarousel = dynamic(() => import('@Components/Home/TipsterCarousel'));
const FeaturedArticle = dynamic(() => import('@Components/News/FeaturedArticle'));
const BoxDivider = dynamic(() => import('@Components/Shared/BoxDivider'));
const TopNews = dynamic(() => import('@Components/News/TopNews'));
const RacingTipsters = dynamic(() => import('@Components/Home/RacingTipsters'));
const Products = dynamic(() => import('@Components/Home/Products'));
const Videos = dynamic(() => import('@Components/Home/Videos'));
const MoreNews = dynamic(() => import('@Components/News/MoreNews'));
const HomeNextToJump = dynamic(() => import('@Components/Home/HomeNextToJump'));

const HomeMobile = ({ content, videos }) => {
    return (
        <Box
            sx={{
                height: 'inherit',
                overflowY: 'auto',
                pb: 2,
            }}
        >
            <LazyLoad>
                <HomeBanner />
            </LazyLoad>
            <Box sx={{ px: 2 }}>
                <LazyLoad>
                    <TipsterCarousel isPro={true} data={content?.punter?.R} />
                </LazyLoad>
                <BoxDivider />
                <LazyLoad>
                    <FeaturedArticle isFeature={true} news={content?.news?.news?.slice(0, 1)} />
                </LazyLoad>
                <LazyLoad>
                    <TopNews data={content?.news?.news?.slice(1, 4)} />
                </LazyLoad>
                <BoxDivider />
                {content?.racetype?.map((item, idx) => (
                    Object?.keys(item)?.[0] !== "R" && <Box pt={idx != 0 ? 2 : 0} key={idx}>
                        <LazyLoad>
                            <RacingTipsters data={Object?.values(item)?.[0]} racetype={Object?.keys(item)?.[0]} />
                        </LazyLoad>
                    </Box>
                ))}
                {/* BETTINGS NEWS */}
                <LazyLoad>
                    <TopNews data={content?.betting?.news} isBetting={true} />
                </LazyLoad>
                <BoxDivider />
                {content?.racetype?.map((item, idx) => (
                    Object?.keys(item)?.[0] == "R" && <Box pt={0} key={idx}>
                        <LazyLoad>
                            <RacingTipsters data={Object?.values(item)?.[0]} racetype={Object?.keys(item)?.[0]} isResult={true} />
                        </LazyLoad>
                    </Box>
                ))}
                <LazyLoad>
                    <Products title="Tipping" showText={true} />
                </LazyLoad>
                <BoxDivider />
                <LazyLoad>
                    <HomeNextToJump />
                </LazyLoad>
                <LazyLoad>
                    <Videos videos={videos} />
                </LazyLoad>
                <BoxDivider />
                <LazyLoad>
                    <Products title="Betting Tools" showText={false} />
                </LazyLoad>
                <BoxDivider />
                <LazyLoad>
                    <MoreNews data={content?.news?.news?.slice(4)} />
                </LazyLoad>
            </Box>
        </Box>
    );
};

export default HomeMobile;

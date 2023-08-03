import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { getSportHighlights } from '@lib/fetcher';
import FeaturedSports from '@modules/Sports/Desktop/FeaturedSports';
import FutureSports from '@modules/Sports/Desktop/FutureSports';
import BoxDivider from '@Components/Shared/BoxDivider';

const initHighlights = {
    trending: [],
    featured: [],
    futures: []
};

const SportsFeaturesMobile = () => {
    const [highlights, sethighlights] = useState(initHighlights);
    useEffect(() => {
        const getHighlights = async () => {
            const resp = (await getSportHighlights()) || {};
            sethighlights({
                trending: resp.hotevents || [],
                featured: resp.featured || [],
                futures: resp.futures || [],
            });
        }
        getHighlights()
    }, [])
    return (
        <Box sx={{ mx: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography
                    variant="h2"
                    component="p"
                    fontWeight="fontWeightBold"
                    sx={{ fontSize: 16 }}
                >
                    Featured Events
                </Typography>
            </Stack>
            {
                highlights.featured &&
                highlights.featured.length > 0 &&
                <FeaturedSports sports={highlights.featured} isDesktop={false} />
            }
            <BoxDivider />
        </Box>
    );
};

export default SportsFeaturesMobile;
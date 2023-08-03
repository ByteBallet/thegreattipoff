import React, { useState } from 'react';
import Link from 'next/Link';
import LazyLoad from 'react-lazy-load';
import dynamic from 'next/dynamic';
import { Grid, Typography } from '@mui/material';

const VerticalCard = dynamic(() => import('./VerticalCard'));

const TopNewsDesktop = ({ data, isBetting = false }) => {
    const [news] = useState(data);

    return (
        <React.Fragment>
            <Grid container sx={{ backgroundColor: '#fff', padding: 1, borderRadius: 2, marginTop: 2 }}>
                {
                    news?.length > 0 &&
                    <Grid item xs={12}>
                        {
                            isBetting ? <Typography color="primary.main" fontSize={14} fontWeight="bold" sx={{ textTransform: 'uppercase', marginBottom: '20px', pl: 2 }}>
                                {"Betting"}
                            </Typography> :
                                <Link href="/news">
                                    <Typography color="primary.main" fontSize={14} fontWeight="bold" sx={{ textTransform: 'uppercase', marginBottom: '20px', pl: 2, cursor: "pointer" }}>
                                        {"RACING NEWS"}
                                    </Typography>
                                </Link>
                        }

                    </Grid>
                }
                {
                    news && news.map((article, idx) =>
                        <React.Fragment key={idx}>
                            <Grid item xs={4} sx={{ height: 1, padding: 1 }}>
                                <LazyLoad>
                                    <VerticalCard article={article} category="Latest News" index={idx} isDesktop={true} />
                                </LazyLoad>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Grid>
        </React.Fragment>
    );
};

export default TopNewsDesktop;
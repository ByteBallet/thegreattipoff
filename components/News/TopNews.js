import React from 'react';
import BoxDivider from '@Components/Shared/BoxDivider';
import HorizontalCard from './HorizontalCard';
import VerticalCard from './VerticalCard';
import { Grid, Typography } from '@mui/material';

const TopNews = ({ data, isBetting = false }) => {
    return (
        <React.Fragment>
            {
                !isBetting && <BoxDivider />}
            {
                isBetting &&
                <Typography fontSize={16} component="p" fontWeight="fontWeightBold" my={2}>
                    Betting
                </Typography>
            }
            <Grid container spacing={2}>
                {
                    data && data.map((article, idx) =>
                        <React.Fragment key={idx}>
                            <Grid item xs={idx < 2 ? 6 : 12} sx={{ height: 1 }}>
                                {
                                    idx < 2 ?
                                        <VerticalCard article={article} category="Latest News" showContent={false} />
                                        :
                                        <HorizontalCard article={article} category="Latest News" showContent={false} />

                                }
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Grid>
        </React.Fragment>
    );
};

export default TopNews;
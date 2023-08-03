import BottomBar from '@modules/Transactions/Components/BottomBar';
import { Card, CardContent, Grid } from '@mui/material';
import React, { useState } from 'react';
import ExpandedSubscriptionsView from './ExpandedSubscriptionsView';
import SubscriptionsGrid from './SubscriptionsGrid';

const SubscriptionsCard = ({ card }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card
            sx={{
                color: 'background.legs',
                bgcolor: 'white.main',
                mb: 2,
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Grid container spacing={0} sx={{ px: 1, pt: 1 }}>
                    <Grid item xs={12}>
                        <SubscriptionsGrid item={card} />
                    </Grid>
                </Grid>
                <ExpandedSubscriptionsView
                    item={card}
                    expanded={expanded}
                />
                <BottomBar
                    expanded={expanded}
                    handleExpandClick={handleExpandClick}
                />
            </CardContent>
        </Card>
    );
};

export default SubscriptionsCard;
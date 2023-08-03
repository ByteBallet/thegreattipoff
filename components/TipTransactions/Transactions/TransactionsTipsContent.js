import React, { useState } from 'react';
import BottomBar from '@modules/Transactions/Components/BottomBar';
import { Card, CardContent, Grid } from '@mui/material';
import ExpandedTransactionsView from './ExpandedTransactionsView';
import TransactionsTipsGrid from './TransactionsTipsGrid';

const TransactionsTipsContent = ({ card }) => {
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
                <Grid container spacing={1} sx={{ px: 2, pt: 2 }}>
                    <Grid item xs={12}>
                        <TransactionsTipsGrid item={card} />
                    </Grid>
                </Grid>
                <ExpandedTransactionsView
                    item={card}
                    expanded={expanded}
                />
                <BottomBar
                    expanded={expanded}
                    handleExpandClick={handleExpandClick}
                    type="banking"
                />
            </CardContent>
        </Card>
    );
};

export default TransactionsTipsContent;
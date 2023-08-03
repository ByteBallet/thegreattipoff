import React, { useState } from 'react';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import BottomBar from '@modules/Transactions/Components/BottomBar';
import ExpandedSalesView from './ExpandedSalesView';
import NumberFormat from 'react-number-format';

const SalesGrid = ({ data }) => {
    const [expanded, setExpanded] = useState([]);
    const handleExpandClick = (value) => {
        let chk = expanded.filter((item) => item === value);
        if (chk.length > 0) {
            setExpanded(expanded.filter((item) => item !== value));
        } else {
            setExpanded([...expanded, value]);
        }
    };
    const renderRows = (item, i) => {
        return (
            <Box key={i}>
                <Card
                    sx={{
                        color: 'background.legs',
                        bgcolor: 'white.main',
                        mb: 2,
                    }}
                >
                    <CardContent sx={{ p: 0 }}>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                px: 2,
                                pt: 2,
                                pb: 1,
                            }}
                        >
                            <Grid container item xs={6} justifyContent="start" alignItems={'start'} flexDirection="column">
                                <Typography fontSize={14} fontWeight="bold">
                                    {item?.TITLE}
                                </Typography>
                                <Typography fontSize={12}>Status:&nbsp;{item?.CLOSED == 99 ? 'Paid' : 'Unpaid'}</Typography>
                            </Grid>
                            <Grid container item xs={6} justifyContent="end" alignItems={'end'} flexDirection="column">
                                <Typography fontSize={12}>
                                    Gross Sale:&nbsp;
                                    <NumberFormat
                                        thousandSeparator={true}
                                        value={item?.GROSS || '0'}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        displayType="text"
                                        prefix="$"
                                    />
                                </Typography>
                                <Typography fontSize={12} fontWeight="bold">
                                    Net Sale:&nbsp;
                                    <Typography fontSize={12} fontWeight="bold" color="success.main">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.NETTREV || '0'}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                        <ExpandedSalesView item={item} expanded={expanded.filter((ele) => ele === item?.ID)?.length > 0} />
                        <BottomBar
                            handleExpandClick={() => {
                                handleExpandClick(item?.ID);
                            }}
                            expanded={expanded.filter((ele) => ele === item?.ID)?.length > 0}
                        />
                    </CardContent>
                </Card>
            </Box>
        );
    };
    return (
        <Box
            sx={{
                mx: 2,
                mt: 2,
            }}
        >
            {data?.length > 0 &&
                data.map((section, idx) => (
                    <React.Fragment key={idx}>
                        <DateTitle date={section[0].date} />
                        {section?.length > 0 &&
                            section.map((item, i) => {
                                return renderRows(item, i);
                            })}
                    </React.Fragment>
                ))}
        </Box>
    );
};

export default SalesGrid;

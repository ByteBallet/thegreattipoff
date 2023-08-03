import { Collapse, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

const ExpandedSubscriptionsView = ({ expanded, item }) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div
                style={{
                    paddingLeft: 18,
                    paddingRight: 12,
                    paddingBottom: 5,
                }}
            >
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Subscription Start Date:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right'>
                        {moment(item?.STARTDATE).format("DD MMMM YYYY")}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Tipster Name:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right' >
                        {item?.ALIAS}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Transaction Type:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right'>
                        {item?.PAYMENT_TYPE == "EW" ? "Credit / Debit Card" : item?.PAYMENT_TYPE == "PO" ? "Poli" : item?.PAYMENT_TYPE}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Last Payment Date:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right'>
                        {moment(item?.PROCESSDATE).format("DD MMMM YYYY")}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Total Tip Packages Received:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right'>
                        {item?.RECEIVEDQTY}
                    </Typography>
                </Stack>
            </div>
        </Collapse>
    );
};

export default ExpandedSubscriptionsView;
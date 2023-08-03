import { Collapse, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';

const ExpandedPurchasedTipsView = ({ expanded, item, title }) => {
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
                        Description:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right' sx={{ width: "75%" }}>
                        {title}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Entry Date:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right' >
                        {moment(item?.TRANSDATETIME).format("DD MMMM YYYY")}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Cost:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right'>
                        <NumberFormat
                            thousandSeparator={true}
                            value={item?.AMOUNT || '0'}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap align='right' color="grey.dark1">
                        Receipt Number:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align='right'>
                        {item?.IDBAL}
                    </Typography>
                </Stack>
            </div>
        </Collapse>
    );
};

export default ExpandedPurchasedTipsView; 
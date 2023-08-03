import { Collapse, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import NumberFormat from 'react-number-format';

const ExpandedTransactionsView = ({ expanded, item }) => {
    const renderStatusWithIcon = () => {
        if (item?.PAYMENT_STATUS == 'PAID') {
            return <CheckCircleIcon sx={{ pt: 0.32, fontSize: 14 }} />;
        } else {
            return <DoDisturbOnIcon sx={{ pt: 0.32, fontSize: 14 }} />;
        }
    };

    const renderStatus = () => {
        if (item?.PAYMENT_STATUS == 'PAID') {
            return 'Accepted';
        } else {
            return 'Declined';
        }
    };

    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div
                style={{
                    paddingLeft: 18,
                    paddingRight: 12,
                    paddingBottom: 5,
                }}
            >
                <Divider sx={{ pt: 0.8, mb: 0.5 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap sx={{ color: 'grey.dark1' }}>
                        Transaction Date:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align="right">
                        {moment(item?.TRANSDATETIME).format('DD MMMM YYYY, H:mm:ss A')}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 0.5 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography noWrap className="lable-text" color="grey.dark1">
                        Transaction Number:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align="right">
                        {item?.IDBAL}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 0.5 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" color="grey.dark1" align="left">
                        {item?.TRANTYPE == 'PUR' ? 'Tip Package Name' : 'Status'}:&nbsp;
                    </Typography>
                    <Typography className="value-text lineClamp" align="right">
                        {item?.TRANTYPE != 'PUR' ? (
                            <React.Fragment>
                                {renderStatus()}
                                <span>{renderStatusWithIcon()}</span>
                            </React.Fragment>
                        ) : (
                            item?.REFERENCE
                        )}
                    </Typography>
                </Stack>
                <Divider sx={{ pt: 0.8, mb: 0.5 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                    <Typography className="lable-text" noWrap color="grey.dark1">
                        Balance Effect:&nbsp;
                    </Typography>
                    <Typography className="value-text" noWrap align="right">
                        <NumberFormat
                            value={item?.AMOUNT}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                            thousandSeparator=","
                        />
                    </Typography>
                </Stack>
                {item?.TRANTYPE != 'PUR' && (
                    <React.Fragment>
                        <Divider sx={{ pt: 0.8, mb: 0.5 }} />
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                            <Typography className="lable-text" noWrap color="grey.dark1">
                                Running Balance:&nbsp;
                            </Typography>
                            <Typography className="value-text" noWrap align="right">
                                <NumberFormat
                                    value={item?.CUMBAL}
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                    prefix="$"
                                    thousandSeparator=","
                                />
                            </Typography>
                        </Stack>
                    </React.Fragment>
                )}
            </div>
        </Collapse>
    );
};

export default ExpandedTransactionsView;

import React from 'react';
import NumberFormat from 'react-number-format';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Link from 'next/Link';
import { getTipsterAlias } from '@Components/utils/util';

const TransactionsTipsGrid = ({ item }) => {
    const renderStatusWithIcon = () => {
        if (item?.PAYMENT_STATUS == 'PAID') {
            return (
                <div className="banking-tab-status-icon-wrapper">
                    <p className="banking-tab-status-text">Accepted</p>
                    <CheckCircleIcon className="banking-tab-status-icon" />
                </div>
            );
        } else {
            return (
                <div className="banking-tab-status-icon-wrapper">
                    <p className="banking-tab-status-text status-declined">Declined</p>
                    <DoDisturbOnIcon className="banking-tab-status-icon status-declined" />
                </div>
            );
        }
    };

    const renderIcon = () => {
        if (item?.TRANSLABEL === 'Deposit') {
            return '/images/svg/deposit-icon.svg';
        } else if (item?.TRANSLABEL === 'Withdraw') {
            return '/images/svg/withdraw-icon.svg';
        } else if (item?.TRANSLABEL === 'Account Adjustment') {
            return '/images/svg/edit.svg';
        } else if (item?.TRANSLABEL === 'Purchase') {
            return '/images/svg/cart-shopping.svg';
        }
        return '/images/svg/deposit-icon.svg';
    };

    const renderPaymentMethod = () => {
        if (item?.PAYMENT_TYPE === 'PO') {
            return 'Poli';
        } else if (item?.PAYMENT_TYPE === 'EW') {
            return 'Credit / Debit Card';
        }
    };

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="start">
            {renderIcon() && (
                <Box sx={{ width: '65%' }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Image src={renderIcon()} width={23} height={26} alt="J-image" />

                        <Box sx={{ width: '83%' }}>
                            <Typography
                                component="p"
                                sx={{
                                    fontWeight: '600',
                                    fontSize: 14,
                                    textDecoration: 'none',
                                    mt: -0.3,
                                }}
                                noWrap
                                color="inherit"
                            >
                                {item?.TRANSLABEL}
                            </Typography>

                            <Stack direction="row" spacing={0.5}>
                                <Link href={item?.TRANTYPE == 'PUR' ? `/tipster/${getTipsterAlias(item?.ALIAS)}` : '#'}>
                                    <Typography
                                        fontSize={12}
                                        className="textCapitalize"
                                        color={item?.TRANTYPE == 'PUR' ? 'info.comment' : 'grey.dark1'}
                                        sx={{
                                            cursor: item?.TRANTYPE == 'PUR' ? 'pointer' : 'none',
                                        }}
                                    >
                                        {item?.TRANTYPE == 'PUR' ? item?.ALIAS : renderPaymentMethod()}&nbsp;
                                        {item?.TRANTYPE == 'PUR' && 'Tip Package'}
                                    </Typography>
                                </Link>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            )}
            <Box
                sx={{
                    alignItems: 'flex-end',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '35%',
                }}
            >
                <Typography fontSize={13} color="background.legs" align="right">
                    Amount:&nbsp;
                    <Typography sx={{ fontSize: 13, fontWeight: '600' }}>
                        <NumberFormat
                            value={item?.AMOUNT}
                            decimalSeparator="."
                            decimalScale={2}
                            thousandSeparator=","
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                    </Typography>
                </Typography>
                {item?.TRANTYPE != 'PUR' && renderStatusWithIcon()}
            </Box>
        </Stack>
    );
};

export default TransactionsTipsGrid;

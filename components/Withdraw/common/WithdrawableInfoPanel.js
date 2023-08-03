import { Box, Typography, Stack } from '@mui/material';
import Image from 'next/image';
import { fetchBankingWithdrawStatus } from '../../../lib/deposit';
import React, { useEffect, useCallback } from 'react';
import MessageHelperText from '@Components/common/MessageHelperText';
import { ErrorOutlined } from '@mui/icons-material';
import WithdrawInfo from './WithdrawInfo';

const getBalanceString = (balance) => {
    return balance ? balance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : '$0.00';
}

export default function WithdrawableInfoPanel(props) {
    const {
        type = 1,
        withdrawable = {}
    } = props;
    return (
        <>
            <Box item sx={{ display: 'flex', justifyContent: 'center' }}>
                {type == 1 && (
                    <Image
                        src="/images/tools/VISA.png"
                        width={100}
                        height={20}
                        alt="VISA"
                    />
                )}
                {type == 3 && (
                    <Image
                        src="/images/tools/Bank.png"
                        width={20}
                        height={20}
                        alt="Bank"
                    />
                )}
            </Box>
            {
                (withdrawable.canwithdraw != true && withdrawable.ERROBJ?.ERRORCODE != 0) ?
                    <>
                        <Box item sx={{ display: 'flex', justifyContent: 'center', my: 0, mx: 3, px: 2, py: 0 }}>
                            <MessageHelperText error={true}>
                                <ErrorOutlined fontSize="small" color="error" sx={{
                                    transform: ' translateY(5px)',
                                    marginRight: '6px',
                                }} />
                                <Typography fontSize={13} sx={{ color: 'error.main' }}>{withdrawable.ERROBJ?.ERRORDESC}</Typography>
                            </MessageHelperText>
                        </Box>
                    </>
                    :
                    <>
                        {/* <Box item sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                Withdrawable amount:{' '}{getBalanceString(withdrawable.withdrawbleamt)}
                            </Typography>
                        </Box> */}
                        <WithdrawInfo type={type} />
                    </>
            }
        </>
    );
}

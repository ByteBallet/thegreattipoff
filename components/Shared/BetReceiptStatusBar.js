import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/Link';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const BetReceiptStatusBar = ({ status, isEachWayLeg1, isCart = false, link }) => {
    let statuscolor = { 0: 'info.main', 1: 'success.main', 2: 'success.main', 3: 'error.main' };
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                bgcolor: statuscolor?.[status?.transtatuscode] ? statuscolor?.[status?.transtatuscode] : 'info.main',
                px: 2,
                py: 0.5,
                borderBottomLeftRadius: isEachWayLeg1 ? 8 : 0,
                borderBottomRightRadius: isEachWayLeg1 ? 8 : 0,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Typography color="white.main" fontSize={12}>
                    Status:&nbsp;
                </Typography>
                <Typography
                    color="white.main"
                    fontSize={12}
                    fontWeight="bold"
                    name={`status-${status?.bookietranid}`}
                    sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
                >
                    {status?.status?.replace(/_/g, '')}
                    {(status?.status == 'No Bet' || status?.status == 'Fail') && (
                        <CancelIcon color="white" fontSize="small" sx={{ ml: 0.5 }} />
                    )}
                    {(status?.status == 'Accepted' || status?.status == 'Purchased') && (
                        <CheckCircleIcon color="white" fontSize="small" sx={{ ml: 0.5 }} />
                    )}
                    {status?.status == 'Processing' && '...'}
                </Typography>
            </Box>
            {status.errorcode > 0 && (
                <Box sx={{ display: 'flex' }}>
                    <Typography color="white.main" fontSize={12} fontWeight="bold">
                        {status.errordesc}
                    </Typography>
                </Box>
            )}
            {(status.errorcode == 0 || status.errorcode == '') && status.bookietranid && status.bookietranid != '0' && !isCart && (
                <Box>
                    <Typography color="white.main" fontSize={12}>
                        Ticket:&nbsp;
                    </Typography>
                    <Typography color="white.main" fontSize={12} fontWeight="bold">
                        {status.bookietranid}
                    </Typography>
                </Box>
            )}
            {isCart && link && (
                <Link href={link}>
                    <Typography color="white.main" fontSize={12} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        Get Tips&nbsp;
                        <KeyboardArrowRightOutlinedIcon fontSize="small" />
                    </Typography>
                </Link>
            )}
        </Stack>
    );
};

export default BetReceiptStatusBar;

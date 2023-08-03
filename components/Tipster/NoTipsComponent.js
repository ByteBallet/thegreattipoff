import { Box, Typography, Stack } from '@mui/material';

import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import FollowButton from '@Components/Tipster/FollowButton';

import WarningIcon from '@mui/icons-material/Warning';

function NoTipsComponent(props) {
    return (
        <Box container sx={{ px: 2 }}>
            <CustomGridTitle title={`${props?.name} Tips`} />
            <Box
                sx={{
                    backgroundColor: 'white.main',
                    borderRadius: '5px',
                    p: 2,
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <WarningIcon color="primary" />
                        <Typography fontWeight="bold" noWrap component="p" fontSize={14}>
                            No tips currently available!
                        </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 14 }}>
                        Click <Typography sx={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 14 }}>Follow</Typography> so you&#39;re
                        alerted when tips post next.
                    </Typography>
                </Box>
                <Box ml={2}>
                    <FollowButton follow={props?.following} tipster={props?.name} tipsterid={props?.tipsterid} format={'btn'} />
                </Box>
            </Box>
        </Box>
    );
}

export default NoTipsComponent;

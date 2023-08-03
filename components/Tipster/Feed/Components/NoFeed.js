import FollowedTipsters from '@Components/MyAccount/blackbook/FollowedTipsters';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import { Box, Typography } from '@mui/material';
import Link from 'next/Link';
import React from 'react';

const NoFeed = ({ isUser }) => {
    return (
        <React.Fragment>
            {
                isUser ?
                    <Box px={2} mt={2}>
                        <CustomGridTitle title="Follow your favourite Tipsters" />
                        <Box mt={2} sx={{ bgcolor: "white.main", px: 2, borderRadius: 2 }}>
                            <FollowedTipsters label={"Popular"} fromFeed={true} />
                        </Box>
                    </Box> :
                    <Box px={2} my={4} sx={{ width: 1 }}>
                        <Link href="/horse-racing-tips">
                            <Typography component={"p"} fontSize={14} align="center" sx={{ cursor: "pointer", width: 1 }}>There&apos;s no recent activity for this Tipster! Check out <u>active tipsters here.</u></Typography>
                        </Link>
                    </Box>
            }
        </React.Fragment>

    );
};

export default NoFeed;
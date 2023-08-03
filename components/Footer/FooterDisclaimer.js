import { Stack, Typography } from '@mui/material';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import moment from 'moment';

const FooterDisclaimer = () => {
    return (
        <React.Fragment>
            <Stack direction="column" spacing={0} justifyContent="start" alignItems="center">
                <Typography color="grey.main" fontSize={11} align="left"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%"
                    }}>
                    <CopyrightIcon fontSize='small' />&nbsp;{(new Date()).getFullYear()}&nbsp;{process.env.client.clientname}
                </Typography>
                <Typography color="grey.main" fontSize={11} >
                    All bets accepted on behalf of Daniel Paolini. Daniel Paolini is licensed in the State of New South Wales by Racing NSW
                </Typography>
            </Stack>
        </React.Fragment>
    );
};

export default FooterDisclaimer;
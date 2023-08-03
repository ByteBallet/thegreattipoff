import { Stack, Box, Grid } from '@mui/material';
import React from 'react';
import HotBets from '../HotBets';

const HotBetTipMarketDesktop = () => {
    let data = [{
        title: "Horse racing",
        racetype: "R"
    },
    {
        title: "Greyhounds",
        racetype: "G"
    }
    ]
    return (
        <React.Fragment>
            <Stack direction="row" spacing={1.5}>
                {
                    data.map((item, idx) =>
                        <Box sx={{ width: 1 / 2, maxHeight: "150vh", overflowY: "auto" }}>
                            <HotBets title={item.title} racetype={item.racetype} desktopMarket={true} />
                        </Box>
                    )
                }
            </Stack>
        </React.Fragment>
    );
};

export default HotBetTipMarketDesktop
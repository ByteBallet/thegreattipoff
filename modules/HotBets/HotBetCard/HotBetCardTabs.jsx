import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

const HotBetCardTabs = ({
    colorId,
    selectedTab,
    handleTabOnClick,
    data,
    totalBets = 0,
    HBMarket = {},
}) => {
    return (
        <Stack direction="row" alignItems={'center'}>
            {data.map((tab) => {
                const bgcolor =
                    selectedTab === tab.id
                        ? `adFilter.hotBetBanner.${colorId}.activeTabBg`
                        : `adFilter.hotBetBanner.${colorId}.inactiveTabBg`;

                const color =
                    selectedTab === tab.id
                        ? `adFilter.hotBetBanner.${colorId}.activeTabFont`
                        : `adFilter.hotBetBanner.${colorId}.inactiveTabFont`;

                return (
                    <Box
                        onClick={() => handleTabOnClick(tab?.id)}
                        key={tab?.id}
                        sx={{
                            height: 30,
                            width: '50%',
                            bgcolor: bgcolor,
                            border: 'solid',
                            borderColor: '#ffffff',
                            borderWidth: '1px',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <Typography
                            sx={{
                                color: color,
                                fontSize: 12,
                                fontWeight:
                                    selectedTab === tab.id ? 'bold' : 'normal',
                            }}
                        >
                            {tab?.name}&nbsp;
                            {tab?.id == 1 &&
                                totalBets > 0 &&
                                '(' + totalBets + ')'}
                            {/* {tab?.name} */}
                        </Typography>
                    </Box>
                );
            })}
        </Stack>
    );
};
export default HotBetCardTabs;

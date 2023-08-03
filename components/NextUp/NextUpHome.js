import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, SvgIcon, Stack, Tab, Tabs } from '@mui/material';
import alarm from '@public/images/svg/alarm.svg';
import NextUpRacing from './NextUpRacing';
import NextUpSports from './NextUpSports';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box>
                    <Typography color="text.active">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const NextUpHome = () => {
    const router = useRouter();
    const { query } = useRouter();
    let activeTab = Object.keys(query).length > 0 ? (Object.values(query)[0].includes('sports') ? 1 : 0) : 0;
    const [value, setValue] = React.useState(activeTab);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setValue(activeTab);
    }, [query]);

    useEffect(() => {
        // change url based on activetab
        router.push(`/nextup/${value == 0 ? 'racing' : 'sports'}`, undefined, { shallow: true });
    }, [value]);

    const showTabs = process.env.APP_BRAND !== 'gto';

    function NextUpTabs() {
        return (
            <>
                <Box sx={{ backgroundColor: 'white.main' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="NextUp">
                        <Tab
                            label="Racing"
                            {...a11yProps(0)}
                            sx={{
                                width: '50%',
                                backgroundColor: 'transparent',
                                borderBottom: 1,
                                borderColor: 'grey.light',
                                color: 'black.main',
                                '&.Mui-selected': {
                                    backgroundColor: 'transparent',
                                    fontWeight: 'bold',
                                    color: 'black.main',
                                },
                            }}
                        />
                        <Tab
                            label="Sport"
                            {...a11yProps(0)}
                            sx={{
                                width: '50%',
                                backgroundColor: 'transparent',
                                color: 'black.main',
                                borderBottom: 1,
                                borderColor: 'grey.light',
                                '&.Mui-selected': {
                                    backgroundColor: 'transparent',
                                    fontWeight: 'bold',
                                    color: 'black.main',
                                },
                            }}
                        />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <NextUpRacing />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <NextUpSports />
                </TabPanel>
            </>
        );
    }

    return (
        <Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                py={0.3}
                sx={{ flexGrow: 1, backgroundColor: 'primary.main' }}
            >
                <SvgIcon
                    component={alarm}
                    viewBox="0 0 512 512"
                    sx={{
                        width: 18,
                        height: 18,
                        color: 'primary.contrastText',
                    }}
                />
                <Typography variant="h6" component="div" color="primary.contrastText" align="center" ml={0.5} fontSize={17}>
                    Next up
                </Typography>
            </Stack>

            {showTabs ? (
                <NextUpTabs />
            ) : (
                <Box>
                    <NextUpRacing />
                </Box>
            )}
        </Box>
    );
};

export default NextUpHome;

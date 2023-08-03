import BoxDivider from '@Components/Shared/BoxDivider';
import CustomTabPanel from '@Components/Shared/CustomTabPanel';
import CustomTabs from '@Components/Shared/CustomTabs';
import { UserContext } from '@Context/User/UserProvider';
import { getTrendingHB } from '@lib/fetcher';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';
import { Box, Alert, Button, useMediaQuery } from '@mui/material';
import followcountStore from '@stores/followcountStore';
import React, { useState, useEffect, useContext } from 'react';
import ManageBlackBookNotifyHome from './ManageBlackBookNotifyHome';
import ManageRunnerFollows from './ManageRunnerFollows';
import ManageTipsterFollows from './ManageTipsterFollows';

import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CustomALert from '@Components/Shared/CustomALert';

const ManageBlackBook = ({ menu }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    const [mounted, setmounted] = useState(false);
    let tabs = menu.map((item) => item.category);
    tabs.push('Settings');
    let selectedLabel = menu.filter((item) => item.default == 1)?.[0]?.category || menu?.[0]?.category;
    let selectedTab = tabs.findIndex((item) => item == selectedLabel);
    const [activeTab, setactiveTab] = useState(selectedTab);
    const [trendingHotBets, settrendingHotBet] = useState();

    const handleTabChange = (event, newValue) => {
        setactiveTab(newValue); // [0 Tipster, 1 Runner, 2 Settings]
    };
    const initialise = followcountStore((state) => state.initialise);

    const initialiseFollowCount = () => {
        let tipsterFollow = menu.filter(
            (item) => item.category == 'Tipsters'
        )?.[0]?.followcount;
        let runnerFollow = menu.filter(
            (item) => item.category == 'Runners'
        )?.[0]?.followcount;
        initialise(tipsterFollow, runnerFollow);
        setmounted(true);
    };

    const getTipsterCarousel = async () => {
        const data2 = (await getTrendingHB(user.promo)) || {};
        settrendingHotBet(data2.hotbet);
    };

    useEffect(() => {
        initialiseFollowCount();
        getTipsterCarousel();
    }, []);

    const renderContent = (item) => {
        switch (item) {
            case 'Tipsters':
                return <ManageTipsterFollows label={item} />;
            case 'Runners':
                return <ManageRunnerFollows label={item} />;
            default:
                return <ManageBlackBookNotifyHome label={item} />;
        }
    };

    function NotificationAlert() {
        const { alertapp, alertemail } = user;

        if (alertapp === 0 && alertemail === 0) {
            return (
                <Box sx={{ mt: 2 }}>
                    <CustomALert
                        content={"Your notification settings are off. Turn on to receive alerts."}
                        severity="error"
                        warning={true}
                        isHtml={false}
                    />
                </Box >
            );
        } else return null;
    }

    return (
        <React.Fragment>
            <Box p={2}>
                {mounted && (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CustomTabs
                                tabs={tabs}
                                handler={handleTabChange}
                                active={activeTab}
                                label="Blackbook"
                            />
                        </Box>
                        <NotificationAlert />
                        <BoxDivider />
                        {tabs.map((item, idx) => (
                            <CustomTabPanel
                                value={activeTab}
                                index={idx}
                                key={idx}
                                content={renderContent(item)}
                            />
                        ))}
                    </React.Fragment>
                )}
            </Box>
            {process.env.APP_BRAND == 'eb' && activeTab == 0 && (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                        pt: 5,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                    }}
                >
                    <TrendingHotBets
                        manageBook={true}
                        isDesktop={isDesktop}
                        trendingHotBets={trendingHotBets}
                        getTipsterCarousel={getTipsterCarousel}
                    />
                </Box>
            )}
        </React.Fragment>
    );
};

export default ManageBlackBook;

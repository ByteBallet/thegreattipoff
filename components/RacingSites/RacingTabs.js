import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import CustomTabs from '@Components/Shared/CustomTabs';
import CustomTabPanel from '@Components/Shared/CustomTabPanel';

import Stats from './Stats/Stats';
import Leaderboard from './Leaderboard/Leaderboard';

import Feed from './Feed/Feed';
import Tips from './Tips/Tips';
import { useRouter } from 'next/router';
import { TIPSTER_ROUTE_VALUE } from '@lib/constants';

const RacingTabs = ({ siteId, selectedType, isNewFeed, siteName, handleBetSlip, setopenBetSlip, sethideIcon, renderBio }) => {
    let tabs = ['Tips', 'Feed', 'Stats', 'Leaderboard'];
    const router = useRouter();
    const [activeTab, setactiveTab] = useState(1);

    useEffect(() => {
        let getTab = tabs?.map((item) => item?.toLowerCase())?.indexOf(router?.query?.sid?.[1] || 'Feed');
        setactiveTab(getTab == -1 ? 1 : getTab);
    }, [router.query]);

    const handleChange = (event, newValue) => {
        let newTab = TIPSTER_ROUTE_VALUE?.filter((item) => item?.label?.toLowerCase() == tabs[newValue]?.toLowerCase())?.[0];
        router.push({
            pathname: '/racing-sites/[[...sid]]',
            query: { sid: [router?.query?.sid?.[0], newTab?.route] },
        });
    };

    useEffect(() => {
        let newTab = TIPSTER_ROUTE_VALUE?.filter((item) => item?.label?.toLowerCase() == tabs[activeTab]?.toLowerCase())?.[0];
        newTab?.label == 'Feed' ? sethideIcon(true) : sethideIcon(false)
    }, [activeTab])



    const renderContent = (item) => {
        switch (item) {
            case 'Tips':
                return <Tips raceType={selectedType} siteName={siteName} handleBetSlip={handleBetSlip} setopenBetSlip={setopenBetSlip} />;
            case 'Feed':
                return <React.Fragment>
                    <Feed siteId={siteId} siteName={siteName} handleChange={() => handleChange(null, 0)} />;
                    {renderBio()}
                </React.Fragment>
            case 'Stats':
                return <Stats selectedType={selectedType} siteName={siteName} handleBetSlip={handleBetSlip} setopenBetSlip={setopenBetSlip} />;
            case 'Leaderboard':
                return (
                    <Leaderboard
                        raceType={selectedType}
                        siteName={siteName}
                        handleBetSlip={handleBetSlip}
                        setopenBetSlip={setopenBetSlip}
                    />
                );
            default:
                return <Feed siteId={siteId} siteName={siteName} />;
        }
    };

    return (
        <>
            <Box sx={{ width: '100%', backgroundColor: 'text.active' }} py={1} px={2}>
                <CustomTabs tabs={tabs} handler={handleChange} active={activeTab} showscrollbuttons={false} label="Tipster" isNewFeed />
            </Box>
            <Box>
                {tabs.map((item, idx) => (
                    <CustomTabPanel value={activeTab} index={idx} key={idx} content={renderContent(item)} isNewFeed={isNewFeed} />
                ))}
            </Box>
        </>
    );
};

export default RacingTabs;

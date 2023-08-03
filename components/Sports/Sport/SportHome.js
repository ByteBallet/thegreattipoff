import React from 'react';
import { useState, useEffect } from 'react';
import {
    Box
} from '@mui/material';
import CustomTabPanel from '../../Shared/CustomTabPanel';
import AllComps from './AllComps';
import UpcomingComps from './UpcomingComps';
import CustomTitle from '@Components/Shared/CustomTitle';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';


const SportHome = ({ tabs, sport, sc }) => {
    let sporsttabs = tabs
    const storage = globalThis?.localStorage;
    let initTab = storage ? storage.getItem("sport_level2") ? storage.getItem("sport_level2") : "" : ""
    const active = sporsttabs.findIndex((element) => element == initTab)
    const [activeTab, setactiveTab] = useState(active != -1 ? active : 0);
    const handleTabChange = (event, newValue) => {
        setactiveTab(newValue);
    };
    useEffect(() => {
        localStorage.setItem('sport_level2', sporsttabs[activeTab]);
    }, [activeTab]);

    return (
        <Box>
            <CustomTitle
                title={sport.replace(/_/g, ' ')}
                logo={
                    <img
                        style={{
                            width: 25,
                            height: 25
                        }}
                        src={`/images/svg/icon-${sc}.svg`}
                    />}
            />
            <Box
                sx={{ width: '100%', backgroundColor: 'text.active', display: "flex", justifyContent: "center" }}
            >
                <CustomIndicatorTabs
                    tabs={sporsttabs}
                    handler={handleTabChange}
                    active={activeTab}
                    label="Sports Menu"
                />
            </Box>
            {sporsttabs.map((item, idx) =>
                (item == 'Upcoming' || item == 'Trending') ? (
                    <CustomTabPanel
                        value={activeTab}
                        index={idx}
                        key={idx}
                        content={
                            <UpcomingComps
                                key={item}
                                sport={sport}
                                activeTab={activeTab}
                                isTrending={item == "Trending" ? true : false}
                                sc={sc}
                            />
                        }
                    />
                ) : (
                    <CustomTabPanel
                        value={activeTab}
                        index={idx}
                        key={idx}
                        content={
                            <AllComps key={item} activeTab={activeTab} sport={sport} isFutures={item == "Futures" ? true : false} sc={sc} />
                        }
                    />
                )
            )}
        </Box>
    );
};

export default SportHome;

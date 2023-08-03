import React, { useContext, useEffect, useState } from 'react';
import { Box, Tabs, Tab, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import FinalResultsTabs from './FinalResultsTabs';
import TipWinner from './TipWinner';
import { UserContext } from '@Context/User/UserProvider';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';
import { getAllRaces, getTrendingHB } from '@lib/fetcher';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const FinalResults = (props) => {
    const { user } = useContext(UserContext);
    const isDesktop = useMediaQuery('(min-width:900px)');
    const resultstabs = ['Results', 'Exotics'];
    const [activeTab, setState] = useState(0);
    const [trendingHotBets, settrendingHotBet] = useState();

    const { resultHandlers } = props;

    const handleTabChange = (event, newValue) => {
        setState(newValue);
    };

    const getTipsterCarousel = async () => {
        const data2 = (await getTrendingHB(user.promo, props.raceid)) || {};
        settrendingHotBet(data2.hotbet);
    };

    useEffect(() => {
        getTipsterCarousel();
    }, []);

    return (
        <Box sx={{ backgroundColor: 'text.active', borderRadius: isDesktop ? 2 : 0 }} pt={0.5}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons={false}
                aria-label="Race Results"
                TabIndicatorProps={{
                    style: {
                        display: 'none',
                    },
                }}
                className="RacingTabs"
                sx={{ px: 1 }}
            >
                {resultstabs.map((item, idx) => (
                    <Tab label={item} {...a11yProps(idx)} key={idx} />
                ))}
            </Tabs>
            {resultstabs.map((item, idx) => (
                <TabPanel value={activeTab} index={idx} key={idx}>
                    <div {...resultHandlers}>
                        <FinalResultsTabs activeTab={activeTab} tab={item} key={item} raceid={props.raceid} raceStatus={props.raceStatus} />
                    </div>
                </TabPanel>
            ))}
            {/* {process.env.APP_BRAND == 'gto' && <TipWinner raceid={props.raceid} />} */}
            {(
                <Box sx={{ backgroundColor: 'background.default', pt: 2 }}>
                    <TrendingHotBets
                        isDesktop={isDesktop}
                        trendingHotBets={trendingHotBets}
                        isResultedRace={true}
                        getTipsterCarousel={getTipsterCarousel}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FinalResults;

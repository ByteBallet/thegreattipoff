import React, { useEffect, useContext, useState } from 'react';
import { Box } from '@mui/material';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';

import racingSiteStore from '@stores/racingSiteStore';
import { getAllRaceTracks, getPeriodMenuOptions } from '@services/tipster/tipsterService';
import { UserContext } from '@Context/User/UserProvider';
import BoxDivider from '@Components/Shared/BoxDivider';
import FilterContainer from '@Components/Leaderboard/FilterContainer';

import DataTable from '../DataTable/DataTable';
import { groupByKey } from '@Components/utils/util';
import { STATS_TABS } from '@lib/constants';
import { getOrgTips, getOrgTipster } from '@services/RacingSites/racingSitesService';
import RacingSiteFilterContainer from '../RacingSiteFilterContainer';
import RacingSiteLeaderboardTable from '../RacingSiteLeaderboardTable';

const Tips = ({ raceType, siteName, setopenBetSlip, handleBetSlip }) => {
    const { user } = useContext(UserContext);
    const [hideLoadmore, sethideLoadmore] = useState(false)
    const tipsterList = racingSiteStore((state) => state.tipsterList);
    const tipster = racingSiteStore((state) => state.tipster);
    const trackOptions = racingSiteStore((state) => state.trackOptions);
    const tracks = racingSiteStore((state) => state.tracks); //
    const period = racingSiteStore((state) => state.period);
    const periodOptions = racingSiteStore((state) => state.periodOptions);
    const bettype = racingSiteStore((state) => state.bettype);
    const staking = racingSiteStore((state) => state.staking);
    const activeTab = racingSiteStore((state) => state.activeTab);
    const updateStats = racingSiteStore((state) => state.updateStats);
    const numTips = racingSiteStore((state) => state.numTips);

    const racingSiteData = racingSiteStore((state) => state.racingSiteData);

    const initialise = racingSiteStore((state) => state.initializeStore);
    const updateData = racingSiteStore((state) => state.updateData);

    const [loading, setLoading] = useState(true);

    const handleTabChange = (event, newValue) => {
        updateData({ key: 'activeTab', value: newValue });
    };

    const getPeriodMenu = async () => {
        let body = { userid: user?.userID, isMarket: false, racetype: raceType };
        const response = await getPeriodMenuOptions(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            initialise({ key: 'periodOptions', value: response?.data?.period });
        }
    };

    const getLbData = async (pagestart = 0) => {
        setLoading(true);
        const response = await getOrgTips(
            numTips,
            pagestart > 0 ? racingSiteData?.length : 0,
            tipster,
            raceType,
            tracks,
            bettype,
            staking,
            activeTab,
            period,
            siteName,
            'tipmarket'
        );
        response?.hotbet?.length > 0 ? sethideLoadmore(true) : sethideLoadmore(false)
        updateData({ key: 'racingSiteData', value: response?.hotbet });
        setLoading(false);
    };

    useEffect(() => {
        getPeriodMenu();
    }, []);

    useEffect(() => {
        getLbData();
    }, [raceType, updateStats, activeTab]);

    useEffect(() => {
        //getTracks();
        getTipster();
    }, [period]);

    const getTracks = async () => {
        let body = {
            racetype: raceType,
            group: false,
            timeperiod: period,
        };
        try {
            const response = await getAllRaceTracks(body);
            initialise({
                key: 'tracksList',
                value: response?.data?.tracks,
            });
            initialise({
                key: 'trackOptions',
                value: groupByKey(response?.data?.tracks, 'LABEL'),
            });
        } catch (error) {
            console.log('getTracks error', error);
        } finally {
        }
    };

    const getTipster = async () => {
        const tipster = await getOrgTipster(raceType, siteName);
        initialise({
            key: 'tipsterList',
            value: tipster,
        });
        setLoading(false);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ bgcolor: '#fff', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CustomIndicatorTabs tabs={STATS_TABS} handler={handleTabChange} active={activeTab} label="LB Menu" clsName="LbSubMenu" />
            </Box>
            <Box py={1}>
                <RacingSiteFilterContainer selectedType={raceType} isMarket={false} />
                {/* <FilterContainer
                    handleChange={handleFilterChange}
                    period={periodOptions}
                    tracks={trackOptions}
                    filter={filter}
                    bettype={bettype}
                    tipsters={tipsterList}
                    stake={staking}
                    isLB={true}
                /> */}
            </Box>
            <Box px={1} sx={{ bgcolor: 'white.main' }} py={1.5}>
                {/* <DataTable
                    statsTabs={STATS_TABS}
                    activeTab={activeTab}
                    data={racingSiteData}
                    staking={staking}
                    bettype={bettype}
                /> */}
                <RacingSiteLeaderboardTable
                    selectedType={raceType}
                    statsTabs={STATS_TABS}
                    isMarket={false}
                    handleBetSlip={handleBetSlip}
                    setopenBetSlip={setopenBetSlip}
                    getLbData={getLbData}
                    hideLoadmore={hideLoadmore}
                />
            </Box>
            <Box my={2} mx={2}>
                <BoxDivider />
            </Box>
        </Box>
    );
};

export default Tips;

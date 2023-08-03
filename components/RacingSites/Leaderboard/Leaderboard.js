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
import RacingSiteLeaderboardTable from '../RacingSiteLeaderboardTable';
import RacingSiteFilterContainer from '../RacingSiteFilterContainer';

const Leaderboard = ({ raceType, siteName, handleBetSlip, setopenBetSlip }) => {
    const { user } = useContext(UserContext);
    const [loading, setloding] = useState(false);
    const [hideLoadmore, sethideLoadmore] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const tipsterList = racingSiteStore((state) => state.tipsterList);
    const tipster = racingSiteStore((state) => state.tipster);
    const trackOptions = racingSiteStore((state) => state.trackOptions);
    const tracks = racingSiteStore((state) => state.tracks); //
    const period = racingSiteStore((state) => state.period);
    const periodOptions = racingSiteStore((state) => state.periodOptions);
    const bettype = racingSiteStore((state) => state.bettype);
    const staking = racingSiteStore((state) => state.staking);
    const activeTab = racingSiteStore((state) => state.activeTab);
    const numTips = racingSiteStore((state) => state.numTips);
    const updateStats = racingSiteStore((state) => state.updateStats);

    const racingSiteData = racingSiteStore((state) => state.racingSiteData);

    const initialise = racingSiteStore((state) => state.initializeStore);
    const updateData = racingSiteStore((state) => state.updateData);

    const [recordCount, setRecordCount] = useState({
        pageStart: 0,
        totalRecs: -1,
    });

    const filter = {
        tracks: tracks,
        tipster: tipster,
        period: period,
        bettype: bettype,
        staking: staking,
    };

    const handleTabChange = (event, newValue) => {
        updateData({ key: 'activeTab', value: newValue });
    };

    const getPeriodMenu = async () => {
        let body = { userid: user?.userID };
        const response = await getPeriodMenuOptions(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            initialise({ key: 'periodOptions', value: response?.data?.period });
        }
    };

    const getLbData = async (pageStart) => {
        if (pageStart == 0) {
            setloding(true);
        } else {
            setMoreLoading(true);
        }
        const response = await getOrgTips(
            numTips,
            pageStart > 0 ? racingSiteData?.length : 0,
            tipster,
            raceType,
            tracks,
            bettype,
            staking,
            activeTab,
            period,
            siteName,
            'leaderboard'
        );
        pageStart == 0
            ? updateData({ key: 'racingSiteData', value: response?.hotbet })
            : updateData({ key: 'racingSiteData', value: [...racingSiteData, ...response?.hotbet] });
        response?.hotbet?.length > 0 ? sethideLoadmore(true) : sethideLoadmore(false);
        setRecordCount({
            pageStart: recordCount.pageStart + 1,
            totalRecs: response?.totalrecs,
        });
        setloding(false);
        setMoreLoading(false);
    };

    useEffect(() => {
        getPeriodMenu();
    }, []);

    useEffect(() => {
        getLbData(0);
    }, [raceType, updateStats, activeTab]);

    useEffect(() => {
        getTipster();
        getTracks();
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
    };

    const handleFilterChange = (prop) => (event) => {
        const {
            target: { value },
        } = event;
        let val = value;
        if (prop == 'tracks') {
            const index = value.indexOf(0); //All option check
            if (index > -1) {
                // only splice array when item is found
                value.splice(index, 1); // 2nd parameter means remove one item only
            }
            let clear = value.indexOf(-1) > 0; // clear all clicked
            val = clear ? [] : typeof value === 'string' ? value.split(',') : value;
        }
        updateData({ key: prop, value: val });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box
                sx={{
                    bgcolor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CustomIndicatorTabs tabs={STATS_TABS} handler={handleTabChange} active={activeTab} label="LB Menu" clsName="LbSubMenu" />
            </Box>
            <Box py={1}>
                <RacingSiteFilterContainer selectedType={raceType} isMarket={false} />
            </Box>
            <Box px={1} sx={{ bgcolor: 'white.main' }} py={1.5}>
                <RacingSiteLeaderboardTable
                    selectedType={raceType}
                    statsTabs={STATS_TABS}
                    isMarket={false}
                    handleBetSlip={handleBetSlip}
                    setopenBetSlip={setopenBetSlip}
                    getLbData={getLbData}
                    recordCount={recordCount}
                    loading={loading}
                    moreLoading={moreLoading}
                    hideLoadmore={false}
                />
            </Box>
            <Box my={2} mx={2}>
                <BoxDivider />
            </Box>
        </Box>
    );
};

export default Leaderboard;

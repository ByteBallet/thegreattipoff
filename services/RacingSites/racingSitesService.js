import authAPI from '@Components/utils/authAPI';
import { LB_ACTIVE_TAB_VALUES, STATS_TABS } from '@lib/constants';

export const getOrgProfile = async (site) => {
    const url = `${process.env.server}/affiliate/getOrgProfile`;
    try {
        const response = await authAPI(url, { site }, 'POST', false);
        if (response) {
            return response?.data?.profile || null;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getOrgProfile', error);
    }
};

export const getOrgFeed = async (siteid, startrec, maxrec) => {
    const url = `${process.env.server}/feed/getfeed`;
    try {
        const response = await authAPI(url, { siteid, startrec, maxrec }, 'POST');
        if (response) {
            return response?.data || null;
        } else {
            return null;
        }
    } catch (error) {
        console.log('getOrgFeed error---getOrgProfile', error);
    }
};

const s = {
    userid: '',
    media: 0,
    mediagroup: 'Sky Racing',
    period: '90',
    page: 'stats',
    lbtype: 'HB',
    StatType: 'BEST',
    racetype: 'R',
    locid: [0],
    BetType: 'win',
    stake: 'evenstake',
    rank: 'POT',
    tipsterid: 94086,
};

export const getOrgTips = async (
    totaltips,
    pagestart,
    tipster,
    racetype,
    tracks,
    bettype,
    staking,
    activeTab,
    period,
    siteName,
    page,
    isLB = false
) => {
    const url = `${process.env.server}/hbet/getHotBetdata`;
    try {
        const response = await authAPI(
            url,
            {
                userid: '',
                media: 0,
                mediagroup: siteName || 'SEN',
                period: period,
                page: page ? page : isLB ? 'leaderboard' : 'tipmarket',
                lbtype: 'HB',
                StatType: 'BEST',
                racetype: racetype,
                locid: tracks?.length === 0 ? [0] : tracks,
                BetType: bettype,
                stake: staking,
                rank: LB_ACTIVE_TAB_VALUES[activeTab] ?? 'WINPROFIT',
                tipsterid: tipster,
                pagestart: pagestart ?? 0,
                totaltips: totaltips,
                nrecs: pagestart > 0 ? 30 : 10
            },
            'POST'
        );
        if (response) {
            return response?.data || null;
        } else {
            return null;
        }
    } catch (error) {
        console.log('getOrgTips error', error);
    }
};

export const getOrgTipster = async (raceType, siteName) => {
    const url = `${process.env.server}/affiliate/getOrgTipster`;
    try {
        const response = await authAPI(url, { site: siteName, raceType }, 'POST');
        if (response) {
            return response?.data?.orgtipster || null;
        } else {
            return null;
        }
    } catch (error) {
        console.log('getOrgTips error', error);
    }
};

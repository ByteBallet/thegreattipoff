import authAPI from '@Components/utils/authAPI';
import axios from 'axios';
import moment from 'moment';

const axiosConfig = {
    headers: {
        XAPIGTO: 'EB',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMjA5NSIsImNsaWVudGlkIjoiWjladzdPcjlKaDN0QVoyYk9nWjE0a1lUUE9id29jVG15NlclMkZ3V3paT3Q0R2tQOWpscFdMMGx4ZWl0TVlrUnVhIiwidGlkIjoiRUIiLCJ0aW1lX3N0YW1wIjoxNjQ1MTM4MjA2LCJqdGkiOiI2MkNCQjBDNC0wMkMyLTc3MTMtRjkyNDA0OEE5REM5RjQ4NiIsImlhdCI6MTY0NTEzODIwNiwiZXhwIjoxNjQ1MTM5MTA2fQ.xPRsHv6y7ClZS742RW8JwsWoSYUaScrgAZBBLW3iV2E',
    },
};

export const getHBTipMarket = async (
    userid,
    racetype,
    fromdate,
    todate,
    cat,
    menu = false,
    eventid = '',
    minval = 0,
    maxval = 0
) => {
    const url = `${process.env.server}/hbet/getHBTipMarket`;
    const body = {
        userid,
        racetype,
        fromdate,
        todate,
        cat,
        eventid,
        menu,
        maxval,
        minval,
    };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response;
        } catch (error) {
            console.log('error---getHBTipMarket', error);
        }
    }
};

export const getHBTipster = async (
    userid,
    alias,
    tipsterid = 0,
    racetype = 'X',
    fromdate = moment().format('YYYY-MM-DD'),
    todate = moment().format('YYYY-MM-DD'),
    cat = '',
    menu = false,
    eventid = '',
    minval = 0,
    maxval = 0
) => {
    const url = `${process.env.server}/hbet/getHBTipMarket`;
    const body = {
        userid,
        alias,
        tipsterid,
        racetype,
        fromdate,
        todate,
        cat,
        eventid,
        menu,
        maxval,
        minval,
    };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response;
        } catch (error) {
            console.log('error---getHBTipMarket', error);
        }
    }
};

export const getResults = async (cat, racetype, uid, adid, startrec = 0) => {
    const url = `${process.env.server}/hbet/getResults`;
    const body = { cat, racetype, uid, adid: adid, startrec };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response?.data;
        } catch (error) {
            console.log('error---getResults', error);
        }
    }
};

export const getResultsRecentWinners = async (body) => {
    const url = `${process.env.server}/hbet/getResults`;
    // const body = { cat, racetype, uid, adid: adid, startrec };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response?.data;
        } catch (error) {
            console.log('error---getResults', error);
        }
    }
};

export const getPunterProfile = async (racetype, uid) => {
    const url = `${process.env.server}/hbet/getPunterProfile`;
    const body = { racetype, uid };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response?.data;
        } catch (error) {
            console.log('error---getPunterProfile', error);
        }
    }
};

export const getDetailedStat = async (
    racetype,
    uid,
    stattype,
    adid,
    timeperiod = -1,
    locid = 0
) => {
    const url = `${process.env.server}/hbet/getDetailedStat`;
    const body = { racetype, uid, stattype, adid, timeperiod, locid };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response?.data;
        } catch (error) {
            console.log('error---getDetailedStat', error);
        }
    }
};

export const getTipLocations = async (
    uid,
    racetype = 'A',
    locations,
    packages,
    userselected
) => {
    const url = `${process.env.server}/hbet/getTipLocations`;
    const body = {
        uid,
        racetype,
        locations,
        packages,
        userselected,
    };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response?.data;
        } catch (error) {
            console.log('error---getTipLocations', error);
        }
    }
};

export const getBetDetails = async (
    uid,
    racetype,
    locations,
    packages,
    oddsfilter,
    minval,
    maxval,
    odds,
    locList,
    stakeall = 0
) => {
    const url = `${process.env.server}/hbet/getBetDetails`;
    const body = {
        uid,
        racetype,
        locations,
        packages,
        minval,
        maxval,
        oddsfilter,
        odds,
        locList,
        stakeall
    };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response?.data;
        } catch (error) {
            console.log('error---getBetDetails', error);
        }
    }
};

export const getHBBetSlip = async (body) => {
    const url = `${process.env.server}/hbet/getBetObj`;

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', false);
            return response;
        } catch (error) {
            console.log('error---getDetailedStat', error);
        }
    }
};

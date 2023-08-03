import axios from 'axios';

import { TRENDING_TAB_TYPE } from '@lib/constants';

const axiosConfig = {
    headers: {
        XAPIGTO: 'EB',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMjA5NSIsImNsaWVudGlkIjoiWjladzdPcjlKaDN0QVoyYk9nWjE0a1lUUE9id29jVG15NlclMkZ3V3paT3Q0R2tQOWpscFdMMGx4ZWl0TVlrUnVhIiwidGlkIjoiRUIiLCJ0aW1lX3N0YW1wIjoxNjQ1MTM4MjA2LCJqdGkiOiI2MkNCQjBDNC0wMkMyLTc3MTMtRjkyNDA0OEE5REM5RjQ4NiIsImlhdCI6MTY0NTEzODIwNiwiZXhwIjoxNjQ1MTM5MTA2fQ.xPRsHv6y7ClZS742RW8JwsWoSYUaScrgAZBBLW3iV2E',
    },
};

export const getTrendingSports = async () => {
    const url = `${process.env.server}/sports/getAllSports`;
    try {
        const response = await axios.get(url, axiosConfig);
        if (response && typeof response.data === 'object') {
            const formatedData = [
                {
                    title: 'Trending',
                    list: response.data?.hotevents,
                    type: TRENDING_TAB_TYPE.TRENDING_SPORT,
                },
                {
                    title: 'Popular',
                    list: response.data?.topsports,
                    type: TRENDING_TAB_TYPE.POPULAR,
                },
                {
                    title: 'Other Sports',
                    list: response.data?.sports,
                    type: TRENDING_TAB_TYPE.OTHERS,
                },
            ];

            return formatedData;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getAllSports', error);
    }
};

export const getUpcomingSport = async () => {
    const url = `${process.env.server}/sports/getUpcomingSport`;
    const body = { sportname: '', sportcode: '', reclimit: 100, menulist: true };
    try {
        const response = await axios.post(url, body, axiosConfig);
        if (response && typeof response?.data === 'object') {
            const formatedData = [
                { title: 'Upcoming', list: response.data?.upcomingSport },
            ];
            return formatedData;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getUpcomingSport', error);
    }
};

export const getAllSport = async () => {
    const url = `${process.env.server}/sports/getSportAZ`;
    const body = {};
    try {
        const response = await axios.post(url, body, axiosConfig);
        if (response && typeof response.data === 'object') {
            const formatedData = [
                { title: 'Sports A-Z', list: response.data?.sportAZ },
            ];
            return formatedData;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getAllSport', error);
    }
};

export const getSportAZ = async () => {
    const url = `${process.env.server}/sports/getSportAZ`;
    try {
        const response = await axios.get(url, axiosConfig);
        if (response && typeof response.data === 'object') {
            console.log('getUpcomingSport', response.data?.sportAZ);
            return response.data?.sportAZ;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getSportAZ', error);
    }
};

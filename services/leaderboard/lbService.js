import authAPI from '@Components/utils/authAPI';

export const getMediaGroups = async (requestBody) => {
    const url = `${process.env.server}/leaderboard/getMediaGroups`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getMediaGroups', error);
    }
};

export const getMarket = async (requestBody) => {
    const url = `${process.env.server}/protip/getHomePageCarousel`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getMarket', error);
    }
};

export const getLeaderboardData = async (requestBody) => {
    const url = `${process.env.server}/hbet/getHotBetdata`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getMarket', error);
    }
};

export const getSeodata = async (params) => {
    const requestBody = {
        urlpath: params,
    };
    const url = `${process.env.server}/seo/getseometa`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getMarket', error);
    }
};

export const getTipMarketStaticContent = async (requestBody) => {
    const url = `${process.env.server}/help/getTipMarketStaticContent`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getMarket', error);
    }
};


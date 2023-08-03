import authAPI from '@Components/utils/authAPI';

export const getVideos = async (requestBody) => {
    const url = `${process.env.server}/video/getVideo`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--getVideo', error);
    }
};

export const getTipsterCarousel = async (requestBody) => {
    const url = `${process.env.server}/hbet/getHotBetdata`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--getVideo', error);
    }
};

export const getTodayMeeting = async (requestBody) => {
    const url = `${process.env.server}/races/getTodayMeeting`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--getVideo', error);
    }
};

export const getHomeAPI = async (requestBody) => {
    const url = `${process.env.server}/general/getHomeAPI`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--getVideo', error);
    }
};

export const getFooterContent = async (requestBody) => {
    const url = `${process.env.server}/general/getFooterContent`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--getVideo', error);
    }
};

export const gethomestats = async (requestBody) => {
    const url = `${process.env.server}/info/homestats`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--homestats', error);
    }
};

export const getPopularTipsters = async (requestBody) => {
    const url = `${process.env.server}/general/getPopular`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error--homestats', error);
    }
};

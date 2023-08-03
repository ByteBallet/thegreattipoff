import authAPI from '@Components/utils/authAPI';

export const getNews = async (requestBody) => {
    const url = `${process.env.server}/news/getArticles`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getNewsDetails = async (reqBody) => {
    const url = `${process.env.server}/news/getNews`;
    try {
        const response = await authAPI(url, reqBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getMarketNews = async (reqBody) => {
    const url = `${process.env.server}/news/getMarketNews`;
    try {
        const response = await authAPI(url, reqBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

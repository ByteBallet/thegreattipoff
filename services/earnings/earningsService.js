import authAPI from "@Components/utils/authAPI";

export const getEarningSummary = async (requestBody) => {
    const url = `${process.env.server}/earnings/getEarningsSummary`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getMarket', error);
    }
};
import authAPI from "@Components/utils/authAPI";

export const getTipTransactions = async (requestBody) => {
    const url = `${process.env.server}/tipTransactions/getTipTransactions`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getTipTransactions', error);
    }
};

export const getPackageTips = async (requestBody) => {
    const url = `${process.env.server}/tipTransactions/getPackageTips`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getPackageTips', error);
    }
};

export const getUserSubscriptions = async (requestBody) => {
    const url = `${process.env.server}/tipTransactions/getUserSubscriptions`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getUserSubscriptions', error);
    }
};

export const getUserSubscriptionsCards = async (requestBody) => {
    const url = `${process.env.server}/tipTransactions/getUserSubscriptionsByCard`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getUserSubscriptions', error);
    }
};

export const manageUserSubscription = async (requestBody) => {
    const url = `${process.env.server}/tipTransactions/manageUserSubscription`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getUserSubscriptions', error);
    }
};
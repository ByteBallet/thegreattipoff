import authAPI from '@Components/utils/authAPI';

export const getUserBio = async (requestBody) => {
    const url = `${process.env.server}/user/GetUserBio`;
    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            false
        );
        if (response) {
            return response;
        }
    } catch (error) {
        console.log('error---GetUserBio', error);
    }
};

export const gettiptacticsMenu = async (requestBody) => {
    const url = `${process.env.server}/info/gettiptactics`;
    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            false
        );
        if (response) {
            return response;
        }
    } catch (error) {
        console.log('error---gettiptactics', error);
    }
};

export const getAllRaceTracks = async (requestBody) => {
    const url = `${process.env.server}/races/getAllRaceTracks`;
    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            false
        );
        if (response) {
            return response;
        }
    } catch (error) {
        console.log('error---getAllRaceTracks', error);
    }
};

export const getResults = async (requestBody) => {
    const url = `${process.env.server}/hbet/getResults`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getPeriodMenuOptions = async (requestBody) => {
    const url = `${process.env.server}/info/getPeriodMenu`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getFreeTips = async (requestBody) => {
    const url = `${process.env.server}/protip/getFreeTips`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getBuyTips = async (requestBody) => {
    const url = `${process.env.server}/protip/getBuyTips`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getBankDetails = async (requestBody) => {
    const url = `${process.env.server}/user/checkBankAccount`;
    try {
        const response = await authAPI(url, requestBody, 'POST', true);
        return response;
    } catch (error) {
        console.log('error---getResults', error);
    }
};

export const getActivePackages = async (requestBody) => {
    const url = `${process.env.server}/tippackage/getActivePackages`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getActivePackages', error);
    }
};

export const addFreeTip = async (requestBody) => {
    const url = `${process.env.server}/tipsales/applyfreeTip`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---applyfreeTip', error);
    }
};


export const getTipsterBackground = async (requestBody) => {
    const url = `${process.env.server}/tipstersite/getTipsterBackground`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getTipsterBackground', error);
    }
};

export const getTipDays = async (requestBody) => {
    const url = `${process.env.server}/tippackage/getTipDays`;
    try {
        const response = await authAPI(url, requestBody, 'POST', false);
        return response;
    } catch (error) {
        console.log('error---getTipPackageDays', error);
    }
};
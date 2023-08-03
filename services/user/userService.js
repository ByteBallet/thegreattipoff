import authAPI from '@Components/utils/authAPI';

export const getUserPricing = async (requestBody) => {
    const url = `${process.env.server}/user/GetUserPricing`;
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

export const getUserStaking = async (requestBody) => {
    const url = `${process.env.server}/user/GetUserStakings`;
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
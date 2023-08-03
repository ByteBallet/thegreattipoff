import authAPI from '@Components/utils/authAPI';

export const ALERT_MODAL = {
    activateFollow: async (body) => {
        const url = `${process.env.server}/info/activateFollow`;
        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            return response.data;
        }
        return null;
    },
};

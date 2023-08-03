import authAPI from '@Components/utils/authAPI';

export const TIP_PACK_API = {
    updatePackageDefaults: async (body) => {
        try {
            const url = `${process.env.server}/tippackage/updatePackageDefaults`;
            const resp = await authAPI(url, body, 'POST', true);
            if (!resp.error) return { data: resp.data, error: false };
        } catch (e) {
            return { data: null, error: true };
        }
    },
};

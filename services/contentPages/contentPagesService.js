import authAPI from '@Components/utils/authAPI';

export const getContentPagesData = async (pageTitle) => {
    const url = `${process.env.server}/bookmaker/getBookieContent`;
    const body = { page: pageTitle };

    if (body) {
        try {
            const response = await authAPI(
                url,
                body,
                'POST',
                false
            );
            return response;
        } catch (error) {
            return null;
        }
    }
};

export const getGroupOne = async () => {
    const url = `${process.env.server}/general/getRacingTermsMenu`;
    try {
        const response = await authAPI(
            url,
            {},
            'GET',
            false
        );
        return response?.data || [];
    } catch (error) {
        return null;
    }
};

export const getRacingTermsContent = async (term) => {
    const url = `${process.env.server}/general/getRacingTermsContent`;
    try {
        const response = await authAPI(
            url,
            { term },
            'POST',
            false
        );
        return response?.data || [];
    } catch (error) {
        return null;
    }
};

export const getSiteMap = async () => {
    const url = `${process.env.server}/general/getsitemap`;
    try {
        const response = await authAPI(
            url,
            {},
            'GET',
            false
        );
        return response?.data || [];
    } catch (error) {
        return null;
    }
};

export const getOurTeam = async () => {
    const url = `${process.env.server}/general/getOurTeam`;
    try {
        const response = await authAPI(
            url,
            {},
            'GET',
            false
        );
        return response?.data || [];
    } catch (error) {
        return null;
    }
};
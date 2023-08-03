import authAPI from '@Components/utils/authAPI';

export const getGroupOne = async () => {
    const url = `${process.env.server}/general/getGroupOne`;
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

export const getGroup1RaceContent = async (racename) => {
    console.log("getGroup1RaceContent",racename)
    const url = `${process.env.server}/general/getGroup1RaceContent`;
    const body = { racename}
    try {
        const response = await authAPI(url, body, "POST", false);
        return response?.data?.content;

    } catch (error) {
        console.log('error---getActiveComp', error);
    }
};
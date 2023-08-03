import authAPI from '@Components/utils/authAPI';

export const FeedService = {
    getFeed: async (body) => {
        const url = `${process.env.server}/feed/getfeed`;
        // const body = {
        //     userid: '86460',
        //     startrec: 1,
        //     maxrec: 10,
        // };

        try {
            const response = await authAPI(url, body, 'POST', false);
            return response;
        } catch (e) {
            console.log('--Feed API--, ERROR');
        }
    },
};

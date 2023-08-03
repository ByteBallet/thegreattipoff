import authAPI from "@Components/utils/authAPI";

export const getFollows = async (
    userid,
    menu = false,
    lastrec = 0,
    followtype = "",
    id = 0,
    followsubtype = ""
) => {
    const url = `${process.env.server}/notifications/getFollows`;
    const body = {
        userid,
        id,
        followtype,
        lastrec,
        menu,
        followsubtype
    };

    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', true);
            return response;
        } catch (error) {
            console.log('error---getFollows', error);
        }
    }
};

export const setFollowComment = async (
    userid,
    id,
    followid,
    comment
) => {
    const url = `${process.env.server}/notifications/setFollowComment`;
    const body = {
        userid,
        id,
        followid,
        comment
    };
    if (body) {
        try {
            const response = await authAPI(url, body, 'POST', true);
            return response;
        } catch (error) {
            console.log('error---getFollows', error);
        }
    }
};
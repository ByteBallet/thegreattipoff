import authAPI from "@Components/utils/authAPI";

export const getActiveComp = async (user) => {
    const url = `${process.env.server}/competitions/getActiveComp`;
    const body = { userid: user.userID || 0 };
    try {
        const response = await authAPI(url, body, "POST", user.userID);
        if (response && typeof response.data === 'object') {
            return response.data.competition
                ;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getActiveComp', error);
    }
};

export const getLeaderboard = async (user, compid, startrec, qualified) => {
    const url = `${process.env.server}/competitions/getLeaderboard`;
    const body = { userid: user.userID, compid, startrec, qualified }
    try {
        const response = await authAPI(url, body, "POST", user.userID);
        if (response && typeof response.data === 'object') {
            return response.data?.competition?.leaderboard
                ;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error---getActiveComp', error);
    }
};
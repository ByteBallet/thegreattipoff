import authAPI from '../components/utils/authAPI';

export const getAllSports = async (sportcode = undefined, isHome = false) => {
    const url = `${process.env.server}/sports/getAllSports`;
    const response = await authAPI(
        url,
        {
            sportcode: sportcode ? sportcode : 'all', isHome: isHome
        },
        'POST',
        false
    );
    if (response.error) {
        return [];
    }
    return response.data;
};

export const getSportHighlights = async (sportcode = "all", trending = 1, featured = 1, futures = 1) => {
    const url = `${process.env.server}/sports/getSportHighlights`;
    const response = await authAPI(
        url,
        {
            sportcode: sportcode,
            trending: trending,
            featured: featured,
            futures: futures
        },
        'POST',
        false
    );
    if (response.error) {
        return [];
    }
    return response.data;
};

export const getTrendingHB = async (promo, raceid, racetype = undefined) => {
    const url = `${process.env.server}/races/getAllRaces`;
    const response = await authAPI(
        url,
        {
            nexttojump: 1,
            jsonresp: 1,
            racetype: racetype ? racetype : 'A',
            promo,
            raceid
        },
        'POST',
        false
    );
    if (response.error) {
        return [];
    }
    return response.data;
};

export const getAllRaces = async (promo, racetype = undefined, nexttojump = 1) => {
    const url = `${process.env.server}/races/getAllRaces`;
    const response = await authAPI(
        url,
        {
            nexttojump: nexttojump,
            jsonresp: 1,
            racetype: racetype ? racetype : 'A',
            promo
        },
        'POST',
        false
    );
    if (response.error) {
        return [];
    }
    return response.data;
};

//04/05/2022 Sergey

export const proceedUserUpdateDetails = async (value) => {
    const url = `${process.env.server}/user/updateuserdetail`;

    const response = await authAPI(url, value, 'POST', false);
    return response;
};

export const fetchUserDetails = async (data = { clientid: 'testclient' }) => {
    const url = `${process.env.server}/user/userdetails`;
    // if (data === undefined) data = '{"clientid":"testclient"}';
    const response = await authAPI(url, data, 'POST', false);
    return response;
};

export const proceedUserChangePass = async (body) => {
    const url = `${process.env.server}/user/UserChangePass`;

    // const str2 = body.replace(/\\/g, '');
    const response = await authAPI(url, body, 'POST', false);

    return response;
};

export const proceedUserSettings = async (value = {}) => {
    const url = `${process.env.server}/user/usersettings`;
    const response = await authAPI(url, value, 'POST', false);
    if (response.error) {
        return response;
    }
    return response.data;
};

export const fetchCreditCards = async (data = { clientid: 'testclient' }) => {
    const url = `${process.env.server}/banking/creditcards`;

    const response = await authAPI(url, data, 'POST', false);
    if (response.error) {
        return response;
    }

    return response.data;
};

export const proceedCreditCardVerify = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${process.env.server}/user/ccverify`;
    const response = await authAPI(url, body, 'POST', false);
    if (response.error) {
        return response;
    }
    return response.data;
};

export const proceedCreditCardUnregister = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${process.env.server}/user/CCUnregister`;

    const response = await authAPI(url, body, 'POST', false);

    if (response.error) {
        return response;
    }
    return response.data;
};
export const fetchUserBenefits = async (
    selected,
    body = { clientid: 'testclient' }
) => {
    let urls = [
        `${process.env.server}/user/pointsredeem`,
        `${process.env.server}/user/pointsautoredeem`,
    ];
    const response = await authAPI(urls[selected], body, 'POST', false);

    if (response.error) {
        return response.error;
    }
    return response.data;
};

export const fetchBenefitsRewards = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${process.env.server}/user/benefits`;
    const response = await authAPI(url, body, 'POST', false);
    if (response.error) {
        return {
            balance: 0.0,
            count1: 0,
            count2: 0,
            count3: 0,
            totalCount: 0,
            reward: 0,
        };
    }

    let apts = 0;
    if (response.data.POINTS && response.data.POINTS.opts && response.data.POINTS.opts.length > 0) {
        apts = response.data.POINTS?.opts[0].apts;
    }
    let dbvs = 0;
    dbvs = response.data.BOOST?.dbvs;
    let rval = 0;
    if (response.data.BONUSBET && response.data.BONUSBET.fbvs && response.data.BONUSBET.fbvs.length > 0) {
        rval = response.data.BONUSBET?.fbvs[0]?.rval || 0;
    }
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;

    dbvs?.forEach((row) => {
        if (row.rrr === undefined) {
            if (row.desc.includes('Multis')) count3 += row.rval;
            else count2 += row.rval;
        } else {
            count1 += row.rval;
        }
    });

    return {
        balance: rval,
        count1,
        count2,
        count3,
        totalCount: count1 + count2 + count3,
        reward: apts,
    };
    // return response.data;
};

export const fetchDepositLimit = async (body = { clientid: 'testclient' }) => {
    const url = `${process.env.server}/user/getDepositLimit`;

    const response = await authAPI(url, body, 'POST', false);
    const data2 = { ...response.data };

    if (response.error) {
        return {};
    } return response.data;
};

export const proceedDepositLimit = async (
    body = { clientid: 'testclient' }
) => {
    const url = `${process.env.server}/user/setDepositLimit`;

    let response = await authAPI(url, body, 'POST', false);
    if (response.error) {
        return {};
    } return response.data;
};

export const proceedSelfSuspend = async (body = { clientid: 'testclient' }) => {
    const url = `${process.env.server}/user/SelfSuspend`;
    let response = await authAPI(url, body, 'POST', false);
    return response;
};


export const fetchVerifyID = async (body = { clientid: 'testclient', status: 'check' }) => {
    const url = `${process.env.server}/user/getVerifyID`;

    let response = await authAPI(url, body, 'POST', false);
    return response;
};

export const getTodayTips = async () => {
    const url = `${process.env.server}/general/getTodayTips`;

    let response = await authAPI(url, {}, 'POST', false);
    return response;
};
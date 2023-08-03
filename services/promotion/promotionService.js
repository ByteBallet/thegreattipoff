import authAPI from '@Components/utils/authAPI';
import { useMobileDetect } from '@Components/utils/util';
import axios from 'axios';

export const getPromoSportMenu = async (user) => {
    const url = `${process.env.server}/bookmaker/PromoSportMenu`;
    const body = { clientid: user?.clientID };
    try {
        const response = await authAPI(
            url,
            body,
            'POST',
            true
        );
        if (response) {
            return response.data.sports;
        }
    } catch (error) {
        console.log('error---getPromoSportMenu', error);
    }
};

export const getPromoPageMenu = async (requestBody) => {
    const url = `${process.env.server}/bookmaker/PromoPageMenu`;

    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---getPromoPageMenu', error);
    }
};

export const getPromoEventMenu = async (requestBody) => {
    const url = `${process.env.server}/bookmaker/PromoEventMenu`;

    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---getPromoEventMenu', error);
    }
};

export const getPromoEventDetailMenu = async (requestBody) => {
    const url = `${process.env.server}/bookmaker/PromoEventDetailMenu `;

    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---getPromoEventDetailMenu ', error);
    }
};

export const savePromotion = async (header, token, requestBody) => {
    const url = `${process.env.server}/bookmaker/savePromotion`;
    const axiosConfig = {
        headers: {
            XAPIGTO: header,
            Authorization:
                'Bearer ' + token,
        },
    };
    try {
        const response = await axios.post(url, requestBody, axiosConfig);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---get savePrpmotion ', error);
    }
};

export const getActionDropDownValidation = (
    sport,
    page,
    event,
    eventDetails,
    buttonName
) => {
    let actioErrors = {};

    if (sport === '' || sport === null || sport === undefined) {
        actioErrors = { ...actioErrors, sport: 'sport' };
    }
    if (page === '' || page === null || page === undefined) {
        actioErrors = { ...actioErrors, page: 'page' };
    }
    if (event === '' || event === null || event === undefined) {
        actioErrors = { ...actioErrors, event: 'event' };
    }
    if (
        eventDetails === '' ||
        eventDetails === null ||
        eventDetails === undefined
    ) {
        actioErrors = { ...actioErrors, eventDetails: 'eventDetails' };
    }
    if (buttonName === '' || buttonName === null || buttonName === undefined) {
        actioErrors = { ...actioErrors, buttonName: 'buttonName' };
    }

    return actioErrors;
};

export const getTrendingDropDownValidation = (
    sport,
    page,
    event,
    eventDetails
) => {
    let actioErrors = {};

    if (sport === '' || sport === null || sport === undefined) {
        actioErrors = { ...actioErrors, sport: 'Sport' };
    }
    if (page === '' || page === null || page === undefined) {
        actioErrors = { ...actioErrors, page: 'Page' };
    }
    if (event === '' || event === null || event === undefined) {
        actioErrors = { ...actioErrors, event: 'Event' };
    }
    if (
        eventDetails === '' ||
        eventDetails === null ||
        eventDetails === undefined
    ) {
        actioErrors = { ...actioErrors, eventDetails: 'Event Details' };
    }
    return actioErrors;
};

export const getImageDataValidation = (
    mobileBannerFile,
    desktopBannerFile,
    splashAdFile
) => {
    if (mobileBannerFile || desktopBannerFile || splashAdFile) {
        return true;
    } else {
        return false;
    }
};

export const getBookiePromo = async (requestBody) => {
    const url = `${process.env.server}/bookmaker/getBookiePromo `;

    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---getgetBookiePromo ', error);
    }
};

export const updatePromoReview = async (requestBody) => {
    const url = `${process.env.server}/bookmaker/updatePromoReview `;

    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
        }
    } catch (error) {
        console.log('error---getupdatePromoReview ', error);
    }
};

export const updatePromoStatus = async (promoid, setstatus) => {
    const requestBody = {
        clientid: 'testclient',
        promoid: promoid,
        setstatus: setstatus,
    };
    const url = `${process.env.server}/bookmaker/updatePromoStatus`;

    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
        }
    } catch (error) {
        console.log('error---updatePromoStatus', error);
    }
};

export const updatePromotion = async (header, token, requestBody) => {
    const url = `${process.env.server}/bookmaker/updatePromotion`;
    const axiosConfig = {
        headers: {
            XAPIGTO: header,
            Authorization:
                'Bearer ' + token,
        },
    };
    try {
        const response = await axios.post(url, requestBody, axiosConfig);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---get updatePromotion ', error);
    }
};

export const sendReNotify = async (promoid) => {
    const requestBody = {
        clientid: 'testclient',
        promoid: promoid,
    };
    const url = `${process.env.server}/bookmaker/reNotify`;
    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
        }
    } catch (error) {
        console.log('error---sendReNotify', error);
    }
};

export const promotionApprover = async (promoid, approver, status) => {
    const requestBody = {
        clientid: 'testclient',
        promoid: promoid,
        approver: approver,
        status: status,
    };
    const url = `${process.env.server}/bookmaker/approvepromo`;
    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('error---promotionApprover', error);
    }
};

export const updateReviewPromo = async (promoid, approver, field) => {
    const requestBody = {
        clientid: 'testclient',
        promoid: promoid,
        approver: approver,
        field: field,
    };
    const url = `${process.env.server}/bookmaker/reviewpromo`;
    try {
        const response = await authAPI(
            url,
            requestBody,
            'POST',
            true
        );
        if (response) {
        }
    } catch (error) {
        console.log('error---reviewpromo', error);
    }
};

export const getPromotions = async (
    promo,
    clientid,
    page,
    id = 0,
    eventid = '',
    placement = ''
) => {
    let device = useMobileDetect();
    const body = {
        clientid: clientid,
        page: page,
        id: id,
        eventid: eventid,
        placement: placement,
        device,
        promo,
    };
    const url = `${process.env.server}/promotions/getPromotions`;
    const response = await authAPI(
        url,
        body,
        'POST',
        clientid != '' ? true : false
    );
    return response;
};

export const getPromotionsUrl = async (promo, clientid, type, eventid = '') => {
    let device = useMobileDetect();
    const body = {
        clientid: clientid,
        type: type,
        eventid: eventid,
        device,
        promo,
    };
    const url = `${process.env.server}/promotions/getPromotionsUrl`;
    const response = await authAPI(
        url,
        body,
        'POST',
        clientid != '' ? true : false
    );
    return response;
};

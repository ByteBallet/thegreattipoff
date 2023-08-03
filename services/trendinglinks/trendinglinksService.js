import axios from 'axios';

const axiosConfig = {
    headers: {
        XAPIGTO: 'EB',
        Authorization: '',
    },
};

export const getAllTrendinglinks = async (user) => {
    const url = `${process.env.server}/bookmaker/getAllTrendinglinks`;
    const body = { clientid: user?.clientID };
    axiosConfig.Authorization = `Bearer ${user?.accesstoken}`;

    try {
        const response = await axios.post(url, body, axiosConfig);
        if (response) {
            console.log('getAllTrendinglinks------', response.data);
            return response.data;
        }
    } catch (error) {
        console.log('error---getAllTrendinglinks', error);
    }
};

export const getPromoContent = async (user) => {
    const url = `${process.env.server}/bookmaker/getPromoContent`;
    const body = { clientid: user?.clientID };
    axiosConfig.Authorization = `Bearer ${user?.accesstoken}`;

    try {
        const response = await axios.post(url, body, axiosConfig);
        if (response) {
            console.log('yy----session', response.data);
            return response.data;
        }
    } catch (error) {
        console.log('error---getPromoContent', error);
    }
};

export const insertPromoContent = async (requestBody, user) => {
    const url = `${process.env.server}/bookmaker/insertPromoContent`;
    axiosConfig.Authorization = `Bearer ${user?.accesstoken}`;

    try {
        const response = await axios.post(url, requestBody, axiosConfig);
        if (response) {
            console.log('/insertPromoContent', response.data);
            return response.data;
        }
    } catch (error) {
        console.log('error---insertPromoContent', error);
    }
};

export const updatePromoArchive = async (requestBody, user) => {
    const url = `${process.env.server}/bookmaker/updatePromoArchive`;
    axiosConfig.Authorization = `Bearer ${user?.accesstoken}`;
    try {
        const response = await axios.post(url, requestBody, axiosConfig);
        if (response) {
            console.log('updatePromoArchive', response.data);
            return response.data;
        }
    } catch (error) {
        console.log('error---updatePromoArchive ', error);
    }
};


export const updateTrendingOrder = async (user, orderedData) => {
    const url = `${process.env.server}/promotions/updatetrendingorder`;
    const body = { clientid: user?.clientID, orderedData };
    axiosConfig.Authorization = `Bearer ${user?.accesstoken}`;

    try {
        const response = await axios.post(url, body, axiosConfig);
        if (response) {
            console.log(' updateTrendingOrder-------', response.data);
            return response.data;
        }
    } catch (error) {
        console.log('error--- updateTrendingOrder-', error);
    }
};
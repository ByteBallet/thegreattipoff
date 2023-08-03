import axios from 'axios';

const axiosConfig = {
    headers: {
        XAPIGTO: 'EB',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMjA5NSIsImNsaWVudGlkIjoiWjladzdPcjlKaDN0QVoyYk9nWjE0a1lUUE9id29jVG15NlclMkZ3V3paT3Q0R2tQOWpscFdMMGx4ZWl0TVlrUnVhIiwidGlkIjoiRUIiLCJ0aW1lX3N0YW1wIjoxNjQ1MTM4MjA2LCJqdGkiOiI2MkNCQjBDNC0wMkMyLTc3MTMtRjkyNDA0OEE5REM5RjQ4NiIsImlhdCI6MTY0NTEzODIwNiwiZXhwIjoxNjQ1MTM5MTA2fQ.xPRsHv6y7ClZS742RW8JwsWoSYUaScrgAZBBLW3iV2E',
    },
};

export const getHelpContent = async (pageTitle) => {
    const url = `${process.env.server}/bookmaker/getBookieContent`;
    const body = { page: pageTitle };

    if (body) {
        try {
            const response = await axios.post(url, body, axiosConfig);
            return response;
        } catch (error) {
            return null;
        }
    }
};

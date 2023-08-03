import axios from 'axios';
import moment from 'moment';

import {
    All_CODES_DICTIONARY,
    BANKING_TYPE_DICTIONARY,
    NEXT_UPS_DICTIONARY,
    RESULT_TYPE_DICTIONARY,
    TRANSACTIONS_ROUTE_TYPE,
} from '@lib/constants';

const axiosConfig = {
    headers: {
        XAPIGTO: 'EB',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMjA5NSIsImNsaWVudGlkIjoiWjladzdPcjlKaDN0QVoyYk9nWjE0a1lUUE9id29jVG15NlclMkZ3V3paT3Q0R2tQOWpscFdMMGx4ZWl0TVlrUnVhIiwidGlkIjoiRUIiLCJ0aW1lX3N0YW1wIjoxNjQ1MTM4MjA2LCJqdGkiOiI2MkNCQjBDNC0wMkMyLTc3MTMtRjkyNDA0OEE5REM5RjQ4NiIsImlhdCI6MTY0NTEzODIwNiwiZXhwIjoxNjQ1MTM5MTA2fQ.xPRsHv6y7ClZS742RW8JwsWoSYUaScrgAZBBLW3iV2E',
    },
};

export const getTransHist = async (
    userid,
    filter,
    sortorder,
    trantype,
    resultTime,
    resultType,
    bankingType,
    clientID,
    page = 1
) => {
    const url = `${process.env.server}/bookietranshist/getTransHist`;
    let body = null;

    const date = new Date();
    const dateValue = date.setDate(date.getDate() - resultTime);
    const time = moment(dateValue).format('YYYY-MM-DD');

    if (trantype === TRANSACTIONS_ROUTE_TYPE.pendingBets) {
        body = {
            userid: userid,
            clientid: clientID,
            trantype: 'Pending',
            filter: All_CODES_DICTIONARY[filter],
            sortorder: NEXT_UPS_DICTIONARY[sortorder],
            startfromid: '',
            page,
        };
    } else if (trantype === TRANSACTIONS_ROUTE_TYPE.resultedBets) {
        body = {
            userid: userid,
            clientid: clientID,
            trantype: 'Final',
            filter: All_CODES_DICTIONARY[filter],
            time,
            resulttype: RESULT_TYPE_DICTIONARY[resultType],
            nrecs: 20,
            startfromid: '',
            page,
        };
    } else if (trantype === TRANSACTIONS_ROUTE_TYPE.banking) {
        body = {
            userid: userid,
            clientid: clientID,
            trantype: 'Banking',
            filter: BANKING_TYPE_DICTIONARY[bankingType],
            time,
            resulttype: 'All',
            nrecs: 20,
            startfromid: '',
            page,
        };
    }

    console.log('Body is', body);

    if (body) {
        try {
            const response = await axios.post(url, body, axiosConfig);
            console.log('response----', response?.data?.trandetail?.totalrecs);
            return {
                data: response?.data?.trandetail?.htrns,
                total: response?.data?.trandetail?.totalrecs,
            };
        } catch (error) {
            console.log('error---getTransHist', error);
        }
    }
};

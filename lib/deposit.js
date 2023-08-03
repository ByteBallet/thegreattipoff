import authAPI from '../components/utils/authAPI';

export const proceedBankCreditCardRegister = async (body) => {
    const url = `${process.env.server}/banking/ccregister`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const polliSubmit = async (body, url) => {
    const response = await authAPI(url, body, 'POST', false);
    return response;
};

export const proceedBankCreditCardDeposit = async (body) => {
    const url = `${process.env.server}/banking/CCDeposit`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedBankCreditCardUnregister = async (body) => {
    const url = `${process.env.server}/banking/CCUnregister`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const fetchBankCreditCards = async (body) => {
    const url = `${process.env.server}/banking/creditcards`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedBankCreditCardUpdate = async (body) => {
    const url = `${process.env.server}/banking/CCUpdate`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedBankAccountAdd = async (body) => {
    const url = `${process.env.server}/banking/bankRegister`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const fetchBankEFTDeposit = async (body) => {
    const url = `${process.env.server}/banking/eftdeposit`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const fetchBankingClientEFT = async (body) => {
    const url = `${process.env.server}/banking/getClientEFT`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedBankingEFTDeposit = async (body) => {
    const url = `${process.env.server}/banking/eftdeposit`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedBankingPoliDeposit = async (body) => {
    const url = `${process.env.server}/banking/polideposit`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const fetchBankingPoliComplete = async (body) => {
    const url = `${process.env.server}/banking/policomplete`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

//2022.05.02. Sergey
export const fetchBankingWithdrawStatus = async (body) => {
    const url = `${process.env.server}/banking/withdrawstatus`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedCreditCardVerify = async (body) => {
    const url = `${process.env.server}/banking/ccverify`;

    const response = await authAPI(url, body, 'POST', true);
    return response;
};

export const proceedBankingWithdraw = async (body) => {
    const url = `${process.env.server}/banking/withdraw`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const fetchBankAccounts = async (body) => {
    const url = `${process.env.server}/banking/getBankaccounts`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const proceedWithdrawUpdate = async (body) => {
    const url = `${process.env.server}/banking/withdrawupdate`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

export const fetchCheckSuccess = async (body) => {
    const url = `${process.env.server}/banking/ccsuccess`;

    const response = await authAPI(url, body, 'POST', true);

    return response;
};

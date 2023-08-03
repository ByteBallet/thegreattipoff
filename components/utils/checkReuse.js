import authAPI from "./authAPI";

export default async function checkReuse(bets, clientid) {
    let res = bets
    const url = `${process.env.server}/betslip/checkReuse`;
    const body = {
        bets: bets,
        clientid: clientid,
    };

    const response = await authAPI(url, body, "POST", clientid ? true : false);
    if (response) {
        if (!response.error) {
            res = response.data.bets
        }
    }
    return res
}
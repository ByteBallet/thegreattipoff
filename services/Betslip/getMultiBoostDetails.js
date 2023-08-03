import authAPI from "@Components/utils/authAPI";

export default async function getMultiBoostDetails(tip, clientid, boostBal, chkStatus) {
    let res = {}
    if (boostBal > 0 || chkStatus) {
        const url = `${process.env.server}/betslip/verifybet`;
        let bets = {
            singles: [],
            multi: tip,
            Trifecta: [],
            Quinella: [],
            Exacta: [],
            Quaddie: [],
            First4: [],
            sgm: [],
        }
        const body = {
            bets: bets,
            clientid: clientid,
            isBoost: true,
            isMulti: true,
        };
        const response = await authAPI(url, body, "POST", clientid ? true : false);
        if (response) {
            if (!response.error) {
                res.boost = response.data.boost
                res.multierror = response.data.multierror
            }

        }
    }
    return res
}
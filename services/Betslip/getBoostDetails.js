import authAPI from "@Components/utils/authAPI";

export default async function getBoostDetails(tip, clientid, boostBal, chkStatus) {
    let boost = {}
    if (boostBal > 0 || chkStatus) {
        const url = `${process.env.server}/betslip/verifybet`;
        let bets = {
            singles: [tip],
            multi: [],
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
            isBoost: true
        };
        const response = await authAPI(url, body, "POST", true);
        if (response) {
            if (!response.error) {
                boost = response.data.boost
            }

        }
    }
    return boost
}
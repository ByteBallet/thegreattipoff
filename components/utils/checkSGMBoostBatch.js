import checkSGMBoost from "./checkSGMBoost";

async function getDetails(bet, clientid, boostBal) {
    let resp = {}
    if (!Object.values(bet)[0].boostAvailable) {
        const res = await checkSGMBoost(Object.values(bet), clientid, boostBal, true, Object.values(bet)[0].price)
        let eventid = Object.keys(bet)[0]
        resp[eventid] = res[0]
    } else {
        resp = bet
    }
    return resp
}

export default async function checkSGMBoostBatch(sgm, clientid, boostBal) {
    const promises = sgm.map(async (bet) => {
        return await getDetails(bet, clientid, boostBal)
    });
    return Promise.all(promises);
}
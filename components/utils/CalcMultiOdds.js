import getMultiBoostDetails from "@services/Betslip/getMultiBoostDetails";
import GetMultiCombos from './GetMultiCombos';

async function getDetails(singles, clientid, boostBal, eventid) {
    let multi = [{
        singles: singles,
        combos: GetMultiCombos(0),
        legs: 0,
        stake: "",
        price: "",
        hasTote: false,
        isBonusBet: false,
        isBoost: false,
        boostAvailable: false,
        boost: {},
        sgm: true,
        betID: ""
    }]
    const res = await getMultiBoostDetails(multi, clientid, boostBal, true);
    let resp = {}
    resp.id = eventid
    resp.odds = res.multierror ? res.multierror.multidiv ? res.multierror.multidiv : 0 : 0
    return resp
}

export default async function CalcMultiOdds(singles, clientid, boostBal) {
    const promises = Object.keys(singles).map(async (key) => {
        return await getDetails(singles[key], clientid, boostBal, key)
    });
    return Promise.all(promises);
}
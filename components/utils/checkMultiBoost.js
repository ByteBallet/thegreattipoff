import getMultiBoostDetails from "@services/Betslip/getMultiBoostDetails";

export default async function checkMultiBoost(multi, clientid, boostBal, reset) {
    if (multi && multi[0].legs > 1) {
        const res = await getMultiBoostDetails(multi, clientid, boostBal, reset);
        if (res && Object.keys(res).length > 0) {
            if (res?.boost?.legstatuscode == "0" || res?.boost?.legstatuscode == 0) {
                multi[0].boost.boostPrice = res.boost.boostdiv > 5000 ? 5000 : res.boost.boostdiv
                multi[0].boost.boostMode = res.boost.boostmode
                multi[0].boost.betPrice = res.boost.currentprice > 5000 ? 5000 : res.boost.currentprice
                multi[0].boost.maxBoostStake = res.boost.maxstake
                multi[0].boostAvailable = true
                multi[0].boost.legerror = false
            } else if (res?.boost?.legstatuscode == 307 || res?.boost?.legstatuscode == 352 || res?.boost?.legstatuscode == 353) {
                multi[0].boostAvailable = false
                multi[0].boost.legerror = true
            }
            else {
                multi[0].boostAvailable = false
                multi[0].boost.legerror = false
            }
            if (res.multierror && res.multierror.errocode == 99) {
                multi[0].sportConflict = true
            } else {
                multi[0].sportConflict = false
            }
            //update boost
            multi[0].isBoost = multi[0].boostAvailable ? multi[0].isBoost : false
            if (multi[0].boostAvailable && multi[0].isBoost) {
                multi[0].price = multi[0].price == "TBD" ? multi[0].price : multi[0].boost.boostPrice
            } else if (res.multierror && res.multierror.multidiv) {
                //multi[0].price = multi[0].price == "TBD" ? multi[0].price : res.multierror.multidiv
            }
        } else {
            multi[0].boostAvailable = false
            multi[0].isBoost = multi[0].boostAvailable ? multi[0].isBoost : false
            multi[0].price = multi[0].price == "TBD" ? multi[0].price : multi[0].boostAvailable && multi[0].isBoost ? multi[0].boost.boostPrice : multi[0].price
            multi[0].price = (multi[0].price > 5000 && multi[0].price != "TBD") ? 5000 : multi[0].price
        }
    }
    return multi
}
import GetMultiCombos from './GetMultiCombos';

export default function CheckSGMMultiCominations(singleBets, clientid, boostBal, reset, betID, odds, desc, compName) {
    let multiRaces = []
    let legs = 0
    let singles = []
    let init_multi = [{
        singles: [],
        combos: {},
        legs: 0,
        stake: "",
        price: "",
        hasTote: false,
        isBonusBet: false,
        isBoost: false,
        boostAvailable: false,
        boost: {},
        sgm: true,
        betID: "",
        eventdesc: "",
        compName: ""
    }]
    //max legs 10 in multi
    if (singleBets.length > 10) {
        singleBets = singleBets.slice(0, 10)
    }
    let multi = init_multi
    legs = singleBets.length
    multi[0].combos = GetMultiCombos(0)
    multi[0].eventdesc = desc
    multi[0].compName = compName
    if (legs > 1) {
        let selectedSinglesId = []
        singleBets.map((item) => {
            let leg = {
                eventId: "",
                competitorId: "",
                bookieeventid: "",
                betID: "",
                betType: "",
                price: "",
                stype: "",
                sportType: "",
                fieldName: "",
                eventname: ""
            }
            leg.eventId = item.eventId
            leg.competitorId = item.competitorId
            leg.betID = item.betID
            leg.betType = item.betType
            //if boost, consider actual price for multis
            leg.price = item.isBoost ? item.betPrice : item.price
            leg.stype = item.stype
            leg.bookieeventid = item.bookieeventid
            leg.sportType = item.sportType
            leg.fieldName = item.fieldName
            leg.eventname = item.eventname
            selectedSinglesId.push(leg)
        })
        multi[0].singles = selectedSinglesId
        multi[0].legs = legs
        multi[0].price = odds
        multi[0].betID = betID
    }
    return multi
}




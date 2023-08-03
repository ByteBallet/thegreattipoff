import React from 'react';
import { groupByKey } from './util';
import GetMultiCombos from './GetMultiCombos';
import CalcMultiOdds from './CalcMultiOdds';

const getSingleStructure = (singles) => {
    let selectedSinglesId = []
    singles.map((item) => {
        let leg = {
            eventId: "",
            competitorId: "",
            bookieeventid: "",
            betID: "",
            betType: "",
            price: "",
            stype: "",
            sportType: "",
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
        selectedSinglesId.push(leg)
    })
    return selectedSinglesId
}

export default async function CheckMultiCominations(betslipSingles, clientid, boostBal, reset) {
    let init_multi = [{
        singles: [],
        doubles: { stake: "", totalstake: "" },
        trebles: { stake: "", totalstake: "" },
        four: { stake: "", totalstake: "" },
        five: { stake: "", totalstake: "" },
        combos: {},
        legs: 0,
        stake: "",
        price: "",
        hasTote: false,
        isBonusBet: false,
        isBoost: false,
        sameRaceMulti: false,
        boostAvailable: false,
        boost: {},
        sgm: "",
        sportConflict: false,
        sgmOdds: []
    }]
    let legs = 0
    let singles = []
    let sameRaceMulti = false
    let sportConflict = false
    let price = 0
    //check if multis exists
    let multi = localStorage.getItem("multi") ? JSON.parse(localStorage.getItem("multi")) : init_multi
    singles = betslipSingles ? betslipSingles.length > 0 ? betslipSingles.filter((leg) => leg.productGroupType.toLowerCase().indexOf("eachway") == -1) : [] : []
    singles = singles.filter((leg) => !leg.isJC)

    if (multi.length > 0 && (singles.length != multi[0].legs || reset)) {
        //initialise multi if singles count change
        multi = init_multi
    }
    //max legs 10 in multi
    if (singles.length > 10) {
        singles = singles.slice(0, 10)
    }
    let grpBySingles = singles ? groupByKey(singles, 'eventId') : []
    let singlesObj = []
    let singlesGrpObj = {}
    let multiSingles = []
    let chkParlay = true
    Object.keys(grpBySingles).map((key, idx) => {
        if (!sameRaceMulti && !sportConflict) {
            //chk racing legs from same event
            if (key.indexOf("R") > -1) {
                if (grpBySingles[key].length > 1) {
                    sameRaceMulti = true
                } else {
                    singlesObj = [...singlesObj, ...getSingleStructure(grpBySingles[key])]
                    multiSingles = [...multiSingles, ...getSingleStructure(grpBySingles[key])]
                }
            } else {
                let sgmlegs = grpBySingles[key].filter((tip) => tip.isSGM)
                let nonsgmlegs = grpBySingles[key].filter((tip) => !tip.isSGM)
                if (sgmlegs.length > 0 && nonsgmlegs.length > 0) {
                    sportConflict = true
                } else if (grpBySingles[key].length == 1) {
                    singlesObj = [...singlesObj, ...getSingleStructure(grpBySingles[key])]
                    multiSingles = [...multiSingles, ...getSingleStructure(grpBySingles[key])]
                } else if (grpBySingles[key].length > 1) {
                    singlesGrpObj[key] = getSingleStructure(grpBySingles[key])
                    multiSingles = [...multiSingles, ...getSingleStructure(grpBySingles[key])]
                    // no parlays when multiple legs in same event
                    chkParlay && (chkParlay = false)
                }
            }
        }
    })
    if (singles.length > 1 && !sameRaceMulti && !sportConflict) {
        let getTotes = singles.filter((bet) => bet.productGroupType.toLowerCase() != "fixed")
        multi[0].singles = multiSingles
        multi[0].legs = multiSingles.length
        multi[0].hasTote = getTotes.length > 0
        multi[0].sgmOdds = await CalcMultiOdds(singlesGrpObj, clientid, boostBal)
        if (getTotes.length > 0) {
            price = "TBD"
        } else {
            price = singlesObj.reduce(function (prev, current) {
                return prev * +current.price
            }, 1);
            price = price * multi[0].sgmOdds.reduce(function (prev, current) {
                return prev * +current.odds
            }, 1);
            price = price > 5000 ? 5000 : price
        }
    } else {
        multi[0].singles = []
        multi[0].legs = 0
    }
    multi[0].price = price
    multi[0].combos = chkParlay ? GetMultiCombos(multi[0].legs) : GetMultiCombos(0)
    multi[0].sameRaceMulti = sameRaceMulti
    multi[0].sportConflict = sportConflict
    return multi
}




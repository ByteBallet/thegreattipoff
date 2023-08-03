import Singles from "@Models/Tip/Singles";
//Get Singles Id

export const getBetID = (bet) => {
    return `${bet.eventId}_${bet.competitorId}_${bet.product}_${bet.betType == null ? "win" : bet.betType.toLowerCase()}_${bet.productGroupType ? bet.productGroupType.toLowerCase() : "fixed"}`;
}

export const getSinglesBetID = (bet) => {
    return `${bet.eventId}_${bet.competitorId}_${bet.betID}`;
}

export const getPackageID = (bet) => {
    return `${bet.packid}_${bet.userid}`;
}

export const getSinglesSGMID = (bet) => {
    return `${bet.eventId}_${bet.competitorId}_${bet.betType == null ? "win" : bet.betType.toLowerCase()}`;
}

//Get Exotics Id
export const getExoticID = (bet) => {
    let data = Object.values(bet)[0];
    let exoticID = Object.keys(bet)[0] + "_" + data.betID;
    return exoticID
}

//Get SGM Id
export const getSGMID = (bet) => {
    let data = Object.values(bet)[0][0];
    let exoticID = Object.keys(bet)[0] + "_" + data.betID;
    return exoticID
}


export const getOddsValues = (raceField, isWin, productGroupType) => {
    let price = 0;
    let stype = "";
    let btype = "";
    if (isWin) {
        let win = raceField.sprices[productGroupType] ?
            raceField.sprices[productGroupType].filter(obj => obj && obj.BTYPE === 'Win') : [];
        price = win.length > 0 ? win[0].PRICE : 0
        stype = win.length > 0 ? win[0].STYPE : ""
        btype = win.length > 0 ? win[0].BTYPE : ""
    } else {
        let place = raceField.sprices[productGroupType] ? raceField.sprices[productGroupType].filter(obj => obj && obj.BTYPE === 'Place') : []
        price = place.length > 0 ? place[0].PRICE : 0
        stype = place.length > 0 ? place[0].STYPE : ""
        btype = place.length > 0 ? place[0].BTYPE : ""
    }
    return price + "_" + stype + "_" + btype
}

export const getOddsPrices = (raceField, isWin, productGroupType) => {
    let price = 0;
    if (raceField.sprices) {
        if (isWin) {
            let win = raceField.sprices[productGroupType] ?
                raceField.sprices[productGroupType].filter(obj => obj && obj.BTYPE === 'Win') : [];
            price = win.length > 0 ? win[0].PRICE : 0
        } else {
            let place = raceField.sprices[productGroupType] ? raceField.sprices[productGroupType].filter(obj => obj && obj.BTYPE === 'Place') : []
            price = place.length > 0 ? place[0].PRICE : 0
        }
    } else {
        if (isWin) {
            let win = raceField.SPRICES[productGroupType] ?
                raceField.SPRICES[productGroupType].filter(obj => obj && obj.BTYPE === 'Win') : [];
            price = win.length > 0 ? win[0].PRICE : 0;
        } else {
            let place = raceField.SPRICES[productGroupType] ? raceField.SPRICES[productGroupType].filter(obj => obj && obj.BTYPE === 'Place') : []
            price = place.length > 0 ? place[0].PRICE : 0
        }
    }
    return price
}

export const serializeValues = (tip) => {
    return {
        raceid: tip.eventId,
        bookieeventid: tip.bookieeventid,
        actualcode: tip.competitorId,
        product: tip.product,
        betType: tip.betType,
        racedate: tip.racedate,
        fieldNum: tip.fieldNum,
        fieldName: tip.fieldName,
        sportType: tip.sportType,
        eventType: tip.eventType,
        subEventType: tip.subEventType,
        utcTime: tip.utcTime,
        location: tip.location,
        price: tip.price,
        racenum: tip.racenum,
        silk: tip.silk,
        barrier: tip.barrier,
        eventname: tip.eventname,
        stake: tip.stake,
        comments: tip.comments,
        disableBet: tip.disableBet,
        stype: tip.stype,
        betproducts: tip.betproducts,
        productGroupType: tip.productGroupType,
        betID: tip.betID,
        isEachWay: tip.isEachWay,
        isJC: tip.isJC,
        isBonusBet: tip.isBonusBet,
        isBoost: tip.isBoost,
        boostMode: tip.boostMode,
        betPrice: tip.betPrice,
        boostAvailable: tip.boostAvailable,
        boostPrice: tip.boostPrice,
        maxBoostStake: tip.maxBoostStake,
        legerror: tip.legerror,
        multiError: tip.multiError,
        isSGM: tip.isSGM,
        hotbet: tip.hotbet,
        specials: tip.specials,
        sprices: tip.sprices,
    };
}


export function loadSinglesFromLocal() {
    let s = localStorage.getItem("singles");
    if (s) {
        let singleArr = [];
        let stips = JSON.parse(s);
        stips.length > 0 && stips.forEach((e) => {
            singleArr.push(
                new Singles(
                    e.raceid,
                    e.bookieeventid,
                    e.actualcode,
                    e.product,
                    e.betType,
                    e.racedate,
                    e.fieldNum,
                    e.fieldName,
                    e.sportType,
                    e.eventType,
                    e.subEventType,
                    e.utcTime,
                    e.location,
                    e.price,
                    e.racenum,
                    e.silk,
                    e.barrier,
                    e.eventname,
                    e.stake,
                    e.comments,
                    e.disableBet,
                    e.stype,
                    e.betproducts,
                    e.productGroupType,
                    e.betID,
                    e.isEachWay,
                    e.isJC,
                    e.isBonusBet,
                    e.isBoost,
                    e.boostMode,
                    e.betPrice,
                    e.boostAvailable,
                    e.boostPrice,
                    e.maxBoostStake,
                    e.legerror,
                    e.multiError,
                    e.isSGM,
                    e.hotbet,
                    e.specials,
                    e.sprices
                )
            );
        });

        return singleArr
    }
}

export function loadCartFromLocal() {
    let s = localStorage.getItem("tippackages");
    if (s) {
        let stips = JSON.parse(s);
        return stips?.['packages']
    }
}

export function validateStake(val) {
    let arr = val.split(".")
    let num = ""
    let decimal = ""
    if (arr.length > 1) {
        num = arr[0].substring(0, 6)
        decimal = "." + arr[1].substring(0, 2)
    } else {
        num = arr[0].substring(0, 6)
    }
    return num + decimal
}

export function getRaceCode(val) {
    let rcode = "R"
    if (val == "harness") {
        rcode = "H"
    } else if (val == "greyhound") {
        rcode = "G"
    }
    return rcode
}

export function getRaceType(val) {
    let rcode = []
    val.filter((item, idx) => {
        let rtype = item?.trim()
        if (rtype == "R") {
            rcode.push("Horse Racing")
        } else if (rtype == "G") {
            rcode.push("Greyhounds")
        }
        else if (rtype == "H") {
            rcode.push("Harness")
        }
    })
    return rcode?.sort()?.reverse()?.join(", ")
}

export const getRacingTabs = () => {
    let tabs = [
        {
            label: 'Win / Place',
            value: 0
        },
        {
            label: 'Quinella',
            value: 1
        },
        {
            label: 'Exacta',
            value: 2
        },
        {
            label: 'HOT Bets',
            value: 3
        },
        {
            label: 'Trifecta',
            value: 4
        },
        {
            label: 'Quaddie',
            value: 5
        },
        {
            label: 'First 4',
            value: 6
        }
    ]
    return tabs
}

export const getRacingActiveTab = (label) => {
    let tabs = getRacingTabs()
    let idx = tabs.filter((item) => item.label == label)?.map((item) => item.value)?.[0]
    return (idx || 0)
}

export const getPackDay = (day) => {
    let label = (day == 0) ? "All Tipping Days" : "Saturday Tips only"
    return label
}

export const getLink = (selectedType, isMarket = false, isTrack = false, path = '/') => {
    let pageLink = isMarket ? '/horse-racing-tips' : '/horse-racing-results';
    if (selectedType == 'H') {
        pageLink = isMarket ? '/harness-racing-tips' : '/harness-racing-results';
    } else if (selectedType == 'G') {
        pageLink = isMarket ? '/greyhound-racing-tips' : '/greyhound-racing-results';
    }
    return isTrack ? path : pageLink
}

export const getTitle = (selectedType, isMarket, isTrack, path) => {
    let pagePath = path?.split("/")
    let pageTitle = isMarket ? 'Horse Racing Tips' : 'Horse Racing Results';
    if (selectedType == 'H') {
        pageTitle = isMarket ? 'Harness Racing Tips' : 'Harness Racing Results';
    } else if (selectedType == 'G') {
        pageTitle = isMarket ? 'Greyhound Racing Tips' : 'Greyhound Racing Results';
    }
    return isTrack ? pagePath[pagePath?.length - 1]?.replace(/-/g, ' ') : pageTitle
}

export const getTrackname = (title) => {
    let idx = title.lastIndexOf(" ")
    let racemeet = title?.substring(0, idx)?.toLowerCase()?.replace(/ /g, '-')
    return racemeet
}

export const getMinTips = (period, isTrackSelected = false, isMarket = false, search = "") => {
    let tips = 1
    if (period == "-1" || period == "1") {
        tips = 1;
    } else if (period == "7") {
        if (isTrackSelected) {
            tips = 1;
        } else {
            tips = 5;
        }
    } else if (period == "30") {
        if (isTrackSelected) {
            tips = 5;
        } else {
            tips = 18;
        }
    } else if (period == "90") {
        if (isTrackSelected) {
            tips = 10;
        } else {
            tips = 35;
        }
    } else if (period == "180") {
        if (isTrackSelected) {
            tips = 15;
        } else {
            tips = 50;
        }
    } else if (period == "365") { //Year filter
        if (isTrackSelected) {
            tips = 25;
        } else {
            tips = 75;
        }
    } else if (period == "0") {
        if (isTrackSelected) {
            tips = 30;
        } else {
            tips = 100;
        }
    }
    //return (isMarket || search?.length > 0) ? 1 : tips
    return 1
}
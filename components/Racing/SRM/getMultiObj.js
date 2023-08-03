export function returnMultiObj(srmObj) {
    if (!srmObj) return null;

    let returnObj = { ...srmObj };

    let singles = [];
    Object.entries(srmObj.selections).forEach(([key, value]) => {
        value.map((s) => {
            let sObj = {
                eventId: srmObj.raceid,
                competitorId: s,
                bookieeventid: srmObj.raceid,
                betID: Date.now(),
                betType: 'AWin',
                price: '',
                stype: key,
                sportType: 'racing',
                fieldName: srmObj?.fieldnames[s] ?? '',
                eventname: srmObj.eventDesc,
            };
            singles = [...singles, sObj];
        });
    });

    returnObj.singles = singles;
    returnObj.combos = {
        doubles: 0,
        trebles: 0,
        four: 0,
        five: 0,
    };

    returnObj.legs = singles.length;
    returnObj.eventdesc = srmObj.eventDesc;
    returnObj.compName = `${singles.length}-Leg Same Race Multi`;
    returnObj.betID = srmObj.id;
    returnObj.hasTote = false;
    returnObj.sgm = false;
    returnObj.type = 'R';
    returnObj.racenum = 1;
    returnObj.sportConflict = false;

    return returnObj;
}

/* 
{
    "singles": [
        {
            "eventId": "25R2250142",
            "competitorId": 17755044,
            "bookieeventid": "2250142",
            "betID": 1674525139434,
            "betType": "Win",
            "price": "5.50",
            "stype": "FWIN",
            "sportType": "racing"
        },
        {
            "eventId": "25R2250143",
            "competitorId": 17755056,
            "bookieeventid": "2250143",
            "betID": 1674525145506,
            "betType": "Win",
            "price": "5.50",
            "stype": "BT3SP",
            "sportType": "racing"
        },
        {
            "eventId": "25R2250144",
            "competitorId": 17755066,
            "bookieeventid": "2250144",
            "betID": 1674525148706,
            "betType": "Win",
            "price": "4.00",
            "stype": "BT3SP",
            "sportType": "racing"
        }
    ],
    "doubles": {
        "stake": "",
        "totalstake": ""
    },
    "trebles": {
        "stake": "",
        "totalstake": ""
    },
    "four": {
        "stake": "",
        "totalstake": ""
    },
    "five": {
        "stake": "",
        "totalstake": ""
    },
    "combos": {
        "doubles": 3,
        "trebles": 0,
        "four": 0,
        "five": 0
    },
    "legs": 3,
    "stake": "",
    "price": "TBD",
    "hasTote": true,
    "isBonusBet": false,
    "isBoost": false,
    "sameRaceMulti": false,
    "boostAvailable": false,
    "boost": {
        "legerror": false
    },
    "sgm": "",
    "sportConflict": false,
    "sgmOdds": []
}
*/

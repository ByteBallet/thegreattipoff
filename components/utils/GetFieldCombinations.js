export default function GetFieldCombinations(tab, bets, isBoxed) {
    switch (tab) {
        case 'Quinella': {
            let q = getQuinellaCombinations(bets, isBoxed);
            return q;
        }
        case 'Trifecta': {
            let c = getTrifectaCombinations(bets);
            return c;
        }
        case 'Quaddie': {
            let d = getQuaddieCombinations(bets);
            return d;
        }
        case 'First4': {
            let f = getFirst4Combinations(bets);
            return f;
        }
        case 'Exacta': {
            let e = getExactaCombinations(bets);
            return e;
        }
        default:
            return 1;
    }
}

function getFirst4Combinations(bets) {
    let intCountFirst = 0;
    let intCountSecond = 0;
    let intCountThird = 0;
    let intCountFourth = 0;
    let intBetCount = 0;
    let arFirst = bets[1] ? bets[1] : [];
    let arSecond = bets[2] ? bets[2] : [];
    let arThird = bets[3] ? bets[3] : [];
    let arFourth = bets[4] ? bets[4] : [];
    //Loop through all 4 positions
    for (intCountFirst = 0; intCountFirst < arFirst.length; intCountFirst++) {
        for (
            intCountSecond = 0;
            intCountSecond < arSecond.length;
            intCountSecond++
        ) {
            for (
                intCountThird = 0;
                intCountThird < arThird.length;
                intCountThird++
            ) {
                for (
                    intCountFourth = 0;
                    intCountFourth < arFourth.length;
                    intCountFourth++
                ) {
                    //check if 1 position is not in all other positions
                    if (
                        arFirst[intCountFirst] != arSecond[intCountSecond] &&
                        arFirst[intCountFirst] != arThird[intCountThird] &&
                        arFirst[intCountFirst] != arFourth[intCountFourth]
                    ) {
                        //check if 2 position is not in 3,4 positions
                        if (
                            arSecond[intCountSecond] !=
                            arThird[intCountThird] &&
                            arSecond[intCountSecond] != arFourth[intCountFourth]
                        ) {
                            //check if 3 position is not in 4 position
                            if (
                                arThird[intCountThird] !=
                                arFourth[intCountFourth]
                            ) {
                                intBetCount = intBetCount + 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return intBetCount;
}

function getTrifectaCombinations(bets) {
    let f1 = bets[1] ? bets[1] : [];
    let f2 = bets[2] ? bets[2] : [];
    let f3 = bets[3] ? bets[3] : [];
    let x = f1.length;
    let y = f2.length;
    let z = f3.length;
    let xy = f1.filter((value) => f2.includes(value)).length;
    let yz = f2.filter((value) => f3.includes(value)).length;
    let xz = f1.filter((value) => f3.includes(value)).length;
    let data = [f1, f2, f3];
    let xyz = data.reduce((a, b) => a.filter((c) => b.includes(c))).length;
    let res = x * y * z - xy * z - xz * y - yz * x + 2 * xyz;
    return res;
}

function getExactaCombinations(bets) {
    let f1 = bets[1] ? bets[1] : [];
    let f2 = bets[2] ? bets[2] : [];
    let x = f1.length;
    let y = f2.length;
    let xy = f1.filter((value) => f2.includes(value)).length;
    let res = x * y - xy;
    return res;
}

function getQuinellaCombinations(bets, isBoxed) {
    let f1 = bets[1] ? bets[1] : [];
    let f2 = bets[2] ? bets[2] : [];
    let xy = f1.filter((value) => f2.includes(value)).length > 0 ? 1 : 0;
    if (isBoxed) {
        let x = f1.length;
        return (x * (x - 1)) / 2;
    } else {
        let res = f1.length > 0 ? f2.length - xy : 0;
        return res;
    }
}
function getQuaddieCombinations(bets) {
    if (Object.keys(bets) < 4) {
        return 0
    } else {
        let selections = Object.values(bets)
        let l1 = Object.values(selections[0])[0].length;
        let l2 = Object.values(selections[1])[0].length;
        let l3 = Object.values(selections[2])[0].length;
        let l4 = Object.values(selections[3])[0].length;
        return l1 * l2 * l3 * l4
    }
}

export default function GetMultiCombos(legs) {
    let val = "L" + legs
    let combos = {
        doubles: 0,
        trebles: 0,
        four: 0,
        five: 0
    }
    switch (val) {
        case 'L3': {
            combos.doubles = 3
            combos.trebles = 0
            combos.four = 0
            combos.five = 0
            return combos
        }
        case 'L4': {
            combos.doubles = 6
            combos.trebles = 4
            combos.four = 0
            combos.five = 0
            return combos
        }
        case 'L5': {
            combos.doubles = 10
            combos.trebles = 10
            combos.four = 5
            combos.five = 0
            return combos
        }
        case 'L6': {
            combos.doubles = 0
            combos.trebles = 0
            combos.four = 0
            combos.five = 6
            return combos
        }
        default:
            return combos
    }
}
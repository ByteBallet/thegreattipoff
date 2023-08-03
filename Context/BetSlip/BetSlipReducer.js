import { DISPATCH_TYPES } from "../TYPES";
import { getBetID, getExoticID, getSinglesBetID } from "@Components/utils/RacingUtil";


const BetSlipReducer = (state, action) => {
	switch (action.type) {
		case DISPATCH_TYPES.ADD_TIP: {
			return {
				...state,
				[action.payload.key]: [...state[action.payload.key], action.payload.tip],
			}
		}

		case DISPATCH_TYPES.REMOVE_TIP: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter((item) => getBetID(item) !== getBetID(action.payload.tip)),
				],
			}
		}

		case DISPATCH_TYPES.REMOVE_TIP_BETSLIP: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter((item) => getSinglesBetID(item) !== getSinglesBetID(action.payload.tip)),
				],
			}
		}

		case DISPATCH_TYPES.SET_INITIAL_STATE: {
			return {
				...state,
				[action.payload.key]: action.payload.data,
			}
		}

		case DISPATCH_TYPES.CLEAR_TIPS: {
			return {
				...state,
				[action.payload]: [],
			}
		}

		case DISPATCH_TYPES.UPDATE_TIP_DETAILS: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter(
						(item) => {
							if (getBetID(item) === getBetID(action.payload.tip)) {
								item[action.payload.field] = action.payload.value;
							}
							return item;
						})
				],
			}
		}
		//update fields of tip obj  
		case DISPATCH_TYPES.UPDATE_TIP_BETSLIP: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter(
						(item) => {
							if (getSinglesBetID(item) === getSinglesBetID(action.payload.tip)) {
								item[action.payload.field] = action.payload.value;
							}
							return item;
						})
				],
			}
		}
		//update whole tip obj with new 
		case DISPATCH_TYPES.UPDATE_TIP_DETAILS_BETSLIP: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].map(
						(item) => {
							return getSinglesBetID(item) === getSinglesBetID(action.payload.tip) ? { ...action.payload.tip } : item;
						})
				],
			}
		}

		case DISPATCH_TYPES.ADD_BET_BETSLIP: {
			return {
				...state,
				[action.payload.key]: [...state[action.payload.key], action.payload.bets]
			}
		}

		case DISPATCH_TYPES.UPDATE_EXOTIC_DETAILS: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter(
						(item) => {
							//check exotic fields
							if (getExoticID(item) == action.payload.exoticID) {
								Object.values(item)[0]["stake"] = action.payload.stake;
								Object.values(item)[0]["dividends"] = action.payload.div;
							}
							return item;
						})
				],
			}
		}

		case DISPATCH_TYPES.UPDATE_EXOTIC_BONUS: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter(
						(item) => {
							//check exotic fields
							if (getExoticID(item) == action.payload.exoticID) {
								Object.values(item)[0][action.payload.field] = action.payload.val;
							}
							return item;
						})
				],
			}
		}

		case DISPATCH_TYPES.REMOVE_EXOTIC_BET: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter((item) => getExoticID(item) !== action.payload.exoticID),
				],
			}
		}

		case DISPATCH_TYPES.UPDATE_MULTI_DETAILS: {
			return {
				...state,
				[action.payload.key]: [{
					...state[action.payload.key][0],
					[action.payload.field]: action.payload.value,
				}]
			}
		}

		case DISPATCH_TYPES.UPDATE_MULTI_COMBOS: {
			return {
				...state,
				[action.payload.key]: [{
					...state[action.payload.key][0],
					[action.payload.combotype]: {
						stake: action.payload.stake,
						totalstake: action.payload.totalstake,
					}
				}]
			}
		}

		case DISPATCH_TYPES.UPDATE_SGM_DETAILS: {
			return {
				...state,
				[action.payload.key]: [
					...state[action.payload.key].filter(
						(item) => {
							//check exotic fields
							if (getExoticID(item) == action.payload.sgmID) {
								Object.values(item)[0][action.payload.field] = action.payload.value;
							}
							return item;
						})
				],
			}
		}

		case DISPATCH_TYPES.UPDATE_CONTEXT_DATA: {
			return action.payload
		}

		default:
			return state;
	}
};

export default BetSlipReducer;

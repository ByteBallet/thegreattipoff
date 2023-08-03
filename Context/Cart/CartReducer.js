import { DISPATCH_TYPES } from "../TYPES";
import { getPackageID, getExoticID, getSinglesBetID } from "../../components/utils/RacingUtil";


const CartReducer = (state, action) => {
	switch (action.type) {
		case DISPATCH_TYPES.ADD_TIP: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload.key]: [...state.cartData[action.payload.key], action.payload.tip],
				},
			};
		}

		case DISPATCH_TYPES.REMOVE_TIP: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload.key]: [
						...state.cartData[action.payload.key].filter((item) => getPackageID(item) !== getPackageID(action.payload.tip)),
					],
				},
			};
		}


		case DISPATCH_TYPES.SET_INITIAL_STATE: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload.key]: action.payload.data,
				},
			};
		}

		case DISPATCH_TYPES.CLEAR_TIPS: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload]: [],
				},
			};
		}

		case DISPATCH_TYPES.UPDATE_TIP_DETAILS: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload.key]: [
						...state.cartData[action.payload.key].filter(
							(item) => {
								if (getPackageID(item) === getPackageID(action.payload.tip)) {
									item[action.payload.field] = action.payload.value;
								}
								return item;
							})
					],
				},
			};
		}
		//update fields of tip obj  
		case DISPATCH_TYPES.UPDATE_TIP_BETSLIP: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload.key]: [
						...state.cartData[action.payload.key].filter(
							(item) => {
								if (getSinglesBetID(item) === getSinglesBetID(action.payload.tip)) {
									item[action.payload.field] = action.payload.value;
								}
								return item;
							})
					],
				},
			};
		}

		case DISPATCH_TYPES.ADD_BET_BETSLIP: {
			return {
				...state,
				cartData: {
					...state.cartData,
					[action.payload.key]: [...state.cartData[action.payload.key], action.payload.bets]
				},
			};
		}

		case DISPATCH_TYPES.UPDATE_CONTEXT_DATA: {
			return {
				...state,
				cartData: action.payload,
			};
		}

		default:
			return state;
	}
};

export default CartReducer;

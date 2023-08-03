import { DISPATCH_TYPES } from '../TYPES';
import {
    getBetID,
    getExoticID,
    getSinglesBetID,
} from '../../components/utils/RacingUtil';

const TipReducer = (state, action) => {
    switch (action.type) {
        case DISPATCH_TYPES.ADD_TIP: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key],
                        action.payload.tip,
                    ],
                },
            };
        }

        case DISPATCH_TYPES.REMOVE_TIP: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) =>
                                getBetID(item) !== getBetID(action.payload.tip)
                        ),
                    ],
                },
            };
        }

        case DISPATCH_TYPES.REMOVE_TIP_BETSLIP: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) =>
                                getSinglesBetID(item) !==
                                getSinglesBetID(action.payload.tip)
                        ),
                    ],
                },
            };
        }

        case DISPATCH_TYPES.SET_INITIAL_STATE: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: action.payload.data,
                },
            };
        }

        case DISPATCH_TYPES.CLEAR_TIPS: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload]: [],
                },
            };
        }

        case DISPATCH_TYPES.UPDATE_TIP_DETAILS: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) => {
                                if (
                                    getBetID(item) ===
                                    getBetID(action.payload.tip)
                                ) {
                                    item[action.payload.field] =
                                        action.payload.value;
                                }
                                return item;
                            }
                        ),
                    ],
                },
            };
        }
        //update fields of tip obj
        case DISPATCH_TYPES.UPDATE_TIP_BETSLIP: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) => {
                                if (
                                    getSinglesBetID(item) ===
                                    getSinglesBetID(action.payload.tip)
                                ) {
                                    item[action.payload.field] =
                                        action.payload.value;
                                }
                                return item;
                            }
                        ),
                    ],
                },
            };
        }
        //update whole tip obj with new
        case DISPATCH_TYPES.UPDATE_TIP_DETAILS_BETSLIP: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].map((item) => {
                            return getSinglesBetID(item) ===
                                getSinglesBetID(action.payload.tip)
                                ? { ...action.payload.tip }
                                : item;
                        }),
                    ],
                },
            };
        }

        case DISPATCH_TYPES.ADD_BET_BETSLIP: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key],
                        action.payload.bets,
                    ],
                },
            };
        }

        case DISPATCH_TYPES.UPDATE_EXOTIC_DETAILS: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) => {
                                //check exotic fields
                                if (
                                    getExoticID(item) == action.payload.exoticID
                                ) {
                                    Object.values(item)[0]['stake'] =
                                        action.payload.stake;
                                    Object.values(item)[0]['dividends'] =
                                        action.payload.div;
                                }
                                return item;
                            }
                        ),
                    ],
                },
            };
        }

        case DISPATCH_TYPES.UPDATE_EXOTIC_BONUS: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) => {
                                //check exotic fields
                                if (
                                    getExoticID(item) == action.payload.exoticID
                                ) {
                                    Object.values(item)[0][
                                        action.payload.field
                                    ] = action.payload.val;
                                }
                                return item;
                            }
                        ),
                    ],
                },
            };
        }

        case DISPATCH_TYPES.REMOVE_EXOTIC_BET: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        ...state.betSlipData[action.payload.key].filter(
                            (item) =>
                                getExoticID(item) !== action.payload.exoticID
                        ),
                    ],
                },
            };
        }

        case DISPATCH_TYPES.UPDATE_MULTI_DETAILS: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        {
                            ...state.betSlipData[action.payload.key][0],
                            [action.payload.field]: action.payload.value,
                        },
                    ],
                },
            };
        }

        case DISPATCH_TYPES.UPDATE_MULTI_COMBOS: {
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                    [action.payload.key]: [
                        {
                            ...state.betSlipData[action.payload.key][0],
                            [action.payload.combotype]: {
                                stake: action.payload.stake,
                                totalstake: action.payload.totalstake,
                            },
                        },
                    ],
                },
            };
        }

        case DISPATCH_TYPES.UPDATE_CONTEXT_DATA: {
            return {
                ...state,
                betSlipData: action.payload,
            };
        }

        case DISPATCH_TYPES.UPDATE_SRM_DETAILS: {
            let srm = state.betSlipData.srm.find(
                (item) => item.id === action.payload.key
            );
            // this is the srm object to be updated
            return {
                ...state,
                betSlipData: {
                    ...state.betSlipData,
                },
            };
        }

        default:
            return state;
    }
};

export default TipReducer;

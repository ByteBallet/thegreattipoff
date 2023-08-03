import React, {
    createContext,
    useEffect,
    useMemo,
    useReducer,
    useContext,
} from 'react';
import BetSlipReducer from './BetSlipReducer';
import { DISPATCH_TYPES } from '../TYPES';
import saveTipsLocal from '@Components/utils/saveTipsLocal';
import CheckMultiCominations from '@Components/utils/CheckMultiCominations';
import { loadSinglesFromLocal } from '@Components/utils/RacingUtil';
import { UserContext } from '@Context/User/UserProvider';
import { TipContext } from '@Context/Tip/TipProvider';
import checkMultiBoost from '@Components/utils/checkMultiBoost';

const initialState = {
    singles: [],
    multi: [],
    Trifecta: [],
    Quinella: [],
    Exacta: [],
    Quaddie: [],
    First4: [],
    sgm: [],
    srm: [],
    hotbet: [],
};

export const BetSlipContext = createContext(initialState);

export const BetSlipProvider = ({ children }) => {
    const { tips } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [state, dispatch] = useReducer(BetSlipReducer, tips);

    const updateMultis = async (prevSinglesLen, multi, singles) => {
        if (multi && multi.length > 0) {
            if (
                prevSinglesLen != multi[0].singles.length &&
                singles.length > 1 &&
                multi &&
                user.clientID
            ) {
                // make boost call
                let res = await checkMultiBoost(
                    multi,
                    user.clientID ? user.clientID : '',
                    user.multiBoostBal,
                    true
                );
                res && loadMultis(res);
            } else {
                loadMultis(multi);
            }
        }
    };

    useEffect(() => {
        saveTipsLocal(state, 'singles');
        async function checkMulti() {
            //chk if multi has legstatus
            let prevSinglesLen = 0;
            let legstatus = false;
            if (state.multi && state.multi.length > 0) {
                prevSinglesLen = state.multi[0].singles.length;
                legstatus = state.multi[0].LEGSTATUS ? true : false;
            }
            if (!legstatus) {
                let multi = await CheckMultiCominations(
                    state.singles,
                    user.clientID ? user.clientID : '',
                    user.multiBoostBal,
                    false
                );
                multi && updateMultis(prevSinglesLen, multi, state.singles);
            }
        }
        state.singles && state.singles.length > 1 && checkMulti();
    }, [state.singles]);

    function loadMultis(multi) {
        initializeBetSlipData({ key: 'multi', data: multi });
    }

    function initializeBetSlipData(data) {
        dispatch({
            type: DISPATCH_TYPES.SET_INITIAL_STATE,
            payload: data,
        });
    }

    function removeTipFromBetSlip(tip) {
        if (state.singles.length === 1) {
            localStorage.removeItem('singles');
        }
        dispatch({
            type: DISPATCH_TYPES.REMOVE_TIP_BETSLIP,
            payload: tip,
        });
    }

    function clearAllTips(key) {
        //localStorage.removeItem(key);
        dispatch({
            type: DISPATCH_TYPES.CLEAR_TIPS,
            payload: key,
        });
    }

    function updateTipDetails(tip) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_TIP_DETAILS,
            payload: tip,
        });
    }

    function updateTipBetSlip(tip) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_TIP_BETSLIP,
            payload: tip,
        });
    }

    function updateTipDetailsBetSlip(tip) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_TIP_DETAILS_BETSLIP,
            payload: tip,
        });
    }

    function addBetsToBetslip(bet) {
        dispatch({
            type: DISPATCH_TYPES.ADD_BET_BETSLIP,
            payload: bet,
        });
    }

    function updateExoticBets(bet) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_EXOTIC_DETAILS,
            payload: bet,
        });
    }

    function updateExoticBonus(bet) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_EXOTIC_BONUS,
            payload: bet,
        });
    }

    function updateMultiBets(bet) {
        if (bet.key == 'sgm') {
            dispatch({
                type: DISPATCH_TYPES.UPDATE_SGM_DETAILS,
                payload: bet,
            });
        } else {
            dispatch({
                type: DISPATCH_TYPES.UPDATE_MULTI_DETAILS,
                payload: bet,
            });
        }
    }

    function updateMultiCombos(bet) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_MULTI_COMBOS,
            payload: bet,
        });
    }

    function removeExoticBets(bet) {
        dispatch({
            type: DISPATCH_TYPES.REMOVE_EXOTIC_BET,
            payload: bet,
        });
    }

    function updateContextData(data) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_CONTEXT_DATA,
            payload: data,
        });
    }

    const value = useMemo(
        () => ({
            placedbets: state,
            clearAllTips,
            initializeBetSlipData,
            updateTipDetails,
            addBetsToBetslip,
            updateExoticBets,
            removeExoticBets,
            updateContextData,
            removeTipFromBetSlip,
            updateTipBetSlip,
            updateMultiBets,
            updateTipDetailsBetSlip,
            updateMultiCombos,
            updateExoticBonus,
        }),
        [state]
    );

    return (
        <BetSlipContext.Provider value={value}>
            {children}
        </BetSlipContext.Provider>
    );
    // return <TipContext.Provider value={{ tips: state.tips, addTip }}>{children}</TipContext.Provider>;
};

import React, {
    createContext,
    useEffect,
    useMemo,
    useReducer,
    useContext,
} from 'react';
import TipReducer from './TipReducer';
import { DISPATCH_TYPES } from '../TYPES';
import Singles from '../../Models/Tip/Singles';
import saveTipsLocal from '../../components/utils/saveTipsLocal';
import CheckMultiCominations from '../../components/utils/CheckMultiCominations';
import { loadSinglesFromLocal } from '@Components/utils/RacingUtil';
import { UserContext } from '@Context/User/UserProvider';

const initialState = {
    betSlipData: {
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
    },
};

export const TipContext = createContext(initialState);

export const TipProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [state, dispatch] = useReducer(TipReducer, initialState);

    useEffect(() => {
        saveTipsLocal(state.betSlipData, 'singles');
    }, [state.betSlipData.singles]);

    function loadMultis(multi) {
        initializeTipContextData({ key: 'multi', data: multi });
    }

    useEffect(() => {
        Object.keys(initialState.betSlipData).map((key, idx) => {
            if (key == 'singles') {
                loadLocal();
            } else {
                loadBetsFromLocal(key);
            }
        });
        function loadBetsFromLocal(key) {
            let s = localStorage.getItem('betsAdded')
                ? JSON.parse(localStorage.getItem('betsAdded'))
                : {};
            if (s) {
                initializeTipContextData({
                    key: key,
                    data: s[key] ? s[key] : [],
                });
            }
        }

        async function loadLocal() {
            let singleArr = loadSinglesFromLocal();
            if (singleArr && singleArr.length) {
                initializeTipContextData({ key: 'singles', data: singleArr });
                let multi = await CheckMultiCominations(
                    singleArr,
                    user.clientID ? user.clientID : '',
                    user.multiBoostBal,
                    false
                );
                loadMultis(multi);
            }
        }
    }, []);

    function initializeTipContextData(data) {
        dispatch({
            type: DISPATCH_TYPES.SET_INITIAL_STATE,
            payload: data,
        });
    }

    function addTip(tip) {
        dispatch({
            type: DISPATCH_TYPES.ADD_TIP,
            payload: tip,
        });
    }

    function removeTip(tip) {
        if (state.betSlipData.singles.length === 1) {
            localStorage.removeItem('singles');
        }
        dispatch({
            type: DISPATCH_TYPES.REMOVE_TIP,
            payload: tip,
        });
    }

    function updateTipContextData(data) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_CONTEXT_DATA,
            payload: data,
        });
    }

    function addBetsToBetslip(bet) {
        dispatch({
            type: DISPATCH_TYPES.ADD_BET_BETSLIP,
            payload: bet,
        });
    }

    function clearAll(key) {
        dispatch({
            type: DISPATCH_TYPES.CLEAR_TIPS,
            payload: key,
        });
    }

    function updateSgm(key, data) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_SRM_DETAILS,
            payload: { key, data },
        });
    }

    const value = useMemo(
        () => ({
            tips: state.betSlipData,
            addTip,
            removeTip,
            initializeTipContextData,
            addBetsToBetslip,
            updateTipContextData,
            clearAll,
            updateSgm,
        }),
        [state]
    );

    return <TipContext.Provider value={value}>{children}</TipContext.Provider>;
    // return <TipContext.Provider value={{ tips: state.tips, addTip }}>{children}</TipContext.Provider>;
};

import React, { createContext, useMemo, useReducer } from 'react';
import { DISPATCH_TYPES } from '../TYPES';
import UserReducer from './UserReducer';

// defines the initial state, add variables here

const initialState = {
    user: {
        userID: null,
        totalEarnings: null,
        rememberMe: null,
        pendingTips: null,
        balance: null,
        activeTips: null,
        alias: null,
        gtoPage: null,
        clientID: null,
        creditLimit: null,
        proWeb: null,
        puntActive: null,
        roles: null,
        verified: null,
        refresshtoken: null,
        accesstoken: null,
        followlist: null,
        bonusbetbalance: null,
        racingBoostBal: null,
        sportBoostBal: null,
        multiBoostBal: null,
        singletap: null,
        joindate: null,
        mbsused: [],
        promo: 0,
        newUser: false,
        alertemail: 0,
        alertapp: 0,
        avatarPath: '',
    },
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    function addUser(user) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_USER,
            payload: user,
        });
    }
    function updateUserDetails(key, list) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_USER_DETAILS,
            payload: { key, list },
        });
    }

    function updateMultipleUserDetails(list) {
        dispatch({
            type: DISPATCH_TYPES.UPDATE_MULTIPLE_USER_DETAILS,
            payload: list,
        });
    }

    function userLogOut() {
        dispatch({
            type: DISPATCH_TYPES.USER_LOGOUT,
            payload: initialState.user,
        });
    }   

    const value = useMemo(
        () => ({
            user: state.user,
            addUser,
            updateUserDetails,
            userLogOut,
            updateMultipleUserDetails,
        }),
        [state]
    );
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

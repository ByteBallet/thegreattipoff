import React, { createContext, useEffect, useMemo, useReducer, useContext } from "react";
import CartReducer from "./CartReducer";
import { DISPATCH_TYPES } from "../TYPES";
import saveTipsLocal from "../../components/utils/saveTipsLocal";
import { loadCartFromLocal } from "@Components/utils/RacingUtil";
import { UserContext } from "@Context/User/UserProvider";

const initialState = {
	cartData: {
		packages: [],
	}
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
	const { user } = useContext(UserContext);
	const [state, dispatch] = useReducer(CartReducer, initialState);

	useEffect(() => {
		saveTipsLocal(state.cartData, "tippackages");
	}, [state.cartData.packages]);

	useEffect(() => {
		Object.keys(initialState.cartData).map((key, idx) => {
			loadLocal()
		})

		async function loadLocal() {
			let packagesArr = loadCartFromLocal()
			if (packagesArr && packagesArr.length) {
				initializeCartContextData({ key: "packages", data: packagesArr });
			}
		}
	}, []);

	function initializeCartContextData(data) {
		dispatch({
			type: DISPATCH_TYPES.SET_INITIAL_STATE,
			payload: data,
		});
	}

	function addCart(tip) {
		dispatch({
			type: DISPATCH_TYPES.ADD_TIP,
			payload: tip,
		});
	}

	function removeCart(tip) {
		if (state.cartData.packages.length === 1) {
			localStorage.removeItem("tippackages");
		}
		dispatch({
			type: DISPATCH_TYPES.REMOVE_TIP,
			payload: tip,
		});
	}

	function updateCartContextData(data) {
		dispatch({
			type: DISPATCH_TYPES.UPDATE_CONTEXT_DATA,
			payload: data,
		});
	}

	function addTipsToCart(bet) {
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


	const value = useMemo(() => ({
		cartItems: state.cartData, addCart, removeCart, initializeCartContextData, addTipsToCart,
		updateCartContextData, clearAll
	}), [state]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
	// return <CartContext.Provider value={{ tips: state.tips, addTip }}>{children}</CartContext.Provider>;
};

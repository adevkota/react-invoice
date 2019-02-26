import * as types from "./actionTypes";

export function userFetched(userInfo) {
	return dispatch => {
		dispatch({
			type: types.USER_FETCHED,
			userInfo
		});
	}
}

export function itemAdded(item) {
	return dispatch => dispatch({
		type: types.ITEM_ADDED,
		item
	});
}
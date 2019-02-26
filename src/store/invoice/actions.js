import * as types from "./actionTypes";

export function userFetched(userInfo) {
	return dispatch => {
		dispatch({
			type: types.USER_FETCHED,
			userInfo
		});
	}
}

export function addItem(item) {
	return dispatch => dispatch({
		type: types.ITEM_ADD_REQUESTED,
		item
	});
}
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

export function updateItem(key, val, index) {
	return dispatch => dispatch({
		type: types.ITEM_UPDATE_REQUESTED,
		key,
		val,
		index
	})
}

export function deleteItem(index) {
	return dispatch => dispatch({
		type: types.ITEM_DELETE_REQUESTED,
		index
	})
}
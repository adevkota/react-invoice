import * as types from "./actionTypes";

export function userFetched(userInfo) {
	return dispatch => {
		dispatch({
			type: types.USER_FETCHED,
			userInfo
		});
	}
}
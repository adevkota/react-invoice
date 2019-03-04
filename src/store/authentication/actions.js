import * as types from "./actionTypes";
export function loggedIn() {
	return dispatch => {
		dispatch({
			type: types.LOGGED_IN
		});
	}
}

export function loggedOut() {
	return dispatch => {
		dispatch({
			type: types.LOGGED_OUT
		});
	}
}
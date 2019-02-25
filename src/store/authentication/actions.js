import * as types from "./actionTypes";
export function loggedIn() {
	console.log("dipatched login");
	return dispatch => {
		dispatch({
			type: types.LOGGED_IN
		});
	}
}

export function loggedOut() {
	console.log("dipatched logout");
	return dispatch => {
		dispatch({
			type: types.LOGGED_OUT
		});
	}
}
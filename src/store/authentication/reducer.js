import * as types from "./actionTypes";
import { isAuthenticated } from "../../Services/firebase.service";
const initialState = {
	isAuthenticated: false
}
export default function (state = initialState, action) {
	switch(action.type) {
		case types.LOGGED_IN:
			return {
				...state,
				isAuthenticated: true
			};
		case types.LOGGED_OUT:
			return {
				isAuthenticated: false
			};
		default:
			return state;
	}
}
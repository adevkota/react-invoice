import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import invoice from './invoice/reducer';
import authentication from './authentication/reducer';
// Note: this API requires redux@>=3.1.0
const store = createStore(
	combineReducers({
		authentication,
		invoice
	}),
	applyMiddleware(
		thunk
	)
);

export default store;
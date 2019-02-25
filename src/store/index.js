import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import articles from './articles/reducer';
import authentication from './authentication/reducer';
// Note: this API requires redux@>=3.1.0
const store = createStore(
	combineReducers({
		authentication,
		articles
	}),
	applyMiddleware(
		thunk
	)
);

export default store;
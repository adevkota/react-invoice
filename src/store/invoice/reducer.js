import * as types from "./actionTypes"; 

const initialState =  {
	invoiceNum: 1,
	invoiceDate: 'Jan 4, 2015',
	dueDate: 'Jan 15, 2016',
	amountDue: 0,
	total:0,
	items:[
		{name: '', weekEnding: '', rate: '', hours: ''}
	],
	amountPaid: 0,
	userInfo: {
		
	}
}
export default function reduce(state = initialState, action) {
	switch(action.type) {
		case types.USER_FETCHED:
			return {
				...state,
				userInfo: action.userInfo
			};
		default:
			return state;
	}
}

export function getUserDisplayName(state) {
	// state in selectors are global redux states
	return state.articles.userInfo.displayName;
}
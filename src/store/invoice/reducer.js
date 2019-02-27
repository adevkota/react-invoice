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
		company: [
			{
				name: 'Company Name',
				address1: 'Address line 1',
				city: 'city',
				state: 'state',
				zip: 'zip'
			}
		],
		clients: [{
			address1: "vendor street address",
			city: "city",
			consultants:[{}],
			endClients:[{
				name: "Client Name",
				address1: "Client Address 1",
				city: "City",
				state: "State",
				zip: "Zip"
			}],
			hideDueDate: true,
			name: "vendor name",
			state:"state",
			terms: "",
			zip:"zip"
		}]
	}
}
export default function reduce(state = initialState, action) {
	let total, items;
	switch(action.type) {
		case types.USER_FETCHED:
			items = [...getInvoiceItemsFromUserInfo(action.userInfo)];
			total = getTotalFromItems(items);
			return {
				...state,
				items,
				total,
				amountDue: total - state.amountPaid,
				userInfo: action.userInfo
			};
		case types.ITEM_ADD_REQUESTED:
			items = [
				...state.items,
				...getInvoiceItemsFromUserInfo(state.userInfo)
			];
			total = getTotalFromItems(items);
			return {
				...state,
				items,
				total,
				amountDue: total - state.amountPaid
			};
		case types.ITEM_UPDATE_REQUESTED:
			items = state.items.map((item, index) => {
				if (index !== action.index) {
					return item;
				}
				return {
					...item,
					[action.key]: action.val
				}
			});
			total = getTotalFromItems(items);
			return {
				...state,
				items,
				total,
				amountDue: total - state.amountPaid
			};


		default:
			return state;
	}
}

export function getUserDisplayName(state) {
	// state in selectors are global redux states
	return state.invoice.userInfo.displayName;
}

export function getInvoiceProjection(state) {
	const {userInfo, ...rest} = state.invoice;
	return {
		...rest,
		company: getCompanyFromUserInfo(userInfo),
		client: getClientFromUserInfo(userInfo),
		endClient: getEndClientFromUserInfo(userInfo)
	}
}

function getCompanyFromUserInfo(userInfo) {
	return userInfo.company && userInfo.company.length ? userInfo.company[0] :{};
}

function getClientFromUserInfo(userInfo) {
	const clients = userInfo.clients;
	const mapper = {
		"empty": () => ({}),
		"not-empty": (clients) => {
			const {consultants, endClients, ...client } = clients[0];
			return client;
		}
	}
	return clients && !!clients.length ? mapper["not-empty"](clients): mapper["empty"](); 
}
function getEndClientFromUserInfo(userInfo) {
	const clients = userInfo.clients;
	const mapper = {
		"empty": () => ({}),
		"not-empty": (clients) => {
			const { endClients } = clients[0];
			return  endClients && !!endClients.length ? endClients[0]: {};
		}
	}
	return clients && !!clients.length ? mapper["not-empty"](clients): mapper["empty"](); 
}

function getInvoiceItemsFromUserInfo(userInfo) {
	const consultants = userInfo.clients[0].consultants;
	const mapper = {
		'empty': () => {
			return [
				{name: '', weekEnding: '', rate: '', hours: ''}
			]
		},
		'not-empty': (consultants) => {
			return consultants.map(consultant => {
				return {
					name: consultant.name || '',
					rate: consultant.rate || '',
					hours: consultant.defaultHours || '',
					weekEnding: ''
				};
			});
		}
	};

	return consultants ? mapper['not-empty'](consultants) : mapper['empty'](consultants);
}

function getTotalFromItems(items) {
	return items.reduce((total, item) => total + (item.rate * item.hours), 0);
}
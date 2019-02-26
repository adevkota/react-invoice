import React, {Component} from 'react';
import Address from '../Components/Address'
import Balance from '../Components/Balance'
import InvoiceItems from '../Components/InvoiceItems'
import Metadata from '../Components/Metadata';
import {getUserInfo, firebaseAuth} from '../Services/firebase.service';
import Header from '../Components/Header';
import Aside from '../Components/Aside';

import { connect } from "react-redux";
import { addItem } from "../store/invoice/actions";
import { getInvoiceProjection } from "../store/invoice/reducer";

class Invoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
				clients: [{}],
				company: [{}]
			}
		}

		this.update = this.update.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.getInvoiceItemsFromConsultants = this.getInvoiceItemsFromConsultants.bind(this);
		this.updatedTotals = this.updatedTotals.bind(this);
		this.getEndClient = this.getEndClient.bind(this);
	}

	componentDidMount() {
		firebaseAuth().onAuthStateChanged(user => {
			if(!!user) {
				getUserInfo(user.uid)
				.then(doc => {
					const userInfo = doc.exists? doc.data(): null;
					const items = this.getInvoiceItemsFromConsultants(userInfo.clients? userInfo.clients[0].consultants : null);
					const totals = this.updatedTotals(items, this.state.amountPaid);
					this.setState( {
						userInfo,
						items,
						...totals
					});
				});
			} else {
				this.setState({
					userInfo: {
						clients: [
							{
								'address1': 'Vendor address',
								'name': 'Vendor Name',
								'city': 'City',
								'state': 'State',
								'zip': 'zip',
								'endClient': [{}]

							}
						],
						company: [{
							name: 'Two Way Binding Inc',
							address1: 'Address line 1',
							city: 'city',
							state: 'state',
							zip: 'zip'
						}]
					}
				});
			}

		})
	}

	deleteItem(index) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.items = stateCopy.items.slice();
		stateCopy.items[index] = Object.assign({}, stateCopy.items[index]);
		stateCopy.items.splice(index, 1)

		stateCopy = {
			...stateCopy,
			...this.updatedTotals(stateCopy.items, stateCopy.amountPaid)
		}
		this.setState(stateCopy)
	}

	getInvoiceItemsFromConsultants(consultants) {
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

	getEndClient() {
		const defaultEndClient = {
			name: "Client Name",
			address1: "Client Address 1",
			city: "City",
			state: "State",
			zip: "Zip"
		}
		const endClients = this.state.userInfo.clients[0].endClients;
		return  endClients && endClients.length ? endClients[0] : defaultEndClient;
	}

	updateItems(key, val, index) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.items = stateCopy.items.slice();
		stateCopy.items[index] = Object.assign({}, stateCopy.items[index]);
		stateCopy.items[index][key] = val;

		if(key === "hours" || key === "rate") {
			stateCopy = {
				...stateCopy,
				...this.updatedTotals(stateCopy.items, stateCopy.amountPaid)
			}
		}
		this.setState(stateCopy);
	}

	updatedTotals(items, amountPaid) {
		const total = items.reduce((total, item) => total + (item.rate * item.hours), 0);
		return {
			total,
			amountDue: total - amountPaid
		}
	}

	update(key, val) {
		if (key === "amountPaid") {
			this.setState({[key]: val, amountDue: this.state.total - val})
		}
		else {
			this.setState({[key]: val})
		}
	}
	render() {
		const client = this.props.client;
		let prefix = !!client.name ? client.name.split(' ').reduce((acc, curVal) => `${acc}${curVal? curVal[0]:''}`, ''): '';
		return (
			<div id="invoice-wrapper">
				<Header company={this.props.company}/>
				<article>
					<Address>
						<p style={{fontSize: 11}}>Bill To:</p>
						<p style={{fontSize: 13, fontWeight:600}}>{client.name}</p>
						<p style={{fontSize: 14, fontWeight:400}}>{client.address1}</p>
						<p style={{fontSize: 14, fontWeight:400}}>
							{`${client.city}, ${client.state} ${client.zip}`}
						</p>
					</Address>
					<Metadata
						invoiceNum={this.props.invoiceNum}
						invoiceDate={this.props.invoiceDate}
						amountDue={this.props.amountDue}
						dueDate={this.props.dueDate}
						prefix={prefix} 
						hideDueDate={client.hideDueDate} 
						update={this.update}
					/>
					<InvoiceItems items={this.props.items} update={this.updateItems} delete={this.deleteItem}/>
					<button className="add" onClick={this.props.addItem}>+</button>
					<Balance 
						total={this.props.total}
						amountPaid={this.props.amountPaid}
						amountDue={this.props.amountDue}
						update={this.update} 
					/>
				</article>
				<Aside 
					endClient={this.getEndClient()} 
					terms={client.terms}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		...getInvoiceProjection(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addItem: (item) => {
			dispatch(addItem(item))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
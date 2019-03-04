import React, {Component} from 'react';
import Address from '../Components/Address'
import Balance from '../Components/Balance'
import InvoiceItems from '../Components/InvoiceItems'
import Metadata from '../Components/Metadata';
import Header from '../Components/Header';
import Aside from '../Components/Aside';

import { connect } from "react-redux";
import { addItem, updateItem, deleteItem } from "../store/invoice/actions";
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
		this.getInvoiceItemsFromConsultants = this.getInvoiceItemsFromConsultants.bind(this);
		this.updatedTotals = this.updatedTotals.bind(this);
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
					<InvoiceItems items={this.props.items} update={this.props.updateItem} delete={this.props.deleteItem}/>
					<button className="add" onClick={this.props.addItem}>+</button>
					<Balance 
						total={this.props.total}
						amountPaid={this.props.amountPaid}
						amountDue={this.props.amountDue}
						update={this.update} 
					/>
				</article>
				<Aside 
					endClient={this.props.endClient} 
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
		},
		updateItem: (key, val, index) => {
			dispatch(updateItem(key, val, index))
		},
		deleteItem: (index) => {
			dispatch(deleteItem(index))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
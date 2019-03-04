import React, {Component} from 'react';
import Address from '../Components/Address'
import Balance from '../Components/Balance'
import InvoiceItems from '../Components/InvoiceItems'
import Metadata from '../Components/Metadata';
import Header from '../Components/Header';
import Aside from '../Components/Aside';

import { connect } from "react-redux";
import { addItem, deleteItem, updateItem, updateMetadata } from "../store/invoice/actions";
import { getInvoiceProjection } from "../store/invoice/reducer";

class Invoice extends Component {

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
						update={this.props.updateMetadata}
					/>
					<InvoiceItems items={this.props.items} update={this.props.updateItem} delete={this.props.deleteItem}/>
					<button className="add" onClick={this.props.addItem}>+</button>
					<Balance 
						total={this.props.total}
						amountPaid={this.props.amountPaid}
						amountDue={this.props.amountDue}
						update={this.props.updateMetadata} 
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
		},
		updateMetadata:(key, val) => {
			dispatch(updateMetadata(key, val))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
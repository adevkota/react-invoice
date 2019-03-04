import React from 'react';
import Address from '../Components/Address'
import Balance from '../Components/Balance'
import InvoiceItems from '../Components/InvoiceItems'
import Metadata from '../Components/Metadata';
import Header from '../Components/Header';
import Aside from '../Components/Aside';

import { connect } from "react-redux";
import { addItem, deleteItem, updateItem, updateMetadata } from "../store/invoice/actions";
import { getInvoiceProjection } from "../store/invoice/reducer";

const Invoice = (props) => {
	const client = props.client;
	let prefix = !!client.name ? client.name.split(' ').reduce((acc, curVal) => `${acc}${curVal? curVal[0]:''}`, ''): '';

		return (
			<div id="invoice-wrapper">
				<Header company={props.company}/>
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
						invoiceNum={props.invoiceNum}
						invoiceDate={props.invoiceDate}
						amountDue={props.amountDue}
						dueDate={props.dueDate}
						prefix={prefix} 
						hideDueDate={client.hideDueDate} 
						update={props.updateMetadata}
					/>
					<InvoiceItems items={props.items} update={props.updateItem} delete={props.deleteItem}/>
					<button className="add" onClick={props.addItem}>+</button>
					<Balance 
						total={props.total}
						amountPaid={props.amountPaid}
						amountDue={props.amountDue}
						update={props.updateMetadata} 
					/>
				</article>
				<Aside 
					endClient={props.endClient} 
					terms={client.terms}
				/>
			</div>
		)

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
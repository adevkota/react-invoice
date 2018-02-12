import React, {Component} from 'react';
import Address from '../Components/Address'
import Balance from '../Components/Balance'
import InvoiceItems from '../Components/InvoiceItems'
import Metadata from '../Components/Metadata';
import {getUserInfo, firebaseAuth} from '../Services/firebase.service';

class Article extends Component {
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
				clients: [{}]
			}
		}

		this.update = this.update.bind(this);
		this.addItems = this.addItems.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	addItems() {
		this.setState({items: [...this.state.items, {name:'', weekEnding:'', rate:'', hours:0}]})
	}

	componentDidMount() {
		firebaseAuth().onAuthStateChanged(user => {
			if(!!user) {
				getUserInfo(user.uid)
				.then(doc => {
					this.setState( {
						userInfo: doc.exists? doc.data(): null
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
								'zip': 'zip'
							}
						]
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
		this.setState(stateCopy)
	}
	updateItems(key, val, index) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.items = stateCopy.items.slice();
		stateCopy.items[index] = Object.assign({}, stateCopy.items[index]);
		stateCopy.items[index][key] = val;

		if(key === "hours" || key === "rate") {
			stateCopy.total = stateCopy.items.reduce((total, item) => total + (item.rate * item.hours), 0);
			stateCopy.amountDue = stateCopy.total - stateCopy.amountPaid;
		}
		this.setState(stateCopy);
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
		let client = this.state.userInfo.clients[0];
		let prefix = !!client.name ? client.name.split(' ').reduce((acc, curVal) => `${acc}${curVal? curVal[0]:''}`, ''): '';

		return (
			<article>
				<Address>
					<p style={{fontSize: 11}}>Bill To:</p>
					<p style={{fontSize: 13, fontWeight:600}}>{client.name}</p>
					<p style={{fontSize: 14, fontWeight:400}}>{client.address1}</p>
					<p style={{fontSize: 14, fontWeight:400}}>{`${client.city}, ${client.state} ${client.zip}`}</p>
				</Address>
				<Metadata {...this.state} prefix={prefix} hideDueDate={client.hideDueDate} update={this.update}/>
				<InvoiceItems items={this.state.items} update={this.updateItems} delete={this.deleteItem}/>
				<a className="add" onClick={this.addItems}>+</a>
				<Balance {...this.state} update={this.update} />
			</article>
		)
	}
}

export default Article;
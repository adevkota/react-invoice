import React, {Component} from 'react';
import Address from './Address'
import {getUserInfo, firebaseAuth} from '../Services/firebase.service';

class Header extends Component {
	constructor() {
		super();
		this.state = {	
			company: {
				name: 'Two Way Binding Inc',
				address1: 'Address line 1',
				city: 'city',
				state: 'state',
				zip: 'zip'
			}
		}
	}

	componentDidMount() {
		firebaseAuth().onAuthStateChanged(user => {
			if(!!user) {
				getUserInfo(user.uid)
				.then(doc => {
					this.setState( {
						company: doc.exists? doc.data().company[0]: null
					});
				});
			} else {
				this.setState({
					company: {
						name: 'Two Way Binding Inc',
						address1: 'Address line 1',
						city: 'city',
						state: 'state',
						zip: 'zip'
					}
				});
			}

		})
	}
	render() {
		return(
			<header>
				<h1>Invoice</h1>
				<Address> 
					<p style={{fontWeight: 600}}>{this.state.company.name}</p>
					<p>{this.state.company.address1}</p>
					<p>{`${this.state.company.city}, ${this.state.company.state} ${this.state.company.zip}`}</p>
				</Address>
			</header>
		)
	}
}

export default Header;
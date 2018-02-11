import React, {Component} from 'react';
import {firebaseAuth, getUserInfo} from '../Services/firebase.service';
const defaultState ={
	endClient: {
		name: "Client Name",
		address1: "Client Address 1",
		city: "City",
		state: "State",
		zip: "Zip"
	},
	terms: undefined
};
class Aside extends Component {
	
	constructor(props) {
		super(props);
		this.state = {...defaultState};
	}

	componentWillMount() {
		firebaseAuth().onAuthStateChanged(user => {
			if(!!user) {
				getUserInfo(user.uid)
				.then(doc => {
					let newState = {...defaultState};
					if(doc.exists) {
						let client = doc.data().clients[0];
							newState.endClient = client.endClients? client.endClients[0]: newState.endClient;
							newState.terms= client.terms
					}
					this.setState(newState);
				});
			} else {
				this.setState(defaultState);
			}

		})
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
	}
	render() {
		if(this.state.hasError) {
			return null;
		}
		return(
			<aside>
				{//eslint-disable-next-line
				}<h1></h1>
				<div style={!!this.state.terms?{fontSize:13, paddingBottom: '26px'}: {display:'none'}}contentEditable="">
					<p style={{fontWeight: 600, fontSize:13}}>
						Terms
					</p>
					<p>{this.state.terms}</p>
				</div>
				<div style={{fontSize:13}}contentEditable="">
					<p style={{fontWeight: 600, fontSize:13}}>
						Services Performed at:
					</p>
					<p>{this.state.endClient.name}</p>
					<p>{this.state.endClient.address1}</p>
					<p>{this.state.endClient.city}, {this.state.endClient.state} {this.state.endClient.zip}</p>
				</div>
			</aside>
		)
	}
}

export default Aside;
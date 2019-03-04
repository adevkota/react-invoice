import React, { Component } from 'react';
import './App.css';

import Invoice from './Invoice';
import Control from './Control';

import {firebaseInit} from '../Services/firebase.service';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
		firebaseInit().then(() => {
			this.setState({firebaseInitialized: true})
		});
	}

	render() {
		if(!this.state.firebaseInitialized) {
			return null;
		}
		return (
			<div>
				<Control/>
				<Invoice/>
			</div>
		);
	}
}

export default App;

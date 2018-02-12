import React, { Component } from 'react';
import './App.css';

import Header from '../Components/Header';
import Article from './Article';
import Aside from '../Components/Aside';
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
				<div id="invoice-wrapper">
					<Header/>
					<Article />
					<Aside/>
				</div>
			</div>
		);
	}
}

export default App;

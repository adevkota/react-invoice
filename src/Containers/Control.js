import React, {Component} from 'react';
import {firebaseLogin, firebaseLogout, isAuthenticated, firebaseAuth, getUserInfo} from '../Services/firebase.service';
import styles from './Control.module.css';
import { connect } from "react-redux";
import { loggedIn, loggedOut } from "../store/authentication/actions";
import { userFetched } from "../store/invoice/actions";
import { getUserDisplayName } from "../store/invoice/reducer";
import { getIsAuthenticated } from "../store/authentication/reducer";
class Control extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password:''
		};
		this.toggleAuth = this.toggleAuth.bind(this);
		this.updateAuthInfo = this.updateAuthInfo.bind(this);
		this.renderAuthenticated = this.renderAuthenticated.bind(this);
		this.renderNotAuthenticated = this.renderNotAuthenticated.bind(this);
		this.renderUnknownAuthentication = this.renderUnknownAuthentication.bind(this);
	}
	
	componentDidMount() {
		firebaseAuth().onAuthStateChanged(user => {
			if(!!user) {
				getUserInfo(user.uid)
				.then(doc => {
					const userInfo = doc.exists? doc.data(): null
					this.props.loggedIn();
					this.props.userFetched(userInfo);
				});
			} else {
				this.props.loggedOut();
			}

		})
	}
	
	render() {
		if (this.props.isAuthenticated === true) {
			return this.renderAuthenticated();
		} else if(this.props.isAuthenticated === false) {
			return this.renderNotAuthenticated();
		} else {
			// if state.authenticated is not defined, do not rented anything
			return this.renderUnknownAuthentication();
		}
	}

	
	renderAuthenticated() {
		return (
			<div className={styles.Control}>
				<span className={styles.greeting}>  Hello {this.props.displayName} </span>
				<button onClick={this.toggleAuth}>Logout</button>
			</div> 
		);
	}
	
	renderNotAuthenticated() {
		return (
			<div className={styles.Control}>
				<input
					name='email'
					value={this.state.email}
					placeholder="Email"
					onChange={(e)=> this.updateAuthInfo(e.target.name, e.target.value)} 
					/>
				<input
					name='password'
					type='password'
					value={this.state.password}
					placeholder="Password"
					onChange={(e)=> this.updateAuthInfo(e.target.name, e.target.value)} 
					/>
				<button onClick={this.toggleAuth}>Login</button>
			</div> 
		);
	}
	
	renderUnknownAuthentication() {
		return (
			<div className={styles.Control}>
				<span>  hello </span>
			</div> 
		)
	}
	
	toggleAuth() {
		if(!isAuthenticated()) {
			firebaseLogin(this.state.email, this.state.password);
		} else {
			firebaseLogout();
		}
		
	}
	
	updateAuthInfo(key, val) {
		console.log(key);
		this.setState({[key]: val});
	}
}

function mapStateToProps(state) {
	return {
		displayName: getUserDisplayName(state),
		isAuthenticated: getIsAuthenticated(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loggedIn: () => {
			dispatch(loggedIn())
		},
		loggedOut: () => {
			dispatch(loggedOut())
		},
		userFetched: (userInfo) => {
			dispatch(userFetched(userInfo))
		}
	}
}
	
export default connect(mapStateToProps, mapDispatchToProps)(Control);
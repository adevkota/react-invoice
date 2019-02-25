import React, {Component} from 'react';
import {firebaseLogin, firebaseLogout, isAuthenticated, firebaseAuth, getUserInfo} from '../Services/firebase.service';
import './Control.css'
import { connect } from "react-redux";
import { loggedIn, loggedOut } from "../store/authentication/actions";
import { userFetched } from "../store/articles/actions";
class Control extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: undefined,
			email: '',
			password:'',
			userInfo: null
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
					this.setState( {
						authenticated: true,
						userInfo
					});
					this.props.loggedIn();
					this.props.userFetched(userInfo);
				});
			} else {
				this.setState({
					authenticated: false,
					userInfo: null
				});
				this.props.loggedOut();
			}

		})
	}
	
	render() {
		if (this.state.authenticated === true) {
			return this.renderAuthenticated();
		} else if(this.state.authenticated === false) {
			return this.renderNotAuthenticated();
		} else {
			// if state.authenticated is not defined, do not rented anything
			return this.renderUnknownAuthentication();
		}
	}

	
	renderAuthenticated() {
		return (
			<div className="Control">
				<span>  hello {this.state.userInfo && this.state.userInfo.displayName} </span>
				<button onClick={this.toggleAuth}>Logout</button>
			</div> 
		);
	}
	
	renderNotAuthenticated() {
		return (
			<div className="Control">
				<span>  hello </span>
				<input
					name='email'
					value={this.state.email}
					onChange={(e)=> this.updateAuthInfo(e.target.name, e.target.value)} 
					/>
				<input
					name='password'
					type='password'
					value={this.state.password}
					onChange={(e)=> this.updateAuthInfo(e.target.name, e.target.value)} 
					/>
				<button onClick={this.toggleAuth}>Login</button>
			</div> 
		);
	}
	
	renderUnknownAuthentication() {
		return (
			<div className="Control">
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
		this.setState({[key]: val});
	}
}

function mapStateToProps(state) {
	return {
		...state
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
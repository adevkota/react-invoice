import React, {Component} from 'react';
import './Control.css'

class Control extends Component {
   constructor() {
      super();
      this.state = {
         toggleAuthText: 'Login',
         authenticated: false,
         username: '',
         password:''
      };
      this.toggleAuth = this.toggleAuth.bind(this);
      this.updateAuthInfo = this.updateAuthInfo.bind(this);
   }

   toggleAuth() {
      this.setState((prevState, props) => {
         return {
            authenticated: !prevState.authenticated,
            toggleAuthText: prevState.authenticated? 'Login': 'Logout'
         }
      });
   }

   updateAuthInfo(key, val) {
      console.log(key, val)
      this.setState({[key]: val});
   }
   render() {
      return (
         <div className="Control">
            <span>  hello </span>
            <input
               name='username'
               value={this.state.username}
               onChange={(e)=> this.updateAuthInfo(e.target.name, e.target.value)} 
            />
            <input
               name='password'
               value={this.state.password}
               onChange={(e)=> this.updateAuthInfo(e.target.name, e.target.value)} 
            />
            <button onClick={this.toggleAuth}>{this.state.toggleAuthText}</button>
         </div>

      )
   }
}

export default Control;
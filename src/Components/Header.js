import React, {Component} from 'react';
import Address from './Address'
class Header extends Component {
    render() {
      return(
        <header>
          <h1>Invoice</h1>
          <Address> 
            <p style={{fontWeight: 600}}>Two Way Binding Inc</p>
            <p>Address line 1</p>
            <p>City, State Zip</p>
          </Address>
        </header>
      )
    }
  }

  export default Header;
import React, {Component} from 'react';
class Address extends Component{
    render() {
      return(
        <address contentEditable="">
          {this.props.children}
  
        </address>
      )
    }
}

export default Address;
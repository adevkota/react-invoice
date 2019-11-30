import React from 'react';
import Address from './Address';

const Header = ({company}) => {
	return(
		<header>
			<h1>Invoice</h1>
			<Address address={company}> 
				
			</Address>
		</header>
	)

}

export default Header;
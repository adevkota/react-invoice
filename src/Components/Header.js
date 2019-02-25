import React from 'react';
import Address from './Address';

const Header = ({company}) => {
	return(
		<header>
			<h1>Invoice</h1>
			<Address> 
				<p style={{fontWeight: 600}}>{company.name}</p>
				<p>{company.address1}</p>
				<p>{`${company.city}, ${company.state} ${company.zip}`}</p>
			</Address>
		</header>
	)

}

export default Header;
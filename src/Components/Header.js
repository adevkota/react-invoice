import React from 'react';
import Address from './Address';
import styles from './Header.module.css';

const Header = ({company}) => {
	return(
		<header className={styles.InvoiceHeader}>
			<h1  className={styles.address}>Invoice</h1>
			<Address className={styles.address} address={company}> 
				
			</Address>
		</header>
	)

}

export default Header;
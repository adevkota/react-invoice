import React from 'react';
import styles from './Address.module.css'
const Address = ({children, address}) => {
	return(
		<address class={styles.Address}contentEditable="">
			{children}
			<p style={{fontWeight: 600}}>{address.name}</p>
			<p>{address.address1}</p>
			<p>{`${address.city}, ${address.state} ${address.zip}`}</p>
		</address>
	)
}

export default Address;
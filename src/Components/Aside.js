import React from 'react';

const Aside = ({terms, endClient}) => {
	return(
		<aside>
			{//eslint-disable-next-line
			}<h1></h1>
			<div style={!!terms?{fontSize:13, paddingBottom: '26px'}: {display:'none'}}contentEditable="">
				<p style={{fontWeight: 600, fontSize:13}}>
					Terms
				</p>
				<p>{terms}</p>
			</div>
			<div style={{fontSize:13}}contentEditable="">
				<p style={{fontWeight: 600, fontSize:13}}>
					Services Performed at:
				</p>
				<p>{endClient.name}</p>
				<p>{endClient.address1}</p>
				<p>{endClient.city}, {endClient.state} {endClient.zip}</p>
			</div>
		</aside>
	)
}

export default Aside;
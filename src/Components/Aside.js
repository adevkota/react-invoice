import React, {Component} from 'react';
class Aside extends Component {
	render() {
		return(
			<aside>
				{//eslint-disable-next-line
				}<h1></h1>
				<div style={{fontSize:13}}contentEditable="">
					<p style={{fontWeight: 600, fontSize:13}}>
						Services Performed at:
					</p>
					<p>Client Name</p>
					<p>Client Address</p>
				</div>
			</aside>
		)
	}
}

export default Aside;
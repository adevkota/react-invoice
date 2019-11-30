import React from 'react';

const TD = ({type, ...props}) => <td>
	{props.children}
	<input 
	onChange={(e) => props.update(props.name, e.target.value, props.index)} 
	value={props.val}
	type={type || 'text'}
	style={{width:'100%', ...props.style, textAlign: 'inherit'}}/>
	</td>

export default TD;
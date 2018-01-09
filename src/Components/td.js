import React from 'react';

const TD = (props) => <td>
	{props.children}
	<input 
	onChange={(e) => props.update(props.name, e.target.value, props.index)} 
	value={props.val}
	style={{width:'100%', ...props.style, textAlign: 'inherit'}}/>
	</td>

export default TD;
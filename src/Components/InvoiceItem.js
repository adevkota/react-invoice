import React from 'react';
import TD from './td';
const InvoiceItem =({item, index, update, ...props }) => {
	return (
		<tr>
			<TD 
				update={update}
				name="name"
				index={index}
				val={item.name}><button className="cut" onClick={(e) => props.delete(index)}>-</button></TD>
			<TD 
				update={update}
				name="weekEnding"
				index={index}
				val={item.weekEnding}></TD>
			<TD 
				update={update}
				name="rate"
				index={index}
				val={item.rate}></TD>
			<TD 
				update={update}
				name="hours"
				index={index}
				val={item.hours}></TD>
			<td><span>{item.rate * item.hours}</span></td>
		</tr>
	)
	
}

export default InvoiceItem;
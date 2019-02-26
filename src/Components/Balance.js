import React, {Component} from 'react';
import TD from './td'
const Balance = (props) => {
	return (
		<table className="balance">
			<tbody><tr>
					<th><span contentEditable="">Total ($)</span></th>
					<td><span>{props.total}</span></td>
				</tr>
				<tr>
					<th><span contentEditable="">Amount Paid ($)</span></th>
					<TD 
						update={props.update}
						name="amountPaid"
						val={props.amountPaid}>
					</TD>
				</tr>
				<tr>
					<th><span contentEditable="">Balance Due ($)</span></th>
					<td><span>{props.amountDue}</span></td>
				</tr>
			</tbody>
		</table>
	)
}

export default Balance
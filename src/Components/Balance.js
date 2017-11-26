import React, {Component} from 'react';
import TD from './td'
class Balance extends Component {
	render() {
		return (
			<table className="balance">
				<tbody><tr>
						<th><span contentEditable="">Total ($)</span></th>
						<td><span>{this.props.total}</span></td>
					</tr>
					<tr>
						<th><span contentEditable="">Amount Paid ($)</span></th>
						<TD 
							update={this.props.update}
							name="amountPaid"
							val={this.props.amountPaid}>
						</TD>
					</tr>
					<tr>
						<th><span contentEditable="">Balance Due ($)</span></th>
						<td><span>{this.props.amountDue}</span></td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default Balance
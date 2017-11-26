import React, {Component} from 'react';
import TD from './td';
class InvoiceItem extends Component {
	render() {
		let item = this.props.item
		let index = this.props.index
		return (
			<tr>
				<TD 
					update={this.props.update}
					name="name"
					index={index}
					val={item.name}><a className="cut" onClick={(e) => this.props.delete(this.props.index)}>-</a></TD>
				<TD 
					update={this.props.update}
					name="weekEnding"
					index={index}
					val={item.weekEnding}></TD>
				<TD 
					update={this.props.update}
					name="rate"
					index={index}
					val={item.rate}></TD>
				<TD 
					update={this.props.update}
					name="hours"
					index={index}
					val={item.hours}></TD>
				<td><span>{item.rate * item.hours}</span></td>
			</tr>
		)
	}
}

export default InvoiceItem;
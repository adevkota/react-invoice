import React from 'react';
import InvoiceItem from './InvoiceItem';


const InvoiceItems = (props) => {
	return (
		<table className="inventory">
			<thead>
				<tr>
					<th><span contentEditable="">Consultant</span></th>
					<th><span contentEditable="">Week ending</span></th>
					<th><span contentEditable="">Rate($)</span></th>
					<th><span contentEditable="">Hours</span></th>
					<th><span contentEditable="">Price($)</span></th>
				</tr>
			</thead>
			<tbody>
				{props.items.map((item, index) => {
					return (
						<InvoiceItem
							update={props.update}
							delete={props.delete}
							key={index} index={index} item={item} />
					)
				})}
			</tbody>
		</table>
	)
}

export default InvoiceItems;
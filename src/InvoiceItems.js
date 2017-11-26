import React, {Component} from 'react';
import InvoiceItem from './InvoiceItem';


class InvoiceItems extends Component {
  render() {
    let items = this.props.items;
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
          {items.map((item, index) => {
            return (
              <InvoiceItem
                update={this.props.update}
                delete={this.props.delete}
                key={index} index={index} item={item} />
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default InvoiceItems;
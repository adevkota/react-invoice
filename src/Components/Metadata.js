import React, {Component} from 'react';
import TD from './td';
class Metadata extends Component {
  render() {
    return(
      <table className="meta">
      <tbody>
        <tr>
          <th><span contentEditable="">Invoice #</span></th>
          <TD update={this.props.update}
            val={this.props.invoiceNum}
            name="invoiceNum"></TD>
        </tr>
      
        <tr>
          <th><span contentEditable="">Invoice Date</span></th>
          <TD update={this.props.update} 
            name="invoiceDate"
            val={this.props.invoiceDate}></TD>
        </tr>
        <tr>
          <th><span contentEditable="">Due Date</span></th>
          <TD style={{fontWeight: 600}}
            update={this.props.update} 
            val={this.props.dueDate}></TD>
      </tr>
      <tr>
        <th><span contentEditable="">Amount Due</span></th>
        <td>
          <span id="prefix" contentEditable="">$</span>
          <span style={{fontWeight: 600}}>{this.props.amountDue}</span></td>
      </tr>
    </tbody></table>
    )
  }
}

export default Metadata;
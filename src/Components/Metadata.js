import React, {Component} from 'react';
import TD from './td';
class Metadata extends Component {
  constructor() {
    super();
    this.state = {
      dueDateHidden : false
		}
    this.hideDueDate = this.hideDueDate.bind(this);
  }

  hideDueDate() {
    this.setState({dueDateHidden: true});
  }
  render() {
    return(
      <table className="meta">
      <tbody>
        <tr>
          <th><span contentEditable="">Invoice #</span></th>
          <TD
            style={{width: `calc(100% - 50px)`}} 
            update={this.props.update}
            prefix={this.props.prefix}
            val={this.props.invoiceNum}
            name="invoiceNum">
               <span className="prefix"
                 style={{ height: `15px`,
                 lineHeight :`15px`}}
                contentEditable="">{this.props.prefix}-</span>
            </TD>
        </tr>
      
        <tr>
          <th><span contentEditable="">Invoice Date</span></th>
          <TD update={this.props.update} 
            name="invoiceDate"
            val={this.props.invoiceDate}></TD>
        </tr>
        <tr style={this.state.dueDateHidden? {display:'none'}:{}}>
          <th>
            <a className="cut" onClick={(e) => this.hideDueDate(e)}>-</a>
            <span contentEditable="">Due Date</span>
          </th>
          <TD style={{fontWeight: 600}}
            update={this.props.update}
            name="dueDate"
            val={this.props.dueDate}></TD>
      </tr>
      <tr>
        <th><span contentEditable="">Amount Due</span></th>
        <td>
          <span className="prefix" contentEditable="">$</span>
          <span style={{fontWeight: 600}}>{this.props.amountDue}</span></td>
      </tr>
    </tbody></table>
    )
  }
}

export default Metadata;
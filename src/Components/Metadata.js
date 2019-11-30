import React, { useState, useEffect} from 'react';
import TD from './td';
const Metadata = (props) => {
  const [hideDueDate, setHideDueDate] = useState(props.hideDueDate);

  useEffect(
    () => {
      setHideDueDate(props.hideDueDate);
    },
    [props.hideDueDate]
  )
 
  return(
    <table className="meta">
    <tbody>
      <tr>
        <th><span contentEditable="">Invoice #</span></th>
        <TD
          style={{width: `calc(100% - 50px)`}} 
          update={props.update}
          prefix={props.prefix}
          val={props.invoiceNum}
          name="invoiceNum">
              <span className="prefix"
                style={{ height: `15px`,
                lineHeight :`15px`}}
              contentEditable="">{props.prefix? `${props.prefix}-`: ''}</span>
          </TD>
      </tr>
    
      <tr>
        <th><span contentEditable="">Invoice Date</span></th>
        <TD update={props.update}
          type={"date"} 
          name="invoiceDate"
          val={props.invoiceDate}></TD>
      </tr>
      <tr style={hideDueDate? {display:'none'}:{}}>
        <th>
          <button className="cut" onClick={(e) => setHideDueDate(true)}>-</button>
          <span contentEditable="">Due Date</span>
        </th>
        <TD style={{fontWeight: 600}}
          type={"date"} 
          update={props.update}
          name="dueDate"
          val={props.dueDate}></TD>
    </tr>
    <tr>
      <th><span contentEditable="">Amount Due</span></th>
      <td>
        <span className="prefix" contentEditable="">$</span>
        <span style={{fontWeight: 600}}>{props.amountDue}</span></td>
    </tr>
  </tbody></table>
  )
  
}

export default Metadata;
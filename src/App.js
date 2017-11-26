import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Article />
        <Aside/>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return(
      <header>
        <h1>Invoice</h1>
        <Address> 
          <p style={{fontWeight: 600}}>Two Way Binding Inc</p>
          <p>Address line 1</p>
          <p>City, State Zip</p>
        </Address>
      </header>
    )
  }
}

class Address extends Component{
  render() {
    return(
      <address contentEditable="">
        {this.props.children}

      </address>
    )
  }
}

class Article extends Component {

  constructor() {
    super();
    this.state = {
      invoiceNum: 1,
      invoiceDate: 'Jan 4, 2015',
      dueDate: 'Jan 15, 2016',
      amountDue: 0,
      total:0,
      items:[
        {name: 'AD', weekEnding: '12/25/2015', rate: '60', hours:0}
      ],
      amountPaid: 0
    }

    this.update = this.update.bind(this);
    this.addItems = this.addItems.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItems() {
    this.setState({items: [...this.state.items, {name:'', weekEnding:'', rate:'', hours:0}]})
  }

  deleteItem(index) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.items = stateCopy.items.slice();
    stateCopy.items[index] = Object.assign({}, stateCopy.items[index]);
    stateCopy.items.splice(index, 1)
    this.setState(stateCopy)
  }
  updateItems(key, val, index) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.items = stateCopy.items.slice();
    stateCopy.items[index] = Object.assign({}, stateCopy.items[index]);
    stateCopy.items[index][key] = val;

    if(key === "hours" || key === "rate") {
      stateCopy.total = stateCopy.items.reduce((total, item) => total + (item.rate * item.hours), 0);
      stateCopy.amountDue = stateCopy.total - stateCopy.amountPaid;
    }
    this.setState(stateCopy);
  }

  update(key, val) {
    if (key === "amountPaid") {
      this.setState({[key]: val, amountDue: this.state.total - val})
    }
    else {
      this.setState({[key]: val})
    }
  }
  render() {
    return (
      <article>
        <Address>
          <p style={{fontSize: 11}}>Bill To:</p>
          <p style={{fontSize: 13, fontWeight:600}}>Vendor Name</p>
          <p style={{fontSize: 14, fontWeight:400}}>Vendor address</p>
          <p style={{fontSize: 14, fontWeight:400}}>City, state zip</p>
        </Address>
        <Metadata {...this.state} update={this.update}/>
        <InvoiceItems items={this.state.items} update={this.updateItems} delete={this.deleteItem}/>
        <a className="add" onClick={this.addItems}>+</a>
        <Balance {...this.state} update={this.update} />
      </article>
    )
  }
}
class Aside extends Component {
  render() {
    return(
      <aside>
        <h1></h1>
        <div style={{fontSize:13}}contentEditable="">
          <p style={{fontWeight: 600, fontSize:13}}>
            Services Performed at:
          </p>
          <p>Client Name</p>
          <p>Client Address</p>
        </div>
      </aside>
    )
  }
}

class Balance extends Component {
  render() {
    return (
      <table className="balance">
        <tbody><tr>
            <th><span contentEditable="">Total</span></th>
            <td><span data-prefix="">$</span><span>{this.props.total}</span></td>
          </tr>
          <tr>
            <th><span contentEditable="">Amount Paid</span></th>
            <TD 
              update={this.props.update}
              name="amountPaid"
              val={this.props.amountPaid}>
            </TD>
          </tr>
          <tr>
            <th><span contentEditable="">Balance Due</span></th>
            <td><span data-prefix="">$</span><span>{this.props.amountDue}</span></td>
          </tr>
        </tbody>
      </table>
    )
  }
}
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
        <td><span data-prefix="">$</span><span>{item.rate * item.hours}</span></td>
      </tr>
    )
  }
}
class InvoiceItems extends Component {
  render() {
    let items = this.props.items;
    return (
      <table className="inventory">
        <thead>
          <tr>
            <th><span contentEditable="">Consultant</span></th>
						<th><span contentEditable="">Week ending</span></th>
						<th><span contentEditable="">Rate</span></th>
						<th><span contentEditable="">Hours</span></th>
						<th><span contentEditable="">Price</span></th>
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
const TD = (props) => <td><input 
    onChange={(e) => props.update(props.name, e.target.value, props.index)} 
    value={props.val}
    style={{width:'100%', ...props.style}}/>
    {props.children}
    </td>

export default App;

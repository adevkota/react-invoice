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
      items:[
        {name: 'AD', weekEnding: '12/25/2015', rate: '60', hours:0}
      ],
      amountPaid: 0
    }

    this.update = this.update.bind(this);
  }

  update(e) {
    console.log(e.target.value);
  }
  render() {
    let items = this.state.items;
    return (
      <article>
        <Address>
          <p style={{fontSize: 11}}>Bill To:</p>
          <p style={{fontSize: 13, fontWeight:600}}>Vendor Name</p>
          <p style={{fontSize: 14, fontWeight:400}}>Vendor address</p>
          <p style={{fontSize: 14, fontWeight:400}}>City, state zip</p>
        </Address>
        <Metadata {...this.state} update={this.update}/>
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

class Metadata extends Component {

  update(e) {
    console.log(e);
  }
  render() {
    return(
      <table className="meta">
      <tbody>
        <tr>
          <th><span contentEditable="">Invoice #</span></th>
          <TD update={this.props.update}val={this.props.invoiceNum}></TD>
        </tr>
      
        <tr>
          <th><span contentEditable="">Invoice Date</span></th>
          <TD update={this.props.update} val={this.props.invoiceDate}></TD>
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
    onChange={props.update} 
    defaultValue={props.val}
    style={{width:'100%', ...props.style}}/></td>

export default App;

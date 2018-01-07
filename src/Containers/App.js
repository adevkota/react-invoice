import React, { Component } from 'react';
import './App.css';

import Header from '../Components/Header';
import Article from './Article';
import Aside from '../Components/Aside';
import Control from './Control';

class App extends Component {
  render() {
    return (
      <div>
        <Control/>
        <div id="invoice-wrapper">
          <Header/>
          <Article />
          <Aside/>
        </div>
      </div>
    );
  }
}

export default App;

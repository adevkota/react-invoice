import React, { Component } from 'react';
import './App.css';

import Header from '../Components/Header';
import Article from './Article';
import Aside from '../Components/Aside';
import Control from './Control';

import {firebaseInit} from '../Services/firebase.service';

class App extends Component {
  constructor(props) {
    super(props);
    firebaseInit();
  }
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

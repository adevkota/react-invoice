import React, { Component } from 'react';
import './App.css';

import Header from './Header'
import Article from './Article'
import Aside from './Aside'


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

export default App;

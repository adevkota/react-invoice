import React, { Component } from 'react';
import './App.css';

import Header from '../Components/Header'
import Article from './Article'
import Aside from '../Components/Aside'


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

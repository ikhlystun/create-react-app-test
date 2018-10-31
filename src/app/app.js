// The basics
import React, { Component } from 'react';

import Header from './header';
import Routes from './routes';

import './app.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <div id="content">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;


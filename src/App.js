import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InitState from './views/InitState';
import AllChallenges from './views/AllChallenges';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<InitState />} />
        </Routes>
      </div>
    );
  }
}

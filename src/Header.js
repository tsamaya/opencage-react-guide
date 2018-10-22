// ./src/Header.js
import React, { Component } from 'react';
import logo from './opencage-white.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          OpenCage <b>Geocoder</b> API.
        </p>
      </header>
    );
  }
}

export default Header;

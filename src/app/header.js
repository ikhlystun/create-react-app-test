import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header id="header">
    <h1 id="title">My awesome website</h1>
    <ul id="links">
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/this-is-broken">Broken Page</Link>
      </li>
    </ul>
  </header>
);

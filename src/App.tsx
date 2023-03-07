import React from 'react';
import './App.css';
import Main from './Main';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/ruler'>Ruler</Link></li>
        <li><Link to='/protractor'>Protractor</Link></li>
      </ul>
      <Main />
    </div>
  );
}

export default App;

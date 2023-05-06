import React from 'react';
import './App.css';
import Main from './Main';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{overflow: 'hidden'}}>
      <div style={{ position: 'absolute', zIndex: '100'}}>
          <Link to='/'>Home</Link>
      </div>
      <Main />
    </div>
  );
}

export default App;

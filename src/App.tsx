import React from 'react';
import logo from './logo.svg';
import './App.css';

import protractor from './protractor.png'

function App() {
  return (
    <div className="App" style={{
      backgroundColor: 'steelblue',
      height: '100vh',
      width: '100vw',
      maxHeight: '100vh',
      maxWidth: '100vw'
    }}>
      <div>
        <div>
          <p style={{
            fontWeight: 'bold',
            fontSize: '4em',
            padding: '0',
            margin: '0' 
            }}> 
            Pick your fighter! 
          </p>
        </div>
        <div>
          <img src={protractor} className='tool'/>
          <img src={protractor} className='tool2'/>
        </div>
      </div>
    </div>
  );
}

export default App;

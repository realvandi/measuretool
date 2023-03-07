import React from 'react';
import logo from './logo.svg';
import './App.css';

import protractor from './protractor.png'

function App() {
  return (
    <div className="App" style={{
      backgroundColor: 'steelblue',
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{flex: '1', minHeight: '50px'}}/>
      <div style={{height:'auto', flexGrow: '1'}}>
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
      <div style={{flex: '1', minHeight: '50px'}}/>
    </div>
  );
}

export default App;

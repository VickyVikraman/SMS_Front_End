import React from 'react';
import './App.css';
import {BrowserRouter as Router  } from 'react-router-dom'

import Routing from './route'
function App() {
  return (
    // <div className="App">
      // <header className="App-header"> 
      <Router>
        <Routing/>
      </Router>
      //  </header> 
    // </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import Suggested from "./Suggested";
import Genre from "./Genre";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Welcome to this react App.
      </header>
      <Genre/>
      <Suggested/>
    </div>
  );
}

export default App;

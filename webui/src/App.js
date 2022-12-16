import React, { useEffect, useState } from "react";
import { Layout, Nav, Typography, Col, Row, BackTop, Spin } from '@douyinfe/semi-ui';
import { InputContent } from "./InputContent";
import { GeneratedResults } from "./GeneratedResults";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

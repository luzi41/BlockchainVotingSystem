//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("BVS-Admin UI");

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Start</Link></li>
          <li class="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">Blockchain Voting System 0.13</Link></li>
        </ul>
      </nav>

      <div id="app">
        <h1>{title}</h1>
        <span id="ContractAddress">{status}</span>
      </div>

      <Routes>
        

      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Start from "./components/Start"
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Start</Link></li>
          <li><Link to="/register">Registrieren</Link></li>
          <li><Link to="/vote">Abstimmen</Link></li>
          <li><Link to="/results">Ergebnisse</Link></li>
          <li class="title"><Link to="https://github.com/luzi41/BlockchainVotingSystem/tree/v0.4" target="_blank">Blockchain Voting System 0.4</Link></li>
        </ul>
        
      </nav>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vote" element={<VoteForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;

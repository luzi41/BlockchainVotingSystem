import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Abstimmen</Link></li>
          <li><Link to="/results">Ergebnisse</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<VoteForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;

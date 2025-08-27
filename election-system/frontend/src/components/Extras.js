// Extras.js V 0.26.13
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Extras() {
  return (
    <div>
      <h3>Extras</h3>
      <nav className="menu">
        <ul>
          <li><Link to="http://localhost:25000" target="_blank">Explorer</Link></li>
          <li><Link to="/extras/settings">Einstellungen</Link></li>
        </ul>
      </nav>
    </div>
   
  );
}

export default Extras;
// Extras.js V 0.24.3
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const isElectron = navigator.userAgent.toLowerCase().includes('electron');

const settings = isElectron ? (<li><Link to="/extras/settings">Einstellungen</Link></li>) : null;
function Extras() {
  return (
    <div>
      <h3>Extras</h3>
      <nav className="menu">
        <ul>
          <li><Link to="http://localhost:25000" target="_blank">Explorer</Link></li>
          {settings}
        </ul>
      </nav>
    </div>
   
  );
}

export default Extras;
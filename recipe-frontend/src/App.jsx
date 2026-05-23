import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <h2 className="logo">🍲 Recipe On The GO</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/history">History</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
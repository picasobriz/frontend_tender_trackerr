import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("tendertrack-theme") === "dark");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("tendertrack-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="nav">
      <Link className="brand" to={user ? "/dashboard" : "/"}>Tender<span>Track</span></Link>
      <div className="nav-actions">
        <button type="button" className="theme-toggle" onClick={() => setDark(value => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
          {dark ? "☀ Light mode" : "☾ Dark mode"}
        </button>
        {user ? (
          <div className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tenders">View Tenders</Link>
            {user.role !== "auditor" && <Link to="/bids">{user.role === "admin" ? "Proposals" : "My Bids"}</Link>}
            <span className="user-name">{user.name || user.email}</span>
            <button className="nav-logout" onClick={() => { logout(); navigate("/"); }}>Logout</button>
          </div>
        ) : (
          <div className="nav-links public-nav-links">
            <Link className="nav-login" to="/login">Log In</Link>
            <Link className="nav-signup" to="/register">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

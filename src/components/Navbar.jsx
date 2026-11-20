import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <Link className="brand" to={user ? "/" : "/login"}>Tender<span>Track</span></Link>
      {user && <div className="nav-links">
        <Link to="/">Dashboard</Link><Link to="/tenders">Tenders</Link><Link to="/bids">Bids</Link>
        <span className="user-name">{user.name || user.email}</span>
        <button className="nav-logout" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
      </div>}
    </nav>
  );
}

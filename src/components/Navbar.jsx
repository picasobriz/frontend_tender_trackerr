
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link className="brand" to={user ? "/" : "/login"}>
        Tender<span>Track</span>
      </Link>

      <div className="nav-links">
        {user && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/tenders">Tenders</Link>

            {user.role !== "auditor" && <Link to="/bids">Bids</Link>}

            <span className="user-name">{user.name || user.email}</span>

            <button
              className="nav-logout"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}

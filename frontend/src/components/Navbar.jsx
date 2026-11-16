import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const links = user
    ? [["/dashboard", "Dashboard"], ["/tenders", "Tenders"], ...(user.role !== "auditor" ? [["/bids", "Bids"]] : [])]
    : [["/login", "Login"], ["/register", "Register"]];
  return (
    <nav className="nav">
      <strong className="brand">TENDER<span>TRACK</span></strong>
      {links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
    </nav>
  );
}
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <strong className="brand">TENDER<span>TRACK</span></strong>
    </nav>
  );
}
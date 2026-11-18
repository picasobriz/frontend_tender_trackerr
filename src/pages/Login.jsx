import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.access_token);
      navigate("/tenders");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card auth-card">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p className="muted">Need an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

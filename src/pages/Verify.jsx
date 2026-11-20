import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Verify() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      await api("/auth/verify", { method: "POST", body: { token: token.trim() } });
      navigate("/login", { state: { notice: "Email verified. You can now sign in." } });
    } catch (x) { setError(x.message); } finally { setLoading(false); }
  }

  return <div className="auth-shell"><div className="auth-card card">
    <div className="auth-logo">Tender<span>Track</span></div>
    <h1>Verify your email</h1>
    <p className="muted">Paste the token we emailed you. Already verified? Just sign in.</p>
    {location.state?.notice && <div className="notice">{location.state.notice}</div>}
    {error && <div className="notice error">{error}</div>}
    <form onSubmit={submit}>
      <label>Verification token<input required value={token} onChange={e => setToken(e.target.value)} /></label>
      <button disabled={loading}>{loading ? "Verifying..." : "Verify account"}</button>
    </form>
    <p className="muted center"><Link to="/login">Back to sign in</Link></p>
  </div></div>;
}

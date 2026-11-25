import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function ForgotPassword() {
  const [email,setEmail]=useState("");
  const [token,setToken]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [requested,setRequested]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function requestToken(e) {
    e.preventDefault(); setLoading(true); setError(""); setMessage("");
    try {
      const result=await api("/auth/forgot-password",{method:"POST",body:{email:email.trim().toLowerCase()}});
      setRequested(true);
      setMessage(result.message || "If an account exists with that email, password reset instructions will be sent.");
    } catch(x) { setError(x.message); } finally { setLoading(false); }
  }

  async function resetPassword(e) {
    e.preventDefault(); setLoading(true); setError(""); setMessage("");
    try {
      const result=await api("/auth/reset-password",{method:"POST",body:{token:token.trim(),password}});
      setMessage(result.message || "Password successfully reset. You can now log in.");
      setToken(""); setPassword("");
    } catch(x) { setError(x.message); } finally { setLoading(false); }
  }

  return <div className="auth-shell"><div className="auth-card card">
    <div className="auth-logo">Tender<span>Track</span></div>
    <h1>Forgot your password?</h1>
    <p className="muted">Enter the email address linked to your account. We will send you a password reset token.</p>
    {message && <div className="notice">{message}</div>}
    {error && <div className="notice error">{error}</div>}
    {!requested ? <form onSubmit={requestToken}>
      <label>Email address<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></label>
      <button type="submit" disabled={loading}>{loading?"Sending...":"Send reset token"}</button>
    </form> : <>
      <form onSubmit={resetPassword}>
        <label>Password reset token<input type="text" required value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste the token from your email" /></label>
        <label>New password<div className="password-field"><input type={showPassword?"text":"password"} required minLength={8} maxLength={128} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" /><button type="button" className="password-toggle" onClick={()=>setShowPassword(v=>!v)}>{showPassword?"Hide":"Show"}</button></div></label>
        <button type="submit" disabled={loading}>{loading?"Updating...":"Reset password"}</button>
      </form>
      <button type="button" className="btn-secondary" onClick={()=>{setRequested(false);setToken("");setPassword("");setMessage("");setError("");}}>Request another token</button>
    </>}
    <p className="muted center"><Link to="/login">Back to Log In</Link></p>
  </div></div>;
}

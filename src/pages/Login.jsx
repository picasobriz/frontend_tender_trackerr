import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  const { login }=useAuth(); const navigate=useNavigate(); const location=useLocation();
  async function submit(e){e.preventDefault();setLoading(true);setError("");try{await login(email,password);navigate(location.state?.from?.pathname || "/",{replace:true});}catch(x){setError(x.message);}finally{setLoading(false);}}
  return <div className="auth-shell"><div className="auth-card card"><div className="auth-logo">Tender<span>Track</span></div><h1>Welcome back</h1><p className="muted">Sign in to manage tenders and bids.</p>{error&&<div className="notice error">{error}</div>}<form onSubmit={submit}><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"/></label><button disabled={loading}>{loading?"Signing in...":"Sign In"}</button></form><p className="muted center">Don't have an account? <Link to="/register">Create one</Link></p></div></div>;
}


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email.trim(), password);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card card">
        <div className="auth-logo">
          Tender<span>Track</span>
        </div>

        <h1>Welcome back</h1>
        <p className="muted">
          Sign in to manage tenders and bids.
        </p>

        {location.state?.notice && (
          <div className="notice">{location.state.notice}</div>
        )}

        {error && <div className="notice error">{error}</div>}

        {/verify/i.test(error) && (
          <p>
            <Link
              to="/verify"
              state={{ notice: "Enter the token from your verification email." }}
            >
              Verify your account
            </Link>
          </p>
        )}

        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <p className="forgot-link">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="muted center">
          Don't have an account? <Link to="/register">Create one</Link>
          {" · "}
          <Link to="/verify">Verify email</Link>
        </p>
      </div>
    </div>
  );
}

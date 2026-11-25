
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api("/auth/forgot-password", {
        method: "POST",
        body: { email: email.trim() }
      });

      setMessage(
        response?.message ||
        "If an account exists for that email, password-reset instructions have been sent."
      );
    } catch (err) {
      setError(err.message || "Could not request a password reset.");
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

        <h1>Forgot password?</h1>
        <p className="muted">
          Enter your registered email address to request a password-reset link.
        </p>

        {message && <div className="notice">{message}</div>}
        {error && <div className="notice error">{error}</div>}

        <form onSubmit={submit}>
          <label>
            Email address
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send reset instructions"}
          </button>
        </form>

        <p className="muted center">
          Remember your password? <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

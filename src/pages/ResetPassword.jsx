
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!token.trim()) {
      setError("Your reset token is missing. Please use the link from your email.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api("/auth/reset-password", {
        method: "POST",
        body: {
          token: token.trim(),
          password
        }
      });

      navigate("/login", {
        replace: true,
        state: {
          notice: response?.message || "Your password has been reset. Please sign in."
        }
      });
    } catch (err) {
      setError(err.message || "Password reset failed. Your token may have expired.");
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

        <h1>Reset your password</h1>
        <p className="muted">
          Enter your reset token and choose a new password.
        </p>

        {error && <div className="notice error">{error}</div>}

        <form onSubmit={submit}>
          <label>
            Reset token
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your reset token"
            />
          </label>

          <label>
            New password
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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

          <label>
            Confirm new password
            <div className="password-field">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm((current) => !current)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Resetting password..." : "Reset password"}
          </button>
        </form>

        <p className="muted center">
          <Link to="/login">Return to login</Link>
        </p>
      </div>
    </div>
  );
}

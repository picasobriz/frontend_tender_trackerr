
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "contractor"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api("/auth/register", {
        method: "POST",
        body: {
          ...form,
          email: form.email.trim().toLowerCase()
        }
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
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

        <h1>Create account</h1>

        {error && (
          <div className="notice error">{error}</div>
        )}

        <form onSubmit={submit}>
          <label>
            Full name / Organization
            <input
              name="name"
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={change}
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={change}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              minLength={8}
              maxLength={128}
              required
              value={form.password}
              onChange={change}
            />
          </label>

          <label>
            Account type
            <select
              name="role"
              value={form.role}
              onChange={change}
            >
              <option value="contractor">Contractor</option>
              <option value="auditor">Auditor</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="muted center">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

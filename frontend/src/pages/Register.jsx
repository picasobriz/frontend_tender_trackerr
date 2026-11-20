import { useState } from "react";
import { Link } from "react-router-dom";
import Notice from "../components/Notice";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "contractor"
  });

  const [token, setToken] = useState("");
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const update = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: form
      });
      setMessage(data.message);
      setRegistered(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await api("/auth/verify", {
        method: "POST",
        body: { token }
      });
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card form auth">
      <h2>{registered ? "Verify your account" : "Create an account"}</h2>

      <Notice>{error || message}</Notice>

      {!registered ? (
        <form onSubmit={register}>
          <input
            placeholder="Full name"
            required
            maxLength={100}
            value={form.name}
            onChange={update("name")}
          />

          <input
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={update("email")}
          />

          <input
            type="password"
            placeholder="Password (8–128 characters)"
            minLength={8}
            maxLength={128}
            required
            value={form.password}
            onChange={update("password")}
          />

          <select value={form.role} onChange={update("role")}>
            <option value="contractor">Contractor</option>
            <option value="auditor">Auditor</option>
          </select>

          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={verify}>
          <input
            placeholder="Verification token from your email"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button type="submit">Verify account</button>
        </form>
      )}

      <p className="muted">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}

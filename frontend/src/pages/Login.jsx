
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notice from "../components/Notice";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card form auth" onSubmit={submit}>
      <h2>Log in</h2>

      <Notice>{error}</Notice>

      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={set("email")}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={set("password")}
      />

      <button>Log in</button>

      <span className="muted">
        New here? <Link to="/register">Create an account</Link>
      </span>
    </form>
  );
}

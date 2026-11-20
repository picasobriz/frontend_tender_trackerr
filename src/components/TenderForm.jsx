import { useState } from "react";
import { api } from "../api";
import UploadButton from "./UploadButton";

const EMPTY = { title: "", category: "", description: "", budget: "", deadline_date: "", cover_image_url: "" };

export default function TenderForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      await api("/tenders", { method: "POST", body: { ...form, budget: Number(form.budget), deadline_date: new Date(form.deadline_date).toISOString() } });
      onCreated?.(); setForm(EMPTY);
    } catch (x) { setError(x.message); } finally { setLoading(false); }
  }

  return <form className="card form-card" onSubmit={submit}>
    <h3>Create tender</h3>{error && <div className="notice error">{error}</div>}
    <label>Title<input name="title" required maxLength={200} value={form.title} onChange={change} /></label>
    <label>Category<input name="category" required maxLength={80} value={form.category} onChange={change} /></label>
    <label>Description<textarea name="description" required value={form.description} onChange={change} /></label>
    <label>Budget<input name="budget" type="number" min="1" required value={form.budget} onChange={change} /></label>
    <label>Deadline<input name="deadline_date" type="datetime-local" required value={form.deadline_date} onChange={change} /></label>
    <UploadButton kind="cover" onUploaded={url => setForm(f => ({ ...f, cover_image_url: url }))} />
    {form.cover_image_url && <p className="muted">Cover image uploaded.</p>}
    <button disabled={loading}>{loading ? "Creating..." : "Create Tender"}</button>
  </form>;
}

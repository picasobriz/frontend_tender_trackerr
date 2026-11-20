import { useState } from "react";
import { api } from "../api";

export default function TenderForm({ onCreated }) {
  const [form, setForm] = useState({ title: "", description: "", budget: "", deadline: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit(e) { e.preventDefault(); setLoading(true); setError(""); try { await api("/tenders", { method: "POST", body: { ...form, budget: Number(form.budget) } }); onCreated?.(); setForm({ title:"",description:"",budget:"",deadline:"" }); } catch (x) { setError(x.message); } finally { setLoading(false); } }
  return <form className="card form-card" onSubmit={submit}><h3>Create tender</h3>{error && <div className="notice">{error}</div>}<label>Title<input name="title" required value={form.title} onChange={change}/></label><label>Description<textarea name="description" required value={form.description} onChange={change}/></label><label>Budget<input name="budget" type="number" min="0" required value={form.budget} onChange={change}/></label><label>Deadline<input name="deadline" type="datetime-local" required value={form.deadline} onChange={change}/></label><button disabled={loading}>{loading ? "Creating..." : "Create Tender"}</button></form>;
}

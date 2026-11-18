import { useState } from "react";
import { api } from "../api";
import Notice from "./Notice";
import UploadButton from "./UploadButton";

const EMPTY = { title: "", category: "", budget: "", description: "", deadline_date: "", cover_image_url: "" };

export default function TenderForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
  e.preventDefault();

  try {
    const body = {
      ...form,
      budget: Number(form.budget),
      deadline_date: new Date(form.deadline_date).toISOString()
    };

    onCreated(
      await api("/tenders", {
        method: "POST",
        body
      })
    );
  } catch (err) {
    setError(err.message);
  }
};
 return (
    <form className="card form" onSubmit={submit}>
      <h3>Publish a tender</h3>
      <Notice>{error}</Notice>
      <input placeholder="Title" required value={form.title} onChange={set("title")} />
      <input placeholder="Category (e.g. Construction)" required value={form.category} onChange={set("category")} />
      <input type="number" min="1" step="any" placeholder="Budget" required value={form.budget} onChange={set("budget")} />
      <label>Deadline</label>
      <input type="datetime-local" required value={form.deadline_date} onChange={set("deadline_date")} />
      <textarea rows="4" placeholder="Description" required value={form.description} onChange={set("description")} />

    
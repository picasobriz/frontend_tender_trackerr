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

    
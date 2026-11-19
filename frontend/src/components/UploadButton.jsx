import { useState } from "react";
import { api } from "../api";
import Notice from "./Notice";

// Pick a file, send it to /api/uploads (Cloudinary) and hand the stored URL to onDone.
export default function UploadButton({ kind, label, onDone }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const body = new FormData();
    body.append("file", file);
    body.append("kind", kind);
    setBusy(true);
    try {
      onDone((await api("/uploads", { method: "POST", body })).url);
      setError("");
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="file" onChange={pick} disabled={busy} />
      {busy && <p className="muted pulse">Uploading...</p>}
      <Notice>{error}</Notice>
    </div>
  );
}
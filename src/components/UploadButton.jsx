import { useState } from "react";
import { api } from "../api";

// kind: "cover" | "bid" | "logo". Uploads to Cloudinary through the API and hands back the file URL.
export default function UploadButton({ kind, onUploaded }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pick(e) {
    const file = e.target.files[0];
    if (!file) return;
    const body = new FormData();
    body.append("file", file); body.append("kind", kind);
    setBusy(true); setError("");
    try { onUploaded((await api("/uploads", { method: "POST", body })).url); }
    catch (x) { setError(x.message); }
    finally { setBusy(false); e.target.value = ""; }
  }

  return <>
    <label className="upload-button">{busy ? "Uploading..." : "Upload file"}<input type="file" hidden onChange={pick} /></label>
    {error && <div className="notice error">{error}</div>}
  </>;
}

import { useState } from "react";
import { api } from "../api";
import Notice from "./Notice";
import UploadButton from "./UploadButton";

export default function BidForm({ tenderId, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      await api(`/tenders/${tenderId}/bids`, { method: "POST", body: { proposed_amount: Number(amount), proposal_text: proposal, ...(documentUrl && { document_url: documentUrl }) } });
      setAmount(""); setProposal(""); setDocumentUrl(""); onSuccess?.();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  return <form className="card form-card" onSubmit={submit}>
    <h3>Submit a bid</h3><Notice>{error}</Notice>
    <label>Proposed amount<input type="number" min="1" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} /></label>
    <label>Proposal<textarea rows="5" required value={proposal} onChange={e => setProposal(e.target.value)} /></label>
    <label>Supporting document URL<input value={documentUrl} onChange={e => setDocumentUrl(e.target.value)} placeholder="https://... or use Upload" /></label>
    <UploadButton kind="bid" onUploaded={setDocumentUrl} />
    <button disabled={loading}>{loading ? "Submitting..." : "Submit Bid"}</button>
  </form>;
}

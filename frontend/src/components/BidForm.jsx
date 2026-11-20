
import { useState } from "react";
import { api } from "../api";
import Notice from "./Notice";
import UploadButton from "./UploadButton";

export default function BidForm({ tenderId, onDone }) {
  const [form, setForm] = useState({
    proposed_amount: "",
    proposal_text: "",
    document_url: ""
  });

  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api(`/tenders/${tenderId}/bids`, {
        method: "POST",
        body: {
          ...form,
          proposed_amount: Number(form.proposed_amount)
        }
      });

      onDone();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>Submit your bid</h3>

      <Notice>{error}</Notice>

      <input
        type="number"
        min="1"
        step="any"
        placeholder="Proposed amount"
        required
        value={form.proposed_amount}
        onChange={set("proposed_amount")}
      />

      <textarea
        rows="4"
        placeholder="Describe your proposal"
        required
        value={form.proposal_text}
        onChange={set("proposal_text")}
      />

      <UploadButton
        kind="bid"
        label="Supporting document (PDF or Word, optional)"
        onDone={(url) =>
          setForm({ ...form, document_url: url })
        }
      />

      {form.document_url && (
        <Notice type="success">Document attached.</Notice>
      )}

      <button>Submit bid</button>
    </form>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import BidForm from "../components/BidForm";
import Notice from "../components/Notice";

export default function TenderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: tender, error, loading, reload } = useFetch(`/tenders/${id}`);
  const [msg, setMsg] = useState("");

  const act = async (call, done) => { try { await call(); setMsg(""); done(); } catch (e) { setMsg(e.message); } };
  const setStatus = (status) => act(() => api(`/tenders/${id}`, { method: "PATCH", body: { status } }), reload);
  const remove = () => window.confirm("Delete this tender and all its bids?") && act(() => api(`/tenders/${id}`, { method: "DELETE" }), () => navigate("/tenders"));

  if (loading && !tender) return <p className="muted">Loading tender details...</p>;
  if (error) return <div className="notice error">{error}</div>;
  if (!tender) return null;
  const owner = user?.role === "admin" && tender.created_by_id === user.id;

  return <div>
    <div className="card detail-card">
      <span className="eyebrow">TENDER #{tender.id} · {tender.category}</span>
      <h2>{tender.title}</h2>
      <p>{tender.description}</p>
      {tender.cover_image_url && <img src={tender.cover_image_url} alt="" style={{ maxWidth: "100%", borderRadius: 8 }} />}
      <div className="detail-grid">
        <div><span>Budget</span><strong>KSh {Number(tender.budget || 0).toLocaleString()}</strong></div>
        <div><span>Deadline</span><strong>{tender.deadline_date || tender.deadline || "—"}</strong></div>
        <div><span>Status</span><strong>{tender.status || "open"}</strong></div>
      </div>
      <Notice>{msg}</Notice>
      {owner && <div className="row bid-actions">
        {tender.status === "open" && <button onClick={() => setStatus("closed")}>Close tender</button>}
        {tender.status === "closed" && <button className="green" onClick={() => setStatus("open")}>Reopen tender</button>}
        <button onClick={remove}>Delete</button>
      </div>}
    </div>
    {user?.role === "contractor" && (tender.status === "open"
      ? <BidForm tenderId={id} onSuccess={() => setMsg("Bid submitted. Track it under Bids.")} />
      : <p className="muted">This tender is no longer accepting bids.</p>)}
  </div>;
}

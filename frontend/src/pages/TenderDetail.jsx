import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import BidForm from "../components/BidForm";
import BidRow from "../components/BidRow";
import Notice from "../components/Notice";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

export default function TenderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: t, error, loading, reload } = useFetch(`/tenders/${id}`);
  const isOwner = user.role === "admin" && t?.created_by_id === user.id;
  const bids = useFetch(isOwner ? `/bids?tender_id=${id}&per_page=50` : null);
  const [msg, setMsg] = useState("");
  const [bidSent, setBidSent] = useState(false);

  const run = async (fn) => {
    try { await fn(); setMsg(""); } catch (e) { setMsg(e.message); }
  };
  const setStatus = (status) => run(async () => { await api(`/tenders/${id}`, { method: "PATCH", body: { status } }); reload(); });
  const review = (bidId, status) => run(async () => { await api(`/bids/${bidId}`, { method: "PATCH", body: { status } }); reload(); bids.reload(); });
  const remove = () => window.confirm("Delete this tender and all its bids?") && run(async () => { await api(`/tenders/${id}`, { method: "DELETE" }); navigate("/tenders"); });

   if (loading && !t) return <p className="muted pulse">Loading...</p>;
  if (error) return <Notice>{error}</Notice>;
  return (
    <>
      <Link to="/tenders">&larr; Back to tenders</Link>
      <div className="card" style={{ marginTop: 12 }}>
        {t.cover_image_url && <img className="cover" src={t.cover_image_url} alt="" />}
        <div className="row between"><h2>{t.title}</h2><span className={`badge ${t.status}`}>{t.status}</span></div>
        <p className="muted">{t.category} &middot; Budget {t.budget.toLocaleString()} &middot; Closes {t.deadline_date}</p>
        <p>{t.description}</p>
        {isOwner && (
          <div className="row">
            {t.status === "open" && <button className="ghost" onClick={() => setStatus("closed")}>Close tender</button>}
            {t.status === "closed" && <button className="green" onClick={() => setStatus("open")}>Reopen tender</button>}
            <button onClick={remove}>Delete</button>
          </div>
        )}
      </div>
      <Notice>{msg}</Notice>
      {user.role === "contractor" && t.status === "open" && (
        bidSent ? <Notice type="success">Bid submitted. Track it under Bids.</Notice> : <BidForm tenderId={id} onDone={() => setBidSent(true)} />
      )}
      {isOwner && (
        <>
          <h3>Proposals received</h3>
          {bids.data?.items.length === 0 && <p className="muted">No bids yet.</p>}
          {bids.data?.items.map((b) => <BidRow key={b.id} bid={b} onReview={review} />)}
        </>
      )}
    </>
  );
}

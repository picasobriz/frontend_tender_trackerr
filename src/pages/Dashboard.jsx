import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, getError } from "../api";
import { useAuth } from "../context/AuthContext";

// Backend returns different numbers per role (GET /api/dashboard): label each one.
const CARDS = {
  admin: { tenders_created: "Tenders created", open_tenders: "Open tenders", proposals_received: "Proposals received", pending_review: "Pending review" },
  contractor: { my_bids: "My bids", pending: "Pending", accepted: "Accepted" },
  auditor: { awarded_tenders: "Awarded tenders", total_awarded_value: "Awarded value (KSh)", bids_on_awarded: "Bids on awarded" },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => { api("/dashboard").then(setD).catch(e => setErr(getError(e))); }, []);

  const cards = Object.entries(CARDS[d?.role || user?.role] || {});
  return <div className="dashboard-page">
    <section className="dashboard-hero"><div>
      <span className="eyebrow">TENDERTRACK</span>
      <h1>Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
      <p>Track tenders, submit bids, manage opportunities and monitor procurement activity from one place.</p>
      <div className="dashboard-actions">
        <Link to="/tenders" className="btn-primary">Browse Tenders</Link>
        {user?.role !== "auditor" && <Link to="/bids" className="btn-secondary">{user?.role === "admin" ? "Proposals" : "My Bids"}</Link>}
      </div>
    </div>
      <div className="hero-visual">
        <img src="/images/construction-team.png" alt="Construction team reviewing a project blueprint" />
      </div>
    </section>
    {err && <div className="notice error">{err}</div>}
    <section className="dashboard-stats">
      {cards.map(([key, label]) => <div className="stat-card" key={key}><span>{label}</span><strong>{Number(d?.[key] ?? 0).toLocaleString()}</strong></div>)}
    </section>
    {d?.upcoming_deadlines?.length > 0 && <section className="dashboard-card">
      <span className="eyebrow">CLOSING SOON</span>
      {d.upcoming_deadlines.map(t => <p key={t.id}><Link to={`/tenders/${t.id}`}>{t.title}</Link> <span className="muted">closes {t.deadline_date}</span></p>)}
    </section>}
  </div>;
}

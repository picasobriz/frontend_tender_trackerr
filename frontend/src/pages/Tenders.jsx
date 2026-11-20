import { useState } from "react";
import { Link } from "react-router-dom";
import Notice from "../components/Notice";
import Pager from "../components/Pager";
import TenderForm from "../components/TenderForm";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

export default function Tenders() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin";
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(isAdmin ? "" : "open");
  const [showForm, setShowForm] = useState(false);
  const { data, error, loading, reload } = useFetch(`/tenders?page=${page}&per_page=6${status ? `&status=${status}` : ""}`);

  return (
    <>
      <div className="row between">
        <h2>Tenders</h2>
        <div className="row">
          {user.role !== "auditor" && (
            <select className="inline" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              {isAdmin && <option value="">All statuses</option>}
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="awarded">Awarded</option>
            </select>
          )}
          {isAdmin && <button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ New tender"}</button>}
        </div>
      </div>
      {showForm && <TenderForm onCreated={() => { setShowForm(false); setPage(1); reload(); }} />}
      <Notice>{error}</Notice>
      {loading && !data && <p className="muted pulse">Loading...</p>}
      {data?.items.length === 0 && <p className="muted">No tenders to show yet.</p>}
      {data?.items.map((t) => (
        <Link key={t.id} to={`/tenders/${t.id}`} className="card item">
          <div className="row between"><strong>{t.title}</strong><span className={`badge ${t.status}`}>{t.status}</span></div>
          <span className="muted">{t.category} &middot; Budget {t.budget.toLocaleString()} &middot; Closes {t.deadline_date}</span>
        </Link>
      ))}
      {data && <Pager data={data} page={page} setPage={setPage} />}
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import Notice from "../components/Notice";
import UploadButton from "../components/UploadButton";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

const LABELS = {
  admin: { tenders_created: "Tenders created", open_tenders: "Open tenders", proposals_received: "Proposals received", pending_review: "Awaiting review" },
  contractor: { my_bids: "My bids", pending: "Pending", accepted: "Accepted" },
  auditor: { awarded_tenders: "Awarded tenders", total_awarded_value: "Total awarded value", bids_on_awarded: "Bids on awarded tenders" },
};

// The API returns role-specific numbers; this page just shows the matching labels.
export default function Dashboard() {
  const { user } = useAuth();
  const { data, error, loading } = useFetch("/dashboard");
  const [logo, setLogo] = useState(user.company_logo_url);

  if (loading) return <p className="muted pulse">Loading...</p>;
  if (error) return <Notice>{error}</Notice>;
  return (
    <>
      <div className="row between">
        <h2>{data.role[0].toUpperCase() + data.role.slice(1)} dashboard</h2>
        <div className="row">
          {logo && <img className="logo" src={logo} alt="Company logo" />}
          <UploadButton kind="logo" label="Company logo" onDone={setLogo} />
        </div>
      </div>
      <div className="grid">
        {Object.entries(LABELS[data.role]).map(([key, label]) => (
          <div key={key} className="card stat"><b>{data[key].toLocaleString()}</b><span>{label}</span></div>
        ))}
      </div>
      {data.upcoming_deadlines && (
        <>
          <h3>Upcoming deadlines</h3>
          {data.upcoming_deadlines.length === 0 && <p className="muted">No open tenders right now.</p>}
          {data.upcoming_deadlines.map((t) => (
            <Link key={t.id} to={`/tenders/${t.id}`} className="card item">
              <strong>{t.title}</strong> <span className="muted">closes {t.deadline_date}</span>
            </Link>
          ))}
        </>
      )}
    </>
  );
}
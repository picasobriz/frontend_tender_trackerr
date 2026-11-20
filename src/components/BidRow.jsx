export default function BidRow({ bid, onReview }) {
  const amount = Number(bid.proposed_amount || 0).toLocaleString();
  const submitted = bid.submitted_at ? new Date(bid.submitted_at).toLocaleString() : "—";
  return <div className="card item bid-card">
    <div className="row between"><div><strong>{bid.bidder_name || "Contractor"}</strong>{bid.tender_title && <p className="muted">{bid.tender_title}</p>}</div><span className={`badge ${bid.status}`}>{bid.status}</span></div>
    <div className="bid-meta"><div><span className="muted">Proposed amount</span><strong>KSh {amount}</strong></div><div><span className="muted">Submitted</span><strong>{submitted}</strong></div></div>
    <p>{bid.proposal_text || "No proposal description provided."}</p>
    {bid.document_url && <a href={bid.document_url} target="_blank" rel="noreferrer" className="document-link">View supporting document</a>}
    {onReview && bid.status === "pending" && <div className="row bid-actions"><button className="green" onClick={() => onReview(bid.id, "accepted")}>Accept</button><button onClick={() => onReview(bid.id, "rejected")}>Reject</button></div>}
  </div>;
}

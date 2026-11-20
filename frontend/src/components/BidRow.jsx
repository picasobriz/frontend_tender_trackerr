export default function BidRow({ bid, onReview }) {
  return (
    <div className="card item">
      <div className="row between">
        <strong>{bid.contractor_name || bid.user_name || bid.contractor?.name || "Contractor"}</strong>
        <span className={`badge ${bid.status}`}>{bid.status}</span>
      </div>

      {bid.tender_title && <p>{bid.tender_title}</p>}

      <p>{bid.description || bid.proposal || "No proposal description provided."}</p>

      <p className="muted">
        Amount: {Number(bid.amount || bid.bid_amount || 0).toLocaleString()}
      </p>

      {onReview && bid.status === "pending" && (
        <div className="row">
          <button className="green" onClick={() => onReview(bid.id, "accepted")}>
            Accept
          </button>
          <button onClick={() => onReview(bid.id, "rejected")}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

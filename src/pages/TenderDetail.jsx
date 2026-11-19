import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function TenderDetail() {
  const { id } = useParams();
  const [tender, setTender] = useState(null);

  useEffect(() => {
    apiFetch(`/tenders/${id}`).then(setTender).catch(console.error);
  }, [id]);

  if (!tender) return <p className="muted">Loading tender details...</p>;

  return (
    <div className="card">
      <h2>{tender.title}</h2>
      <p>{tender.description}</p>
      <p><strong>Budget:</strong> ${tender.budget?.toLocaleString()}</p>
      <p><strong>Deadline:</strong> {tender.deadline}</p>
    </div>
  );
}

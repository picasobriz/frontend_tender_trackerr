import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";
import Pager from "../components/Pager";

export default function TenderList() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiFetch(`/tenders?skip=${(page - 1) * 10}&limit=10`)
      .then((res) => setData(Array.isArray(res) ? { items: res, page, pages: 1 } : res))
      .catch(console.error);
  }, [page]);

  return (
    <div>
      <h2>Available Tenders</h2>
      {data.items?.map((t) => (
        <div key={t.id} className="card">
          <h3><Link to={`/tenders/${t.id}`}>{t.title}</Link></h3>
          <p className="muted">{t.description}</p>
          <strong>Budget: ${t.budget?.toLocaleString()}</strong>
        </div>
      ))}
      <Pager data={data} page={page} setPage={setPage} />
    </div>
  );
}

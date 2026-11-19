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
      </div>
    </>
  );
}

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
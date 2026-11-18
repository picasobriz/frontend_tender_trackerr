import { useState } from "react";
import { api } from "../api";
import BidRow from "../components/BidRow";
import Notice from "../components/Notice";
import Pager from "../components/Pager";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

export default function Bids() {
  const { user } = useAuth();
  const isAdmin = user.role === "admin";
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState(""); 
  const { data, error, loading, reload } = useFetch(`/bids?page=${page}&per_page=6`);

const review = async (id, status) => {
    try {
      await api(`/bids/${id}`, { method: "PATCH", body: { status } });
      setMsg("");
      reload();
    } catch (e) {
      setMsg(e.message);
    }
  };

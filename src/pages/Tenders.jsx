import { useState } from "react";
import { Link } from "react-router-dom";
import Notice from "../components/Notice";
import Pager from "../components/Pager";
import TenderForm from "../components/TenderForm";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

export default function Tenders() {
  return (
    <>
      <div className="row between">
        <h2>Tenders</h2>
      </div>
    </>
  );
}

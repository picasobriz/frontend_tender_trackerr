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
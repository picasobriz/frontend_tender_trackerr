import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import BidForm from "../components/BidForm";

export default function TenderDetail(){const {id}=useParams();const {user}=useAuth();const {data:tender,error,loading,reload}=useFetch(`/tenders/${id}`);if(loading&&!tender)return <p className="muted">Loading tender details...</p>;if(error)return <div className="notice error">{error}</div>;if(!tender)return null;return <div><div className="card detail-card"><span className="eyebrow">TENDER #{tender.id}</span><h2>{tender.title}</h2><p>{tender.description}</p><div className="detail-grid"><div><span>Budget</span><strong>KSh {Number(tender.budget||0).toLocaleString()}</strong></div><div><span>Deadline</span><strong>{tender.deadline||"—"}</strong></div><div><span>Status</span><strong>{tender.status||"open"}</strong></div></div></div>{user?.role!=="admin"&&<BidForm tenderId={id} onSuccess={reload}/>}</div>}

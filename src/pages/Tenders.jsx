import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import Pager from "../components/Pager";
import Notice from "../components/Notice";
import TenderForm from "../components/TenderForm";

export default function Tenders(){const {user}=useAuth();const [page,setPage]=useState(1);const [refresh,setRefresh]=useState(0);const [show,setShow]=useState(false);const {data,error,loading}=useFetch(`/tenders?page=${page}&per_page=8&refresh=${refresh}`);return <><div className="page-heading"><div><span className="eyebrow">PROCUREMENT</span><h2>Available Tenders</h2></div>{user?.role==="admin"&&<button onClick={()=>setShow(!show)}>{show?"Close":"Create Tender"}</button>}</div>{show&&<TenderForm onCreated={()=>{setShow(false);setRefresh(x=>x+1)}}/>}<Notice>{error}</Notice>{loading&&!data&&<p className="muted pulse">Loading tenders...</p>}{data?.items?.length===0&&<div className="card empty-state"><h3>No tenders available</h3><p className="muted">Check back later for new procurement opportunities.</p></div>}{data?.items?.map(t=><div className="card tender-card" key={t.id}><div className="row between"><div><h3><Link to={`/tenders/${t.id}`}>{t.title}</Link></h3><p className="muted">{t.description}</p></div><span className="badge open">{t.status||"open"}</span></div><div className="tender-meta"><span>Budget<strong>KSh {Number(t.budget||0).toLocaleString()}</strong></span><span>Deadline<strong>{t.deadline||"—"}</strong></span></div></div>)}{data&&<Pager data={data} page={page} setPage={setPage}/>}</>}

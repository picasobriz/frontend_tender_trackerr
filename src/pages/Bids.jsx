import { useState } from "react";
import { api } from "../api";
import BidRow from "../components/BidRow";
import Notice from "../components/Notice";
import Pager from "../components/Pager";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

export default function Bids(){const {user}=useAuth();const isAdmin=user?.role==="admin";const [page,setPage]=useState(1);const [msg,setMsg]=useState("");const {data,error,loading,reload}=useFetch(`/bids?page=${page}&per_page=6`);const review=async(id,status)=>{try{await api(`/bids/${id}`,{method:"PATCH",body:{status}});setMsg("");reload();}catch(e){setMsg(e.message)}};return <><h2>{isAdmin?"Proposals received":"My bids"}</h2><Notice>{error||msg}</Notice>{loading&&!data&&<p className="muted pulse">Loading...</p>}{data?.items?.length===0&&<p className="muted">{isAdmin?"No proposals yet.":"You have not placed any bids yet. Browse open tenders to get started."}</p>}{data?.items?.map(b=><BidRow key={b.id} bid={b} onReview={isAdmin?review:undefined}/>)}{data&&<Pager data={data} page={page} setPage={setPage}/>}</>}

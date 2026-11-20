import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TenderDetail from "../pages/TenderDetail";
import { AuthProvider } from "../context/AuthContext";

describe("TenderDetail", () => {
  it("renders tender details", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({id:5,title:"Supply Computers",description:"ICT equipment",budget:500000,deadline:"2026-12-15",status:"open"}), {status:200}))); render(<MemoryRouter initialEntries={["/tenders/5"]}><AuthProvider><Routes><Route path="/tenders/:id" element={<TenderDetail/>}/></Routes></AuthProvider></MemoryRouter>); await waitFor(()=>expect(screen.getByText("Supply Computers")).toBeInTheDocument()); expect(screen.getByText("ICT equipment")).toBeInTheDocument(); });
});

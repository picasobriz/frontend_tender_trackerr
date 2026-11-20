import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Tenders from "../pages/Tenders";
import { AuthProvider } from "../context/AuthContext";

describe("Tenders", () => {
  it("loads and displays tenders", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({items:[{id:1,title:"Road Works",description:"Repair road",budget:100000,deadline:"2026-12-01",status:"open"}],page:1,pages:1}), {status:200}))); render(<MemoryRouter><AuthProvider><Tenders/></AuthProvider></MemoryRouter>); await waitFor(()=>expect(screen.getByText("Road Works")).toBeInTheDocument()); expect(screen.getByText(/100,000/)).toBeInTheDocument(); });
});

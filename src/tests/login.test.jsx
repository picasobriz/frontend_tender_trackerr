import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";

beforeEach(() => { localStorage.clear(); vi.restoreAllMocks(); });
const renderLogin = () => render(<MemoryRouter><AuthProvider><Login/></AuthProvider></MemoryRouter>);

describe("Login", () => {
  it("renders email, password and sign in", () => { renderLogin(); expect(screen.getByLabelText(/email/i)).toBeInTheDocument(); expect(screen.getByLabelText(/password/i)).toBeInTheDocument(); expect(screen.getByRole("button", {name:/sign in/i})).toBeInTheDocument(); });
  it("shows backend login error", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({detail:"Invalid credentials"}), {status:401}))); renderLogin(); await userEvent.type(screen.getByLabelText(/email/i), "a@test.com"); await userEvent.type(screen.getByLabelText(/password/i), "wrong"); await userEvent.click(screen.getByRole("button", {name:/sign in/i})); expect(await screen.findByText("Invalid credentials")).toBeInTheDocument(); });
});

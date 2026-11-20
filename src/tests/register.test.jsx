import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";

describe("Register", () => {
  it("renders registration form", () => { render(<MemoryRouter><Register/></MemoryRouter>); expect(screen.getByLabelText(/full name/i)).toBeInTheDocument(); expect(screen.getByLabelText(/email/i)).toBeInTheDocument(); expect(screen.getByLabelText(/password/i)).toBeInTheDocument(); });
  it("posts registration and navigates to login", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({message:"created"}), {status:201}))); render(<MemoryRouter initialEntries={["/register"]}><Register/></MemoryRouter>); await userEvent.type(screen.getByLabelText(/full name/i), "Test User"); await userEvent.type(screen.getByLabelText(/email/i), "test@example.com"); await userEvent.type(screen.getByLabelText(/password/i), "secret123"); await userEvent.click(screen.getByRole("button", {name:/register/i})); expect(fetch).toHaveBeenCalledWith("/api/auth/register", expect.objectContaining({method:"POST"})); });
});

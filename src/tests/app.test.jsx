import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => { it("shows login page for unauthenticated visitor", () => { localStorage.clear(); render(<App/>); expect(screen.getByText(/welcome back/i)).toBeInTheDocument(); }); });

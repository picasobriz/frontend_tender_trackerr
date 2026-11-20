import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BidRow from "../components/BidRow";

describe("BidRow", () => {
  it("renders bidder, amount and status", () => { render(<BidRow bid={{id:1,bidder_name:"Jane",proposed_amount:250000,status:"pending",proposal_text:"Good proposal"}}/>); expect(screen.getByText("Jane")).toBeInTheDocument(); expect(screen.getByText("KSh 250,000")).toBeInTheDocument(); expect(screen.getByText("pending")).toBeInTheDocument(); });
  it("calls review callback", async () => { const fn=vi.fn(); render(<BidRow bid={{id:2,bidder_name:"Jane",proposed_amount:10,status:"pending"}} onReview={fn}/>); await userEvent.click(screen.getByRole("button", {name:/accept/i})); expect(fn).toHaveBeenCalledWith(2,"accepted"); });
});

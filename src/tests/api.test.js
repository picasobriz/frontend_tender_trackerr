import { describe, it, expect, beforeEach, vi } from "vitest";
import { api } from "../api";

describe("api", () => {
  beforeEach(() => { localStorage.clear(); vi.restoreAllMocks(); });
  it("adds bearer token", async () => {
    localStorage.setItem("token", "abc");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ok:true}), {status:200})));
    await api("/dashboard");
    expect(fetch).toHaveBeenCalledWith("/api/dashboard", expect.objectContaining({headers: expect.objectContaining({Authorization:"Bearer abc"})}));
  });
  it("throws backend error message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({detail:"Bad request"}), {status:400})));
    await expect(api("/x")).rejects.toThrow("Bad request");
  });
});

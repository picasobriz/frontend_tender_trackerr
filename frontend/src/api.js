const BASE = import.meta.env.VITE_API_URL || "/api";

export const wake = () =>
  fetch(`${BASE}/health`).catch(() => {});

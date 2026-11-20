// Deployed Flask API on Render. Set VITE_API_URL=/api in .env to use a local Flask through the vite proxy.
const RENDER = "https://backend-tender-trackerr.onrender.com/api";
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === "test" ? "/api" : RENDER);

export const wake = () => fetch(`${API_BASE}/health`).catch(() => {}); // Render sleeps when idle; ping early

// Backend errors look like {error, details: {field: message}}; show the field messages when present.
function errorText(data) {
  const fields = data.details && typeof data.details === "object"
    ? Object.entries(data.details).map(([k, v]) => `${k}: ${v}`).join("; ") : "";
  return data.detail || fields || data.message || data.error || "API request failed";
}

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const isForm = options.body instanceof FormData; // uploads: the browser sets the multipart header itself
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body && !isForm ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    body: options.body && !isForm && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body
  }).catch(() => {
    throw new Error("Cannot reach the server. It may be waking up, please try again in a minute.");
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    if (response.status === 401 && !endpoint.startsWith("/auth/login")) { // expired or missing token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.assign("/login");
    }
    throw new Error(errorText(data));
  }
  return response.status === 204 ? null : response.json();
}

export const getError = (error) => error?.message || "Something went wrong.";

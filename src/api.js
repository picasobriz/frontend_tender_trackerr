
const API_BASE = "/api";

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    body:
      options.body && typeof options.body !== "string"
        ? JSON.stringify(options.body)
        : options.body
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));

    throw new Error(
      data.details?.message ||
      data.detail ||
      data.message ||
      data.error ||
      "API request failed"
    );
  }

  if (response.status === 204) return null;

  return response.json();
}

export function getError(error) {
  return error?.message || "Something went wrong.";
}


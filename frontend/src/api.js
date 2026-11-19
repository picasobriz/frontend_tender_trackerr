const BASE = import.meta.env.VITE_API_URL || "/api";

export const wake = () =>
  fetch(`${BASE}/health`).catch(() => {});

export async function api(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");
  const isForm = body instanceof FormData;

  let res;

  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        ...(body && !isForm && {
          "Content-Type": "application/json",
        }),
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: body
        ? isForm
          ? body
          : JSON.stringify(body)
        : undefined,
    });
  } catch (error) {
    throw new Error(
      "Cannot reach the server. It may be waking up, please try again in a minute."
    );
  }

  let data = null;

  if (res.status !== 204) {
    try {
      data = await res.json();
    } catch {
      data = {};
    }
  }

  if (res.status === 401 && !path.startsWith("/auth/login")) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!res.ok) {
    const fields = Object.entries(data?.details || {})
      .map(([key, value]) => `${key} ${value}`)
      .join(", ");

    throw new Error(
      fields
        ? `${data?.error || "Request failed"}: ${fields}`
        : data?.error || "Something went wrong"
    );
  }

  return data;
}


import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);
const read = () => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } };
const save = (u) => (u ? localStorage.setItem("user", JSON.stringify(u)) : localStorage.removeItem("user"));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(read);

  // Returning user with a saved token: refresh the profile. If the token expired, api() clears it and goes to /login.
  useEffect(() => {
    if (localStorage.getItem("token")) api("/auth/me").then((u) => { save(u); setUser(u); }).catch(() => {});
  }, []);

  const login = async (email, password) => {
    const { token, user: u } = await api("/auth/login", { method: "POST", body: { email, password } });
    localStorage.setItem("token", token); save(u); setUser(u);
    return u;
  };
  const logout = () => { localStorage.removeItem("token"); save(null); setUser(null); };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

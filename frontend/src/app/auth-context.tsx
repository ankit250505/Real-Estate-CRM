import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { http } from "../api/http";
import type { AuthUser } from "../types/api";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const cached = localStorage.getItem("crm_user");
    return cached ? (JSON.parse(cached) as AuthUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("crm_access_token")) return;
    setLoading(true);
    http
      .get("/auth/me")
      .then((response) => {
        if (user) return;
        setUser({
          id: response.data.user.userId,
          email: response.data.user.email,
          role: response.data.user.role,
          firstName: "Current",
          lastName: "User"
        });
      })
      .finally(() => setLoading(false));
  }, [user]);

  const login = async (payload: { email: string; password: string }) => {
    const response = await http.post("/auth/login", payload);
    localStorage.setItem("crm_access_token", response.data.accessToken);
    localStorage.setItem("crm_refresh_token", response.data.refreshToken);
    localStorage.setItem("crm_user", JSON.stringify(response.data.user));
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("crm_access_token");
    localStorage.removeItem("crm_refresh_token");
    localStorage.removeItem("crm_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

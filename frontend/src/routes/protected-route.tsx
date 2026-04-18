import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../app/auth-context";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-sm text-slate-500">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

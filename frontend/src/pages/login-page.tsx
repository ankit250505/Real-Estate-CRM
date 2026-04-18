import { Navigate } from "react-router-dom";
import { LoginForm } from "../features/auth/login-form";
import { useAuth } from "../app/auth-context";

export function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.2),_transparent_40%),linear-gradient(135deg,_#f5ede2,_#f4f7fb_35%,_#dbeafe)] px-4 py-10">
      <LoginForm />
    </div>
  );
}

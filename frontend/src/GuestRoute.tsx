// GuestRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

export default function GuestRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // if (loading) return <div>Loading...</div>;

  // ログイン済みならトップへ
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

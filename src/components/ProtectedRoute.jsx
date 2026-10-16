import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

/**
 * ProtectedRoute Component
 * Guards private routes by checking the Zustand auth store.
 * If authenticated, renders child routes via <Outlet />.
 * If not, redirects to /login.
 */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

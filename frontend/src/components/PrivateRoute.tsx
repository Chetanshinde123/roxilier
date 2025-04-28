// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";

interface PrivateRouteProps {
  role?: "admin" | "user" | "owner";
}

const PrivateRoute = ({ role }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

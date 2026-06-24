import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
  return <div>Loading...</div>;
}

  if (!auth?.user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
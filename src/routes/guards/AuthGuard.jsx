import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthGuard({
  children,
  allowedRoles = [],
}) {
  const {
    authUser,
    userData,
    loadingAuth,
  } = useAuth();

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(userData?.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
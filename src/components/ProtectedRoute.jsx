import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./protectedRoute.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <div className="protected-route">{children}</div>;
};

export default ProtectedRoute;
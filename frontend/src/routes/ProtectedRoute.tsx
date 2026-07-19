import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.token);

  console.log("ProtectedRoute Token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
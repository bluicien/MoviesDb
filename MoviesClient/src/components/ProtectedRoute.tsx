import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectAccessToken } from "../redux/features/token/tokenSlice";

function ProtectedRoute() {
  const token = useAppSelector(selectAccessToken);

  if (!token){
    return <Navigate to={"/auth/login"} replace />
  }

  return <Outlet />
}

export default ProtectedRoute;

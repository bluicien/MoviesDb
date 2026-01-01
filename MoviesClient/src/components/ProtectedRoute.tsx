import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { getLoadState, selectAccessToken } from "../features/auth/authSlice";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute() {
  const token = useAppSelector(selectAccessToken);
  const loadingState = useAppSelector(getLoadState);

  if (loadingState) {
    return <LoadingSpinner />
  }

  if (!token){
    return <Navigate to={"/auth/login"} replace />
  }

  return <Outlet />
}

export default ProtectedRoute;

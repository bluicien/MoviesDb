import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { getLoadState, selectAccessToken } from "../features/auth/authSlice";
import LoadingSpinner from "./LoadingSpinner";

function PublicRoute() {
  const token = useAppSelector(selectAccessToken);
  const loadingState = useAppSelector(getLoadState);

  if (loadingState) {
    return <LoadingSpinner />
  }

  if (token){
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
}

export default PublicRoute;

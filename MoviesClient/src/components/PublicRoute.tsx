import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/reduxHooks";
import { getLoadState, selectAccessToken } from "../redux/features/token/tokenSlice";
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

import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectAccessToken } from "../redux/features/token/tokenSlice";

function PublicRoute() {
  const token = useAppSelector(selectAccessToken);

  if (token){
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
}

export default PublicRoute;

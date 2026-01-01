import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { clearToken, setFinishLoading, setNewAccessToken } from "../features/auth/authSlice";

function Root() {

  const dispatch = useAppDispatch();

  // Check authentication state on page refresh.
  useEffect(() => {
    const initializeAuth = async () => {
      const url = `${import.meta.env.VITE_MOVIES_API}/api/auth/refresh`;
      try {
        const result: Response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        })

        if (!result.ok)
        {
          throw new Error("Authentication Failed.")
        }

        const data = await result.json();
        if (data.accessToken != null) {
          dispatch(setNewAccessToken(data.accessToken));
        }
        

      } catch (error) {
        dispatch(clearToken());
        if (error instanceof Error){
          console.error(error.message);
        }
      } finally {
        dispatch(setFinishLoading());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-1 relative bg-gray-700" >
      <SideBar />
      <div className="flex flex-col w-full h-full text-white">
        <header className="flex items-center w-full p-4 md:pl-40" >
          <h1 className="text-4xl md:text-6xl text-white font-bold text-shadow-md text-shadow-black/50" >The Movies Database</h1>
        </header>
        <div className="flex flex-col h-full justify-center flex-1 p-10 ml-10" >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root;
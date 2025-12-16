import { Outlet } from "react-router";
import SideBar from "./SideBar";

function Root() {
  return (
    <div className="h-screen flex bg-gray-700" >
      <SideBar />
      <div className="w-full">
        <header className="flex items-center h-30 w-full p-4 pl-50" >
          <h1 className="text-6xl text-white font-bold text-shadow-md text-shadow-black/50" >The Movies Database</h1>
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default Root;
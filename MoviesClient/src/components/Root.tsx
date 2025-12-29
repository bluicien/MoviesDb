import { Outlet } from "react-router";
import SideBar from "./SideBar";

function Root() {
  return (
    <div className="min-h-screen h-screen flex relative bg-gray-700" >
      <SideBar />
      <div className="flex flex-col w-full h-full text-white">
        <header className="flex items-center h-30 w-full p-4 pl-50" >
          <h1 className="text-6xl text-white font-bold text-shadow-md text-shadow-black/50" >The Movies Database</h1>
        </header>
        <div className="flex flex-col justify-center flex-1 p-10 ml-10" >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root;
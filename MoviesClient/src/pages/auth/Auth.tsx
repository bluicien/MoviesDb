
import { Outlet } from "react-router";

function Auth() {



  return (
    <div className="flex justify-center h-full items-start mt-[10%]" >
      <Outlet />
    </div>
  )
}

export default Auth
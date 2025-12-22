
import { Outlet } from "react-router";

function Auth() {



  return (
    <div className="flex justify-center items-center border-2 p-10" >
      <Outlet />
    </div>
  )
}

export default Auth
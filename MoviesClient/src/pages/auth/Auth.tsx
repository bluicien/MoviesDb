
import { Outlet } from "react-router";

function Auth() {

  return (
    <div className="flex justify-center items-start my-auto h-full " >
      <Outlet />
    </div>
  )
}

export default Auth
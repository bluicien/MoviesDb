import { Menu, House, Info, Settings, DatabaseZap, Film, LogIn, LogOut, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { clearToken, selectAccessToken } from '../redux/features/token/tokenSlice';


function SideBar() {

  const [openNavbar, setOpenNavbar] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const token = !!useAppSelector(selectAccessToken);

  const handleLogout = async () => {
    try {
      const url = `${import.meta.env.VITE_MOVIES_API}/api/auth/login`;
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!data.ok) {
        throw new Error("Internal Server Error. Failed to logout");
      }
      
    } catch (error) {
      if (error instanceof Error)
        console.error(error.message);
    } finally {
      dispatch(clearToken());
    }
  }

  return (
    <nav className={clsx("flex justify-between h-screen sticky top-0 left-0", openNavbar ? "w-60" : "w-20")} >
      <div className="flex flex-col justify-center grow bg-gray-500 border-r-2 rounded-r-md pt-5" >

        <h3 className="flex justify-center text-2xl font-bold mb-5 text-white px-5" >{openNavbar ? "MOVIES DB" : <DatabaseZap size={32} />}</h3>
        <div className="flex flex-col flex-grow w-full" >
          <Link to="/" className={clsx("flex gap-x-2 items-end w-full text-white text-lg font-semibold hover:bg-gray-400 px-5 py-2", !openNavbar && "justify-center")} >
            <House size={28} />
            {openNavbar && "Home"}
          </Link>
          <Link to="movies" className={clsx("flex gap-x-2 items-end w-full text-white text-lg font-semibold hover:bg-gray-400 px-5 py-2", !openNavbar && "justify-center")} >
            <Film size={28} />
            {openNavbar && "Movies"}
          </Link>
          <Link to="about" className={clsx("flex gap-x-2 items-end w-full text-white text-lg font-semibold hover:bg-gray-400 px-5 py-2", !openNavbar && "justify-center")} >
            <Info size={28} />
            {openNavbar && "About"}
          </Link>
          
          {!token 
          ? <div className={clsx("flex w-full text-white text-lg font-semibold cursor-pointer mt-auto", !openNavbar && "justify-center flex-col")} >
            <Link 
              to="/auth/login" 
              className="flex items-center justify-center gap-x-1 text-center hover:bg-gray-400 px-2 py-2 grow-1"
              aria-label="User login button"
            >
              <LogIn /> 
              {openNavbar && "Login"}
            </Link>
            <Link 
              to="/auth/signup" 
              className="flex items-center justify-center gap-x-1 text-center hover:bg-gray-400 px-2 py-2 grow-1"
              aria-label="User register button"
            >
              <UserRoundPlus /> 
              {openNavbar && "Signup"}
            </Link>
          </div>
          : <div 
              onClick={handleLogout}
              aria-label="Logout button"
              className={clsx("flex gap-x-2 items-end w-full text-white text-lg bg-red-500 font-semibold hover:bg-red-700 px-5 py-2 mt-auto cursor-pointer ", !openNavbar && "justify-center")} >
            <LogOut />
            {openNavbar && "Logout"}
          </div>
        }


          <div 
            className={clsx("flex gap-x-2 items-end w-full text-white text-lg font-semibold hover:bg-gray-400 px-5 py-2 cursor-pointer", !openNavbar && "justify-center")}
            aria-label="Settings navigation button"
          >
            <Settings />
            {openNavbar && "Settings"}
          </div>
        </div>
      </div>
      <div 
        className="flex items-center justify-center self-center w-10 h-20 absolute left-full bg-gray-600 border-r-2 border-y-2 rounded-r-2xl hover:bg-gray-700 hover:cursor-pointer"
        onClick={() => setOpenNavbar(!openNavbar)}  
      >
        <Menu />
      </div>
    </nav>
  )
}

export default SideBar;
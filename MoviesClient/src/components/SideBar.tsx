import { Menu, House, Info, Settings, DatabaseZap, Film, LogIn, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { clsx } from 'clsx';


function SideBar() {

  const [openNavbar, setOpenNavbar] = useState<boolean>(true);

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

          <div className={clsx("flex w-full text-white text-lg font-semibold cursor-pointer mt-auto", !openNavbar && "justify-center flex-col")} >
            <div className="flex items-center justify-center gap-x-1 text-center hover:bg-gray-400 px-2 py-2 grow-1" ><LogIn /> {openNavbar && "Login"}</div>
            <div className="flex items-center justify-center gap-x-1 text-center hover:bg-gray-400 px-2 py-2 grow-1" ><UserRoundPlus /> {openNavbar && "Signup"}</div>
          </div>
          <div className={clsx("flex gap-x-2 items-end w-full text-white text-lg font-semibold hover:bg-gray-400 px-5 py-2 cursor-pointer", !openNavbar && "justify-center")} >
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
import { Link } from 'react-router'

function Signup() {
  return (
    <div>
      <h3 className="font-bold text-3xl mb-4" >SIGN UP</h3>
      <fieldset className="flex flex-col gap-4" >
        <div className="flex flex-col gap-1 w-300 md:w-100" >
          <label className="font-semibold  " htmlFor="username">Username :</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            placeholder="John Doe"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 w-300 md:w-100" >
          <label className="font-semibold  " htmlFor="email">Email :</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="John Doe"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 w-300 md:w-100" >
          <label className="font-semibold" htmlFor="password">Password :</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="**********"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 w-300 md:w-100" >
          <label className="font-semibold" htmlFor="confirmPassword">Confirm Password :</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            placeholder="**********"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 w-300 md:w-100 mt-5" >
          <button type="submit" className="bg-blue-500 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 text-shadow-sm text-shadow-black/30 shadow-md shadow-gray-300/20 ring-1" >Register User</button>
        </div>
      </fieldset>
      <div className="mt-4" >
        <p className="text-sm" >
          Already have an account? 
          <Link to="/auth/login" className="text-blue-400 ml-1" >Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
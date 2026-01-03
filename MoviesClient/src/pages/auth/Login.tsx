import { Link } from "react-router"
import { useLogin } from "../../features/auth/useLogin";

function Login() {

  const login = useLogin();

  function handleSubmit(formData: FormData) {

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    login.mutate({ username, password });
  }

  return (
    <div className="border-2 p-10" >
      <h3 className="font-bold text-3xl mb-4" >LOGIN</h3>
      <form className="flex flex-col gap-4" action={handleSubmit} >
        <div className="flex flex-col gap-1 w-50 md:w-100" >
          <label className="font-semibold  " htmlFor="username">Username :</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            placeholder="John Doe"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 w-50 md:w-100" >
          <label className="font-semibold" htmlFor="username">Password :</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="**********"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 w-50 md:w-100 mt-5" >
          <button 
            type="submit"
            aria-label="Login Button"
            className="bg-blue-500 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 text-shadow-sm text-shadow-black/30 shadow-md shadow-gray-300/20 ring-1 disabled:bg-gray-500"
            disabled={login.isPending}
          >
            {login.isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {login.isError && <p className="text-center text-red-500 mt-1" >{login.error.message}</p>}

      <div className="mt-4 underline-offset-4" >
        <Link to="/auth/signup" className="text-sm text-blue-400 hover:underline"  >Forgot your password?</Link>
        <p className="text-sm" >
          No account? 
          <Link to="/auth/signup" className="text-blue-400 ml-1 hover:underline" >Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
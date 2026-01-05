import { LoginRequestSchema, type LoginRequest } from '../schemas'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router';

export type LoginFormProps = {
  onSubmit: (data: LoginRequest) => void,
  isLoading: boolean,
  serverError?: string,
}

function LoginForm({ onSubmit, isLoading, serverError }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginRequest>({ 
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: zodResolver(LoginRequestSchema),
    shouldUseNativeValidation: true,
  })

  return (
    <div className="border-2 p-5 md:p-10 w-full md:w-auto bg-gray-700 text-white max-w-120" >
      <h3 className="font-bold text-3xl mb-4" >LOGIN</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
        <div className="flex flex-col gap-1 md:w-100" >
          <label className="font-semibold  " htmlFor="username">Username :</label>
          <input 
            type="text" 
            id="username"
            {...register("username")}
            placeholder="John Doe"
            className="text-black bg-white rounded-sm px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1 md:w-100" >
          <label className="font-semibold" htmlFor="username">Password :</label>
          <input 
            type="password" 
            id="password" 
            {...register("password")}
            placeholder="**********"
            className="text-black bg-white rounded-sm px-2 py-1"
            />  
        </div>
        <div className="flex flex-col gap-1 md:w-100 mt-5" >
          <button 
            type="submit"
            aria-label="Login Button"
            className="bg-blue-500 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 text-shadow-sm text-shadow-black/30 shadow-md shadow-gray-300/20 ring-1 disabled:bg-gray-500"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {serverError && <p className="text-center text-red-500 mt-1" >{serverError}</p>}

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

export default LoginForm;

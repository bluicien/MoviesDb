import { Link } from 'react-router'
import { SignupRequestSchema, type SignupRequest } from '../schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type SignupFormProps = {
  onSubmit: (data: SignupRequest) => void,
  isLoading: boolean,
  serverError?: string
}

function SignupForm({ onSubmit, isLoading, serverError }: SignupFormProps) {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignupRequest>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    resolver: zodResolver(SignupRequestSchema),
    shouldUseNativeValidation: true
  });

  return (
    <div className="border-2 p-5 md:p-10 w-full md:w-auto bg-gray-700 text-white max-w-120">
      <h3 className="font-bold text-3xl mb-4" >SIGN UP</h3>
      {serverError && <p className="mt-2 py-1 px-2 text-red-500 text-md font-medium bg-red-200 border-2 border-red-500 rounded-md" >{serverError}</p>}
      <form className="flex flex-col gap-4" onSubmit={(handleSubmit(onSubmit))} >
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
          <label className="font-semibold  " htmlFor="email">Email :</label>
          <input 
            type="email" 
            id="email" 
            {...register("email")}
            placeholder="john.doe@example.com"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 md:w-100" >
          <label className="font-semibold" htmlFor="password">Password :</label>
          <input 
            type="password" 
            id="password" 
            {...register("password")}
            placeholder="**********"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 md:w-100" >
          <label className="font-semibold" htmlFor="confirmPassword">Confirm Password :</label>
          <input 
            type="password" 
            id="confirmPassword" 
            {...register("confirmPassword")}
            placeholder="**********"
            className="text-black bg-white rounded-sm px-2 py-1"
            />
        </div>
        <div className="flex flex-col gap-1 md:w-100 mt-5" >
          <button 
            type="submit"
            aria-label="Account Register Button"
            className="bg-blue-500 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 text-shadow-sm text-shadow-black/30 shadow-md shadow-gray-300/20 ring-1" 
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Registering User..." : "Register User"}
          </button>
        </div>
      </form>
      <div className="mt-4" >
        <p className="text-sm" >
          Already have an account? 
          <Link to="/auth/login" className="text-blue-400 ml-1 hover:underline" >Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm;

import { useLogin } from "../../features/auth/useLogin";
import LoginForm from "../../features/auth/components/LoginForm";

function Login() {
  const login = useLogin();
  return (
    <LoginForm 
      onSubmit={(values) => login.mutate(values)} 
      isLoading={login.isPending}
      serverError={login.error?.message}
    />
  )
}

export default Login;
import SignupForm from '../../features/auth/components/SignupForm'
import { useSignup } from '../../features/auth/useSignup';

function Signup() {
  const signup = useSignup();
  return (
    <SignupForm
      onSubmit={(values) => signup.mutate(values)}
      isLoading={signup.isPending}
      serverError={signup.error?.message}
    />
  )
}

export default Signup
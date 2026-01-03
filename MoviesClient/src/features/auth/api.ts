import { LoginRequestSchema, LoginResponseSchema, SignupRequestSchema, SignupResponseSchema } from './schemas';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "./schemas";
import { api } from "../../libs/api";
import { handleErrors } from '../../libs/helpers';

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  try {
    // Validate data tp send
    const parsed = LoginRequestSchema.parse(data);
  
    const res = await api.post("/api/auth/login", parsed);
    // Validate response
    return LoginResponseSchema.parse(res.data);
  } catch (err) {
    handleErrors(err, "Invalid login input.");
  }
}


export async function signupApi(data: SignupRequest): Promise<SignupResponse> {
  try {
    const parsed = SignupRequestSchema.parse(data);

    const res = await api.post("/api/auth/signup", parsed);

    return SignupResponseSchema.parse(res.data);
  } catch (err) {
    handleErrors(err, "Invalid registration input.");
  }
}

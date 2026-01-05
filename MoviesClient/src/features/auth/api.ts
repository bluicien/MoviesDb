import { LoginResponseSchema, SignupResponseSchema } from './schemas';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "./schemas";
import { api } from "../../libs/api";
import { handleErrors } from '../../libs/helpers';

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  try {
    const res = await api.post("/api/auth/login", data);
    // Validate response
    return LoginResponseSchema.parse(res.data);
  } catch (err) {
    handleErrors(err, "Invalid login input.");
  }
}


export async function signupApi(data: SignupRequest): Promise<SignupResponse> {
  try {
    const res = await api.post("/api/auth/signup", data);

    // Validate response
    return SignupResponseSchema.parse(res.data);
  } catch (err) {
    handleErrors(err, "Invalid registration input.");
  }
}

import { LoginRequestSchema, LoginResponseSchema } from './schemas';
import type { LoginRequest, LoginResponse } from "./schemas";
import { api } from "../../libs/api";
import { ZodError } from "zod";
import type { AppError } from '../../libs/errors';
import { AxiosError } from 'axios';
import { extractZodFieldErrors } from '../../libs/helpers';

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  try {
    // Validate data tp send
    const parsed = LoginRequestSchema.parse(data);
  
    const res = await api.post("/api/auth/login", parsed);
    // Validate response
    return LoginResponseSchema.parse(res.data);
  } catch (err) {
    if (err instanceof ZodError) {
      throw {
        message: "Invalid form input",
        fieldErrors: extractZodFieldErrors(err),
      } as AppError; // Safe assertion after fixing types
    }

    if (err instanceof AxiosError) {
      const backendMessage = err.response?.data?.message || "Server error occurred";
      throw { message: backendMessage } as AppError;
    }

    throw { message: "Unexpected error occurred" } as AppError;
  }
}

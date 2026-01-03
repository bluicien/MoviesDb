import { z } from "zod";

export const LoginRequestSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;


export const SignupRequestSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8)
});

export const SignupResponseSchema = z.object({
  accessToken: z.string().min(1)
});


export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

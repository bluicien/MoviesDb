import { z } from "zod";

export const LoginRequestSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
});


export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

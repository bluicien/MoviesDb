import { z } from "zod";

export const LoginRequestSchema = z.object({
  username: z.string({ error: issue => issue.input === undefined ? "Username Required" : "Invalid Username" }).min(3, { error: "Username must be minium 3 characters."}),
  password: z.string({ error: issue => issue.input === undefined ? "Password Required" : "Invalid Password" }).min(3, { error: "Password must be minium 3 characters."}),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string().min(1, { error: "No access token."}),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;


export const SignupRequestSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
})
.refine((data) => data.password === data.confirmPassword, {
  error: "Passwords must match",
  path: ["confirmPassword"] // Attach error to confirmPassword field
});

export const SignupResponseSchema = z.object({
  accessToken: z.string().min(1)
});


export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

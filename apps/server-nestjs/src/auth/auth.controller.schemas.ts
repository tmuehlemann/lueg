import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().trim().min(1).max(255),
  password: z.string().min(5).max(255),
});
export type SignInDto = z.infer<typeof signInSchema>;

export const registerSchema = z.object({
  username: z.string().trim().min(1).max(255),
  password: z.string().min(5).max(255),
});
export type RegisterDto = z.infer<typeof registerSchema>;

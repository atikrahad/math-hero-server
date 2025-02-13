import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be 6 characters or longer'),
    name: z.string().optional(),
    profilePicture: z.string().optional(),
    isOnline: z.boolean().default(false),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be 6 characters or longer'),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  loginUserValidationSchema,
};

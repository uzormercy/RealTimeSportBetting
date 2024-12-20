import { z } from 'zod';

const confirmPasswordSchema = z.string({
  required_error: 'Confirm password is mandatory',
});
export const createUserValidationSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z
      .string({ required_error: 'Password is mandatory' })
      .min(6, 'Password must at least be 6 characters long')
      .max(20, 'Password must be at most 50 characters long'),
    confirmPassword: confirmPasswordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is mandatory' }),
  password: z.string({ required_error: 'Password is mandatory' }),
});

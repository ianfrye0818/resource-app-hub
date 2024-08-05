import { z } from 'zod';
import { Models } from './types';

export const SignInFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const SelectModelSchema = z.object({
  model: z.nativeEnum(Models),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

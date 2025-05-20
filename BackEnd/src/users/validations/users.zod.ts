import { z } from 'zod';
import { USER_ROLES } from '../constants/user.roles';
import { UserRule } from '../schemas/models/user.interface';

export const createUserSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
  rule: z.nativeEnum(UserRule),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  isAdmin: z.boolean().optional(),
  rule: z.nativeEnum(UserRule),//.optional(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
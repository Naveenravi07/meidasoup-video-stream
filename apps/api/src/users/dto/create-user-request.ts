import { z } from 'zod';

export const createUserRequestSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string(),
});
 export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
 
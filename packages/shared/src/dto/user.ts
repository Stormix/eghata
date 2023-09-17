import { z } from 'zod';

export const loginSchema = z.object({
  token: z.object({
    token: z.string()
  })
});

export type LoginDTO = z.infer<typeof loginSchema>;

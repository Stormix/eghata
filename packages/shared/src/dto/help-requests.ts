import { z } from 'zod';
import { RequestTypes } from '../contracts/types';

export const createHelpRequestSchema = z.object({
  types: z.array(z.nativeEnum(RequestTypes)).nonempty(),
  location: z.object  ({
    address: z.string(),
    lat: z.number(),
    lng: z.number()
  }),
  isOnSite: z.enum(['yes', 'no'] as const),
  description: z.string().optional(),
  source: z.string().optional(),
  name: z.string().nonempty(),
  email: z.string().email().optional(),
  phone: z.string().nonempty(),
  files: z.array(z.any()).optional().default([])
});

export type CreateHelpRequestDto = z.infer<typeof createHelpRequestSchema>;
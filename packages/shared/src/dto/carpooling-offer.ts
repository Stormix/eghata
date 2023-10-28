import { z } from 'zod';

export const createCarpoolingOfferSchema = z.object({
  type: z.string().default('offer'),
  departureLongitude: z.coerce.number(),
  departureLatitude: z.coerce.number(),
  departureAddress: z.string(),
  departureDate: z.coerce.date(),
  arrivalLongitude: z.coerce.number(),
  arrivalLatitude: z.coerce.number(),
  arrivalAddress: z.string(),
  arrivalDate: z.coerce.date(),
  description: z.string(),
  capacity: z.coerce.number(),
  storageSpace: z.string(),
  files: z.array(z.any()).optional().default([])
});

export type CreateCarpoolingOfferDto = z.infer<typeof createCarpoolingOfferSchema>;
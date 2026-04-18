import { z } from "zod";

const propertyBody = z.object({
  title: z.string().min(2),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL"]),
  purpose: z.enum(["SALE", "RENT"]),
  price: z.coerce.number().positive(),
  location: z.string().min(2),
  address: z.string().min(5),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
  bedrooms: z.coerce.number().int().optional(),
  bathrooms: z.coerce.number().int().optional(),
  amenities: z.array(z.string()).default([]),
  description: z.string().optional(),
  availabilityStatus: z.enum(["AVAILABLE", "RESERVED", "SOLD", "RENTED"]).optional(),
  assignedAgentId: z.string().optional()
});

export const createPropertySchema = z.object({ body: propertyBody });
export const updatePropertySchema = z.object({
  body: propertyBody.partial(),
  params: z.object({ id: z.string() })
});
export const propertyQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    search: z.string().optional(),
    location: z.string().optional(),
    type: z.string().optional(),
    purpose: z.string().optional(),
    availabilityStatus: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional()
  })
});

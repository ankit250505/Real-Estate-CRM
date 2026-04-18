import { z } from "zod";

const clientBody = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal("")),
  type: z.enum(["BUYER", "SELLER"]),
  preferences: z.string().optional(),
  budget: z.coerce.number().optional(),
  linkedLeadId: z.string().optional(),
  visitedPropertyIds: z.array(z.string()).optional()
});

export const createClientSchema = z.object({ body: clientBody });
export const updateClientSchema = z.object({
  body: clientBody.partial(),
  params: z.object({ id: z.string() })
});

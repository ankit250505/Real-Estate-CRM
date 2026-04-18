import { z } from "zod";

const dealBody = z.object({
  clientId: z.string().min(1),
  propertyId: z.string().min(1),
  agentId: z.string().min(1),
  dealValue: z.coerce.number().positive(),
  commissionPercent: z.coerce.number().min(0),
  stage: z.enum(["INQUIRY", "NEGOTIATION", "AGREEMENT", "CLOSED"]).optional(),
  expectedCloseDate: z.string().datetime().optional().or(z.literal("")),
  notes: z.string().optional()
});

export const createDealSchema = z.object({ body: dealBody });
export const updateDealSchema = z.object({
  body: dealBody.partial(),
  params: z.object({ id: z.string() })
});

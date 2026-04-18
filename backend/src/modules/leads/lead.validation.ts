import { z } from "zod";

const leadBody = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().min(2),
  budgetMin: z.coerce.number().optional(),
  budgetMax: z.coerce.number().optional(),
  preferredLocation: z.string().optional(),
  propertyType: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "LOST"]).optional(),
  assignedAgentId: z.string().optional(),
  followUpDate: z.string().datetime().optional().or(z.literal(""))
});

export const createLeadSchema = z.object({ body: leadBody });
export const updateLeadSchema = z.object({ body: leadBody.partial(), params: z.object({ id: z.string() }) });
export const leadQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    search: z.string().optional(),
    status: z.string().optional(),
    source: z.string().optional(),
    assignedAgentId: z.string().optional()
  })
});

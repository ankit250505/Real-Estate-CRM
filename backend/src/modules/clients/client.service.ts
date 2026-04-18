import { ActivityType, ClientType } from "@prisma/client";
import { sanitizeInput } from "../../utils/sanitize.js";
import { clientRepository } from "./client.repository.js";

export const clientService = {
  list() {
    return clientRepository.findMany();
  },
  getById(id: string) {
    return clientRepository.findById(id);
  },
  create(payload: Record<string, unknown>) {
    return clientRepository.create({
      name: String(payload.name),
      phone: String(payload.phone),
      email: payload.email ? String(payload.email) : undefined,
      type: payload.type as ClientType,
      preferences: sanitizeInput(String(payload.preferences ?? "")) || undefined,
      budget: payload.budget ? Number(payload.budget) : undefined,
      linkedLead: payload.linkedLeadId ? { connect: { id: String(payload.linkedLeadId) } } : undefined,
      visitedProps: Array.isArray(payload.visitedPropertyIds)
        ? {
            connect: (payload.visitedPropertyIds as string[]).map((id) => ({ id }))
          }
        : undefined,
      interactions: {
        create: {
          type: ActivityType.NOTE,
          title: "Client profile created",
          description: "Client entered into CRM."
        }
      }
    });
  },
  update(id: string, payload: Record<string, unknown>) {
    return clientRepository.update(id, {
      ...("name" in payload ? { name: String(payload.name) } : {}),
      ...("phone" in payload ? { phone: String(payload.phone) } : {}),
      ...("email" in payload ? { email: payload.email ? String(payload.email) : null } : {}),
      ...("type" in payload ? { type: payload.type as ClientType } : {}),
      ...("preferences" in payload ? { preferences: sanitizeInput(String(payload.preferences ?? "")) } : {}),
      ...("budget" in payload ? { budget: payload.budget ? Number(payload.budget) : null } : {}),
      ...("linkedLeadId" in payload
        ? {
            linkedLead: payload.linkedLeadId ? { connect: { id: String(payload.linkedLeadId) } } : { disconnect: true }
          }
        : {}),
      ...("visitedPropertyIds" in payload
        ? {
            visitedProps: {
              set: Array.isArray(payload.visitedPropertyIds)
                ? (payload.visitedPropertyIds as string[]).map((propertyId) => ({ id: propertyId }))
                : []
            }
          }
        : {})
    });
  }
};

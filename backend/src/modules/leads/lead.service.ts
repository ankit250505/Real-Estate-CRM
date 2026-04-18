import { ActivityType, LeadStatus, Prisma } from "@prisma/client";
import { getPagination } from "../../utils/pagination.js";
import { sanitizeInput } from "../../utils/sanitize.js";
import { leadRepository } from "./lead.repository.js";

export const leadService = {
  async list(query: Record<string, unknown>) {
    const { page, limit, skip } = getPagination(Number(query.page ?? 1), Number(query.limit ?? 10));
    const search = String(query.search ?? "").trim();

    const where: Prisma.LeadWhereInput = {
      deletedAt: null,
      ...(query.status ? { status: query.status as LeadStatus } : {}),
      ...(query.source ? { source: { contains: String(query.source), mode: "insensitive" } } : {}),
      ...(query.assignedAgentId ? { assignedAgentId: String(query.assignedAgentId) } : {}),
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } }
            ]
          }
        : {})
    };

    const [rows, total] = await Promise.all([
      leadRepository.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { assignedAgent: true }
      }),
      leadRepository.count(where)
    ]);

    return {
      data: rows,
      meta: { page, limit, total }
    };
  },

  getById(id: string) {
    return leadRepository.findById(id);
  },

  create(payload: Record<string, unknown>) {
    return leadRepository.create({
      fullName: String(payload.fullName),
      phone: String(payload.phone),
      email: payload.email ? String(payload.email) : undefined,
      source: String(payload.source),
      budgetMin: payload.budgetMin ? Number(payload.budgetMin) : undefined,
      budgetMax: payload.budgetMax ? Number(payload.budgetMax) : undefined,
      preferredLocation: sanitizeInput(String(payload.preferredLocation ?? "")) || undefined,
      propertyType: sanitizeInput(String(payload.propertyType ?? "")) || undefined,
      notes: sanitizeInput(String(payload.notes ?? "")) || undefined,
      status: (payload.status as LeadStatus | undefined) ?? LeadStatus.NEW,
      assignedAgent: payload.assignedAgentId ? { connect: { id: String(payload.assignedAgentId) } } : undefined,
      followUpDate: payload.followUpDate ? new Date(String(payload.followUpDate)) : undefined,
      activities: {
        create: {
          type: ActivityType.NOTE,
          title: "Lead created",
          description: "Lead entered into CRM."
        }
      }
    });
  },

  update(id: string, payload: Record<string, unknown>) {
    return leadRepository.update(id, {
      ...("fullName" in payload ? { fullName: String(payload.fullName) } : {}),
      ...("phone" in payload ? { phone: String(payload.phone) } : {}),
      ...("email" in payload ? { email: payload.email ? String(payload.email) : null } : {}),
      ...("source" in payload ? { source: String(payload.source) } : {}),
      ...("budgetMin" in payload ? { budgetMin: payload.budgetMin ? Number(payload.budgetMin) : null } : {}),
      ...("budgetMax" in payload ? { budgetMax: payload.budgetMax ? Number(payload.budgetMax) : null } : {}),
      ...("preferredLocation" in payload ? { preferredLocation: sanitizeInput(String(payload.preferredLocation ?? "")) } : {}),
      ...("propertyType" in payload ? { propertyType: sanitizeInput(String(payload.propertyType ?? "")) } : {}),
      ...("notes" in payload ? { notes: sanitizeInput(String(payload.notes ?? "")) } : {}),
      ...("status" in payload ? { status: payload.status as LeadStatus } : {}),
      ...("assignedAgentId" in payload
        ? {
            assignedAgent: payload.assignedAgentId
              ? { connect: { id: String(payload.assignedAgentId) } }
              : { disconnect: true }
          }
        : {}),
      ...("followUpDate" in payload
        ? { followUpDate: payload.followUpDate ? new Date(String(payload.followUpDate)) : null }
        : {})
    });
  }
};

import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

export const leadRepository = {
  findMany(args: Prisma.LeadFindManyArgs) {
    return prisma.lead.findMany(args);
  },
  count(where: Prisma.LeadWhereInput) {
    return prisma.lead.count({ where });
  },
  findById(id: string) {
    return prisma.lead.findFirst({
      where: { id, deletedAt: null },
      include: { activities: { orderBy: { createdAt: "desc" } }, assignedAgent: true }
    });
  },
  create(data: Prisma.LeadCreateInput) {
    return prisma.lead.create({
      data,
      include: { activities: true, assignedAgent: true }
    });
  },
  update(id: string, data: Prisma.LeadUpdateInput) {
    return prisma.lead.update({
      where: { id },
      data,
      include: { activities: true, assignedAgent: true }
    });
  }
};

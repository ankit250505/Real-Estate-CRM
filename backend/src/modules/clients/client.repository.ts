import { prisma } from "../../lib/prisma.js";

export const clientRepository = {
  findMany() {
    return prisma.client.findMany({
      where: { deletedAt: null },
      include: {
        linkedLead: true,
        interactions: { orderBy: { createdAt: "desc" } },
        visitedProps: true,
        deals: true
      },
      orderBy: { createdAt: "desc" }
    });
  },
  findById(id: string) {
    return prisma.client.findFirst({
      where: { id, deletedAt: null },
      include: {
        linkedLead: true,
        interactions: { orderBy: { createdAt: "desc" } },
        visitedProps: true,
        deals: { include: { property: true, agent: true } }
      }
    });
  },
  create(data: Parameters<typeof prisma.client.create>[0]["data"]) {
    return prisma.client.create({
      data,
      include: { linkedLead: true, visitedProps: true, interactions: true }
    });
  },
  update(id: string, data: Parameters<typeof prisma.client.update>[0]["data"]) {
    return prisma.client.update({
      where: { id },
      data,
      include: { linkedLead: true, visitedProps: true, interactions: true }
    });
  }
};

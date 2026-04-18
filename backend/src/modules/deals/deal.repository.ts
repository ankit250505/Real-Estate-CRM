import { prisma } from "../../lib/prisma.js";

export const dealRepository = {
  findMany() {
    return prisma.deal.findMany({
      include: { client: true, property: true, agent: true, documents: true },
      orderBy: { createdAt: "desc" }
    });
  },
  findById(id: string) {
    return prisma.deal.findUnique({ where: { id } });
  },
  create(data: Parameters<typeof prisma.deal.create>[0]["data"]) {
    return prisma.deal.create({
      data,
      include: { client: true, property: true, agent: true, documents: true }
    });
  },
  update(id: string, data: Parameters<typeof prisma.deal.update>[0]["data"]) {
    return prisma.deal.update({
      where: { id },
      data,
      include: { client: true, property: true, agent: true, documents: true }
    });
  }
};

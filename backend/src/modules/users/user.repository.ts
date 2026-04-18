import { prisma } from "../../lib/prisma.js";

export const userRepository = {
  findMany() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" }
    });
  },
  create(data: Parameters<typeof prisma.user.create>[0]["data"]) {
    return prisma.user.create({ data });
  }
};

import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

export const propertyRepository = {
  findMany(args: Prisma.PropertyFindManyArgs) {
    return prisma.property.findMany(args);
  },
  count(where: Prisma.PropertyWhereInput) {
    return prisma.property.count({ where });
  },
  findById(id: string) {
    return prisma.property.findFirst({
      where: { id, deletedAt: null },
      include: { images: true, assignedAgent: true }
    });
  },
  create(data: Prisma.PropertyCreateInput) {
    return prisma.property.create({
      data,
      include: { images: true, assignedAgent: true }
    });
  },
  update(id: string, data: Prisma.PropertyUpdateInput) {
    return prisma.property.update({
      where: { id },
      data,
      include: { images: true, assignedAgent: true }
    });
  }
};

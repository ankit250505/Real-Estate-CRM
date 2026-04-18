import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { prisma } from "../../lib/prisma.js";

export const taskController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany({
      where: req.user?.role === "AGENT" ? { assigneeId: req.user.userId } : undefined,
      include: { assignee: true },
      orderBy: { createdAt: "desc" }
    });
    res.json({ data: tasks });
  })
};

import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { prisma } from "../../lib/prisma.js";

export const notificationController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const data = await prisma.notification.findMany({
      where: { userId: req.user?.userId },
      orderBy: { createdAt: "desc" }
    });
    res.json({ data });
  }),
  markRead: asyncHandler(async (req: Request, res: Response) => {
    const data = await prisma.notification.update({
      where: { id: String(req.params.id) },
      data: { read: true }
    });
    res.json({ data });
  })
};

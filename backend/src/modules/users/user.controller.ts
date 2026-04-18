import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { userService } from "./user.service.js";

export const userController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    const users = await userService.list();
    res.json({ data: users });
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.create(req.body);
    res.status(201).json({ data: user });
  })
};

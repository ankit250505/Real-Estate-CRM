import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { authService } from "./auth.service.js";

export const authController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    res.json({ user: req.user });
  })
};

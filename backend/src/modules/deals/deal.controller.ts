import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { dealService } from "./deal.service.js";

export const dealController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    const deals = await dealService.list();
    res.json({ data: deals });
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const deal = await dealService.create(req.body, req.files as Express.Multer.File[] | undefined);
    res.status(201).json({ data: deal });
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const deal = await dealService.update(String(req.params.id), req.body);
    res.json({ data: deal });
  })
};

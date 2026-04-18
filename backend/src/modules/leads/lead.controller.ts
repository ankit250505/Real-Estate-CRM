import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { leadService } from "./lead.service.js";

export const leadController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const result = await leadService.list(req.query);
    res.json(result);
  }),
  getById: asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.getById(String(req.params.id));
    if (!lead) throw new ApiError(404, "Lead not found");
    res.json({ data: lead });
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.create(req.body);
    res.status(201).json({ data: lead });
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.update(String(req.params.id), req.body);
    res.json({ data: lead });
  })
};

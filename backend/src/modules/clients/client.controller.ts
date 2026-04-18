import type { Request, Response } from "express";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { clientService } from "./client.service.js";

export const clientController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    const clients = await clientService.list();
    res.json({ data: clients });
  }),
  getById: asyncHandler(async (req: Request, res: Response) => {
    const client = await clientService.getById(String(req.params.id));
    if (!client) throw new ApiError(404, "Client not found");
    res.json({ data: client });
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const client = await clientService.create(req.body);
    res.status(201).json({ data: client });
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const client = await clientService.update(String(req.params.id), req.body);
    res.json({ data: client });
  })
};

import type { Request, Response } from "express";
import { ApiError } from "../../utils/api-error.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { propertyService } from "./property.service.js";

export const propertyController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const result = await propertyService.list(req.query);
    res.json(result);
  }),
  getById: asyncHandler(async (req: Request, res: Response) => {
    const property = await propertyService.getById(String(req.params.id));
    if (!property) throw new ApiError(404, "Property not found");
    res.json({ data: property });
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const property = await propertyService.create(req.body, req.files as Express.Multer.File[] | undefined);
    res.status(201).json({ data: property });
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const property = await propertyService.update(String(req.params.id), req.body);
    res.json({ data: property });
  })
};

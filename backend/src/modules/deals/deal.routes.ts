import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../config/upload.js";
import { dealController } from "./deal.controller.js";
import { createDealSchema, updateDealSchema } from "./deal.validation.js";

export const dealRouter = Router();

dealRouter.use(authenticate);
dealRouter.get("/", dealController.list);
dealRouter.post("/", upload.array("documents", 6), dealController.create);
dealRouter.patch("/:id", validate(updateDealSchema), dealController.update);

import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { leadController } from "./lead.controller.js";
import { createLeadSchema, leadQuerySchema, updateLeadSchema } from "./lead.validation.js";

export const leadRouter = Router();

leadRouter.use(authenticate);
leadRouter.get("/", validate(leadQuerySchema), leadController.list);
leadRouter.get("/:id", leadController.getById);
leadRouter.post("/", validate(createLeadSchema), leadController.create);
leadRouter.post("/capture", validate(createLeadSchema), leadController.create);
leadRouter.patch("/:id", validate(updateLeadSchema), leadController.update);

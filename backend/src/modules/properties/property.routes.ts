import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../config/upload.js";
import { propertyController } from "./property.controller.js";
import { createPropertySchema, propertyQuerySchema, updatePropertySchema } from "./property.validation.js";

export const propertyRouter = Router();

propertyRouter.use(authenticate);
propertyRouter.get("/", validate(propertyQuerySchema), propertyController.list);
propertyRouter.get("/:id", propertyController.getById);
propertyRouter.post("/", upload.array("images", 6), propertyController.create);
propertyRouter.patch("/:id", validate(updatePropertySchema), propertyController.update);

import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { clientController } from "./client.controller.js";
import { createClientSchema, updateClientSchema } from "./client.validation.js";

export const clientRouter = Router();

clientRouter.use(authenticate);
clientRouter.get("/", clientController.list);
clientRouter.get("/:id", clientController.getById);
clientRouter.post("/", validate(createClientSchema), clientController.create);
clientRouter.patch("/:id", validate(updateClientSchema), clientController.update);

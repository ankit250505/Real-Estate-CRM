import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { notificationController } from "./notification.controller.js";

export const notificationRouter = Router();

notificationRouter.use(authenticate);
notificationRouter.get("/", notificationController.list);
notificationRouter.patch("/:id/read", notificationController.markRead);

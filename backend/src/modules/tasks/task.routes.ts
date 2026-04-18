import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { taskController } from "./task.controller.js";

export const taskRouter = Router();

taskRouter.use(authenticate);
taskRouter.get("/", taskController.list);

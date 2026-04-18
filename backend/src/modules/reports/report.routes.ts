import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { reportController } from "./report.controller.js";

export const reportRouter = Router();

reportRouter.use(authenticate);
reportRouter.get("/export", reportController.export);

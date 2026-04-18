import { Router } from "express";
import { Role } from "@prisma/client";
import { authenticate } from "../../middlewares/auth.js";
import { authorize } from "../../middlewares/role-guard.js";
import { validate } from "../../middlewares/validate.js";
import { userController } from "./user.controller.js";
import { createUserSchema } from "./user.validation.js";

export const userRouter = Router();

userRouter.use(authenticate, authorize(Role.ADMIN));
userRouter.get("/", userController.list);
userRouter.post("/", validate(createUserSchema), userController.create);

import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { clientRouter } from "../modules/clients/client.routes.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.routes.js";
import { dealRouter } from "../modules/deals/deal.routes.js";
import { leadRouter } from "../modules/leads/lead.routes.js";
import { notificationRouter } from "../modules/notifications/notification.routes.js";
import { propertyRouter } from "../modules/properties/property.routes.js";
import { reportRouter } from "../modules/reports/report.routes.js";
import { taskRouter } from "../modules/tasks/task.routes.js";
import { userRouter } from "../modules/users/user.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/leads", leadRouter);
apiRouter.use("/properties", propertyRouter);
apiRouter.use("/clients", clientRouter);
apiRouter.use("/deals", dealRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/tasks", taskRouter);
apiRouter.use("/reports", reportRouter);

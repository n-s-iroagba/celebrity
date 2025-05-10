import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const adminRouter = Router();
adminRouter.put("/:id", AdminController.updateAdminName);

export default adminRouter;

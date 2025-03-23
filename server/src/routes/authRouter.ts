import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/verify-email/:token", AuthController.verifyEmail);

authRouter.post("/login", AuthController.login);

authRouter.post("/forgot-password", AuthController.forgotPassword);

authRouter.patch("/new-password/:token", AuthController.resetPassword);


export default authRouter;

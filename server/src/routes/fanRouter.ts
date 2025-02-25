import { Router } from "express";
import { FanController } from "../controllers/FanController";

const fanRouter = Router();

fanRouter.post("/", FanController.createFan);

fanRouter.get("/", FanController.getAllFans);

fanRouter.get("/:id", FanController.getFanById);

fanRouter.put("/:id", FanController.updateFan);

fanRouter.delete("/:id", FanController.deleteFan);

export default fanRouter;

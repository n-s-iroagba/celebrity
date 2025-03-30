import { Router } from "express";
import { FanController } from "../controllers/FanController";
import multer from "multer";
import path from 'path'
import fs from 'fs'

const fanRouter = Router();
// Ensure the uploads folder exists
const uploadDir =  "../uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to store files in "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save in uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Save with unique name
  },
});

const upload = multer({ storage })

fanRouter.post("/signup",upload.single('mediaFile'), FanController.createFan);

fanRouter.get("/", FanController.getAllFans);

fanRouter.get("/:id", FanController.getFanById);

fanRouter.put("/:id", FanController.updateFan);

fanRouter.delete("/:id", FanController.deleteFan);

export default fanRouter;

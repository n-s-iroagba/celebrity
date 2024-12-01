import express, { Request, Response, Router, NextFunction } from "express";
import Survey from "../models/Survey";

const router: Router = express.Router();

// Define async handler with correct types
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const submitSurvey = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { step, selectedCeleb, formData, fanDetails } = req.body;

    // Validate input
    if (!step || !selectedCeleb || !formData || !fanDetails) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save the survey to the database
    const survey = await Survey.create({
      step,
      selectedCeleb,
      formData,
      fanDetails,
    });

    return res.status(201).json({
      message: "Survey submitted successfully!",
      data: survey,
    });
  } catch (error) {
    console.error("Error while submitting survey:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAllSurveys = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const surveys = await Survey.findAll();
    return res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

router.post("/submit-survey", asyncHandler(submitSurvey));
router.get("/all-surveys", asyncHandler(getAllSurveys));

// Global error handler middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Something went wrong! Please try again later." });
});

export default router;

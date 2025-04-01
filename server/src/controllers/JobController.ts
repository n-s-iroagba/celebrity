import JobService from "../services/JobService";
import { Request,Response } from "express";

class JobController{
    static async getJobsByFanId(req: Request, res: Response): Promise<any> {
        try {
          const fanId = parseInt(req.params.fanId);
      
          if (isNaN(fanId)) {
            return res.status(400).json({ error: "Invalid fanId parameter" });
          }
      
          const jobs = await JobService.getJobsByFanId(fanId);
      
          if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this fanId" });
          }
      
          return res.status(200).json(jobs);
        } catch (error: any) {
          console.error(`Error fetching jobs for fanId ${req.params.fanId}:`, error);
          return res.status(500).json({ error: error.message });
        }
      }


    static async getJobsDetails(req: Request, res: Response): Promise<any> {
        try {
          const fanId = req.params.fanId
           const celebrityId = req.params.celebrityId
         
      
          const job = await JobService.getJobDetails(fanId,celebrityId);
          
    
          return res.status(200).json(job);
        } catch (error: any) {
          console.error(`Error fetching jobs for fanId ${req.params.fanId}:`, error);
          return res.status(500).json({ error: error.message });
        }
      }
      

}

export default JobController
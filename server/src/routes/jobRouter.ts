import express from 'express';
import JobController from '../controllers/JobController';


const jobRouter = express.Router();
jobRouter.get('/fan/:fanId/celeb/:celebrityId', JobController.getJobsDetails);
jobRouter.get('/:fanId', JobController.getJobsByFanId);



export default jobRouter;
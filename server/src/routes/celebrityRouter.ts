import express from 'express';
import { CelebrityController } from '../controllers/CelebrityController';

const celebrityRouter = express.Router();


celebrityRouter.post('/', CelebrityController.createCelebrity);


celebrityRouter.patch('/:id', CelebrityController.updateCelebrity);

celebrityRouter.get('/:id', CelebrityController.getCelebrityById);


celebrityRouter.get('/', CelebrityController.getAllCelebrities);

celebrityRouter.delete('/:id', CelebrityController.deleteCelebrity);

export default celebrityRouter;
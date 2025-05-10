import express from 'express';
import { CelebrityController } from '../controllers/CelebrityController';

const celebrityRouter = express.Router();





celebrityRouter.patch('/:id', CelebrityController.updateCelebrity);




celebrityRouter.get('/', CelebrityController.getAllCelebrities);

celebrityRouter.delete('/:id', CelebrityController.deleteCelebrity);

export default celebrityRouter;
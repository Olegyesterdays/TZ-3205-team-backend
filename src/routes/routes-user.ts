import { Router } from 'express';
import { getUserByEmailController } from '../controllers/controllers-user';

const userRouter = Router();

userRouter.get('/byEmail', getUserByEmailController);

export default userRouter;

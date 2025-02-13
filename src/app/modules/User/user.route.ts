import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../config/middleware/auth';

const route = Router();

route.get('/:id', auth('user'), userController.getUserById);


export const userRouter = route;
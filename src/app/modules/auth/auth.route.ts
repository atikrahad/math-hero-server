import { Router } from 'express';
import auth from '../../config/middleware/auth';
import validateRequest from '../../config/middleware/validateRequest';
import { userValidationSchema } from '../User/user.validation';
import { authController } from './auth.controller';

const route = Router();

route.post('/register', validateRequest(userValidationSchema.createUserValidationSchema), authController.registerUser);

route.post('/login', validateRequest(userValidationSchema.loginUserValidationSchema), authController.loginUser);

route.post('/verifyUser', authController.verifyUser);
route.post('/verifyOtp', authController.verifyOtp);
route.post('/reset-password', auth(), authController.resetPassword);
route.post('/resend-otp', authController.resendOtp);
route.post('/forgot-password', authController.forgotPassword);
route.post('/change-password', auth(), authController.changePassword);

export const authRouter = route;

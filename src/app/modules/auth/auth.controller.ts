import httpStatus from 'http-status';
import catchAsync from '../../config/utils/catchAsync';
import sendResponse from '../../config/utils/sendResponse';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'User logged in successfully!',
    data: result,
  });
});

const verifyUser = catchAsync(async (req, res) => {
  const result = await authServices.verifyUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'Now you are verified!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await authServices.resetPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'Successfully changed password',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgotPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'Successfully changed password',
    data: result,
  });
});

const resendOtp = catchAsync(async (req, res) => {
  const result = await authServices.resendOtp(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'Otp code sent successfully',
    data: result,
  });
})

const verifyOtp = catchAsync(async (req, res) => {
  const result = await authServices.verifyOtp(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'Otp code verified successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authServices.changePassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'Successfully changed password',
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
  verifyUser,
  verifyOtp,
  resetPassword,
  forgotPassword,
  changePassword,
  resendOtp
};

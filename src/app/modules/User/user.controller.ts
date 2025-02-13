import httpStatus from 'http-status';
import catchAsync from '../../config/utils/catchAsync';
import sendResponse from '../../config/utils/sendResponse';
import { userServices } from './user.service';


const getUserById = catchAsync(async (req, res) => {
  const result = await userServices.getUserById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK || 201,
    message: 'User retrieved successfully!',
    data: result,
  });
});

export const userController = {
  getUserById,
};
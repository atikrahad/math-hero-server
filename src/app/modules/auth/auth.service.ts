/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../config/errors/AppError';
import { IUser, TLogin } from '../User/user.interface';
import { Users } from '../User/user.model';
import { generateOtpToken, sendconfirmationmail, verifyOtpToken } from './auth.utils';

const registerUserIntoDB = async (payload: IUser) => {
  const { password, ...userinfo } = payload;
  const { otpToken, otp } = await generateOtpToken(payload.email);
  const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds);
  const result = await Users.create({ password: hashedPassword, otpToken: otpToken, ...userinfo });

  if (result) {
    sendconfirmationmail(result, otp);
  }

  const data = {
    email: result.email,
    role: result.role,
  };
  const token = jwt.sign(data, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return {
    jwt: token,
    user: result,
  };
};

const loginUserIntoDB = async (payload: TLogin) => {
  // Check if the user exists
  const isUserExist = await Users.findOne({ email: payload.email }).select('+password');
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // Compare the provided password with the stored hashed password
  const matchPassword = await bcrypt.compare(payload.password, isUserExist.password);

  if (!matchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password!');
  }

  // If password matches, create a JWT token
  const data = {
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const token = jwt.sign(data, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // Return the user data and token
  return { jwt: token, user: isUserExist };
};

const verifyUser = async (payload: any) => {
  const { email, otp } = payload;
  const user = await Users.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not exist');
  }
  if (user.confirmed) {
    throw new AppError(httpStatus.NOT_FOUND, 'User already verified');
  }
  const isVerified = user.otpToken && (await verifyOtpToken(user.otpToken, otp));
  if (!isVerified) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid or expired otp code');
  }

  user.confirmed = true;

  await Users.findByIdAndUpdate(user._id, user, { new: true });
  return;
};

const resetPassword = async (payload: any) => {
  const user = await Users.findOne({ _id: payload.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const matchPassword = await bcrypt.compare(payload.currentPassword, user.password);
  if (!matchPassword) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Current password is not valid');
  }
  user.password = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);

  await Users.findByIdAndUpdate(user._id, user, { new: true });
  return;
};

const forgotPassword = async (payload: string) => {
  const user = await Users.findOne({ email: payload });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const { otpToken, otp } = await generateOtpToken(payload);
  user.otpToken = otpToken;
  await user.save();
  sendconfirmationmail(user, otp);
};

const resendOtp = async (payload: string) => {
  const user = await Users.findOne({ email: payload });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const { otpToken, otp } = await generateOtpToken(payload);
  user.otpToken = otpToken;
  await user.save();
  sendconfirmationmail(user, otp);
  return
};

const verifyOtp = async (payload: any) => {
  const { email, otp } = payload;
  const user = await Users.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const isVerified = user.otpToken && (await verifyOtpToken(user.otpToken, otp));
  if (!isVerified) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid or expired otp code');
  }
  const data = {
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(data, config.jwt_access_secret as string, {
    expiresIn: '1h',
  });
  return {
    jwt: token,
    user: user,
  };
};

const changePassword = async (payload: any) => {
  const user = await Users.findOne({ _id: payload.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const matchPassword = await bcrypt.compare(payload.currentPassword, user.password);
  if (!matchPassword) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Current password is not valid');
  }
  user.password = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
  await Users.findByIdAndUpdate(user._id, user, { new: true });
  return;
};

export const authServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  verifyUser,
  verifyOtp,
  resetPassword,
  forgotPassword,
  changePassword,
  resendOtp
};

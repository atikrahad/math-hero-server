import mongoose, { Model } from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name?: string;
  profilePicture?: string;
  isOnline: boolean;
  role: 'user' | 'admin';
  confirmed: boolean;
  otpToken?: string;
}

export type TLogin = {
  email: string;
  password: string;
};

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>;
}
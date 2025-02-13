import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/, // Email regex validation
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin']
    },
    name: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    otpToken: {
      type: String,
    }
  },

  {
    timestamps: true,
  }
);

// Post-save hook to remove password from the returned object
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Custom static method
userSchema.statics.isUserExist = async function (email: string) {
  return await this.findOne({ email });
};

// Remove password from JSON response
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const Users = model<IUser, UserModel>('Users', userSchema);

export default Users;

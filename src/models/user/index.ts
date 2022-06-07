import { model, Schema, Document, Model } from "mongoose";
import { findByCredentials } from "./findByCredentials";
import { generateAuthToken } from "./generateAuthToken";
import postRemove from "./postRemove";
import { preSave } from "./preSave";

export interface IUserDocument extends Document {
  email: string;
  name: string;
  phone: string;
  tokens: IToken[];
  password: string;
  _id: string;
}

export interface IUser extends IUserDocument {
  generateAuthToken(this: IUserDocument): Promise<string>;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}

interface IToken {
  token: string;
}

export const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", preSave);
userSchema.post("remove", postRemove);
userSchema.methods.generateAuthToken = generateAuthToken;
userSchema.statics.findByCredentials = findByCredentials;

export const userModel = model<IUser, IUserModel>("User", userSchema);

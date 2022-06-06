import { model, Schema, Document } from "mongoose";
import { deleteProperties } from "./deleteProperties";
import { findByCredentials } from "./findByCredentials";
import { generateAuthToken } from "./generateAuthToken";
import { preSave } from "./preSave";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  deleteProperties(this: IUserDocument): IUserDocument;
}

export interface IUserModel extends IUser {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
}

interface IToken {
  token: string;
}

export const userSchema = new Schema<IUser>(
  {
    name: {
      required: true,
      unique: false,
    },
    email: {
      required: true,
      unique: true,
    },
    phone: {
      required: true,
      unique: true,
    },
    password: {
      required: true,
      minlength: 7,
    },
    tokens: [
      {
        token: {
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
userSchema.methods.toJSON = deleteProperties;
userSchema.methods.generateAuthToken = generateAuthToken;
userSchema.statics.findByCredentials = findByCredentials;

export const userModel = model<IUser>("User", userSchema);

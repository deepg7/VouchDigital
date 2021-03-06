//IMPORTS
import { Request, Response } from "express";
import { model, Schema, Document, Model } from "mongoose";
import { findByCredentials } from "./findByCredentials";
import { generateAuthToken } from "./generateAuthToken";
import postRemove from "./postRemove";
import { preSave } from "./preSave";

//USER INTERFACE
export interface IUserDocument extends Document {
  email: string;
  name: string;
  phone: string;
  tokens: IToken[];
  password: string;
  _id: string;
}

//USER INTERFACE WITH METHODS
export interface IUser extends IUserDocument {
  generateAuthToken(this: IUserDocument): Promise<string>;
}

//USER INTERFACE WITH STATICS
export interface IUserModel extends Model<IUser> {
  findByCredentials(
    email: string,
    password: string,
    req: Request,
    res: Response
  ): Promise<IUser>;
}

//TYPE OF TOKEN ARRAY IN USER
interface IToken {
  token: string;
}

//USER SCHEMA
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
      validate: {
        validator: function (email: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: `Enter a valid Email address!`,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (phone: string) {
          return /^\d{10}$/.test(phone);
        },
        message: `Enter a valid phone number!`,
      },
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

//PRE SAVE HOOK
userSchema.pre("save", preSave);

//POST REMOVE HOOK
userSchema.post("remove", postRemove);

//GENERATE AUTH TOKEN METHOD ON SCHEMA
userSchema.methods.generateAuthToken = generateAuthToken;

//FIND BY CREDENTIALS STATIC METHOD ON SCHEMA
userSchema.statics.findByCredentials = findByCredentials;

//EXPORTING MODEL
export const userModel = model<IUser, IUserModel>("User", userSchema);

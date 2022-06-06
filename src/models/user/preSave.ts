import { NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { IUser, userModel } from ".";
import bcrypt from "bcryptjs";
export const preSave = async function (this: HydratedDocument<IUser>) {
  this.email = this.email.toLowerCase();
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
};

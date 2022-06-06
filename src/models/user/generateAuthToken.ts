import { IUser, userModel, userSchema } from ".";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

const secret = process.env.JWT_SECRET || "";

export const generateAuthToken = async function (
  this: HydratedDocument<IUser>
) {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, secret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

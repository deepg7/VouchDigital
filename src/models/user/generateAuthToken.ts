import { IUser, userModel, userSchema } from ".";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

const secret = "hey" || process.env.JWT_KEY || "";

export const generateAuthToken = async function (
  this: HydratedDocument<IUser>
) {
  console.log(secret);
  const user = this;
  console.log(user);
  const token = jwt.sign({ _id: user._id.toString() }, secret);
  user.tokens = user.tokens.concat({ token: token });
  console.log(user);
  await user.save();

  return token;
};

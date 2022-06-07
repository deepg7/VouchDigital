//IMPORTS
import { IUser } from ".";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

//GETTING JWT KEY
const secret = process.env.JWT_KEY || "";

//DECLARING FUNCTION TO GENERATE AN AUTH TOKEN ON SIGN UP AND LOGIN
export const generateAuthToken = async function (
  this: HydratedDocument<IUser>
) {
  //GETTING USER
  const user = this;

  //GENERATING TOKEN AND APPENDING TO USER
  const token = jwt.sign({ _id: user._id.toString() }, secret);
  user.tokens = user.tokens.concat({ token: token });

  //SAVING USER AND RETURNING THE TOKEN
  await user.save();
  return token;
};

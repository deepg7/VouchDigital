//IMPORTS
import { userModel } from ".";
import bcrypt from "bcryptjs";
import {
  AUTHENTICATION_ERROR,
  NOT_FOUND_ERROR,
} from "../../middlewares/constants";

//FIND BY CREDENTIALS FUNCTION USED FOR LOGGING IN
export const findByCredentials = async (email: string, password: string) => {
  //CHECK IF USER EXISTS
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error(NOT_FOUND_ERROR.message);
  }

  //CHECK IF PASSWORD IS CORRECT
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(AUTHENTICATION_ERROR.message);
  }

  //IF EVERYTHING IS IN ORDER, RETURN USER
  return user;
};

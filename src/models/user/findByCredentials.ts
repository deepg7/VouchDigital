import { userModel } from ".";
import bcrypt from "bcryptjs";
export const findByCredentials = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

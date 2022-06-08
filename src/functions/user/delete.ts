//IMPORTS
import { userModel } from "../../models/user";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

//FUNCTION TO DELETE USER
const deleteUser = async (req: Request, res: Response) => {
  try {
    //REMOVE USER
    await req.user.remove();
    return res.send(req.user);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    return res.send(e);
  }
};

//EXPORT FUNCTION
export default deleteUser;

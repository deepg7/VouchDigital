//IMPORTS
import { IUserDocument, userModel } from "../../models/user";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

//FUNCTION TO UPDATE USER
const updateUser = async (req: Request, res: Response) => {
  try {
    //UPDATE USER
    const body = req.body;
    if (body.name) {
      req.user.name = body.name;
    }
    if (body.email) {
      req.user.email = body.email;
    }
    if (body.phone) {
      req.user.phone = body.phone;
    }
    if (body.password) {
      req.user.password = body.password;
    }
    await req.user.save();
    console.log(req.user);
    res.send(req.user);
  } catch (e: any) {
    console.log(e);
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default updateUser;

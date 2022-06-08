//IMPORTS
import { userModel } from "../../models/user";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

//FUNCTION TO UPDATE USER
const updateUser = async (req: Request, res: Response) => {
  try {
    //CHECK IF USER EXISTS
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
    }
    //UPDATE USER IF IT EXISTS
    user = { ...user?.toJSON(), ...req.body };
    await user?.save();
    res.send(user);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default updateUser;

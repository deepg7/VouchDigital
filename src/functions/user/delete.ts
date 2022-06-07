//IMPORTS
import { userModel } from "../../models/user";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

//FUNCTION TO DELETE USER
const deleteUser = async (req: Request, res: Response) => {
  try {
    //CHECK IF USER EXISTS
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
    }
    //REMOVE IT IF IT EXISTS
    await user?.remove();
    res.send(user);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default deleteUser;

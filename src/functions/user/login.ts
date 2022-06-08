//IMPORTS
import { userModel } from "../../models/user";
import { Request, Response } from "express";
import { AUTHENTICATION_ERROR } from "../../middlewares/constants";

//FUNCTION TO LOGIN
const login = async (req: Request, res: Response) => {
  try {
    //FIND USER BY CREDENTIALS
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password,
      req,
      res
    );
    //GENERATE AUTH TOKEN
    const token = await user.generateAuthToken();

    //RETURN USER AND TOKEN IF THEY EXIST
    if (!user || !token) {
      return res
        .status(AUTHENTICATION_ERROR.status)
        .send(AUTHENTICATION_ERROR.message);
    }
    return res.send({ user, token });
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    return res.send(e);
  }
};

//EXPORT FUNCTION
export default login;

//IMPORTS
import { userModel } from "../../models/user";
import { Request, Response } from "express";

//FUNCTION TO SIGNUP A USER
const signup = async (req: Request, res: Response) => {
  try {
    //CREATE A NEW USER OBJECT
    const user = new userModel(req.body);
    await user.save();
    //GENERATE AND SEND TOKEN TO USER
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    //SEND ERROR TO CLIENT
    res.send(e);
  }
};

//EXPORT FUNCTION
export default signup;

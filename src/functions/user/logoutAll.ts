//IMPORTS
import { Request, Response } from "express";

//FUNCTION TO LOGOUT USER FROM ALL DEVICES
const logoutAll = async (req: Request, res: Response) => {
  try {
    //OVERWRITE USER TOKENS ARRAY WITH []
    req.user.tokens = [];
    await req.user.save();
    res.send("successfully logged out of all devices");
  } catch (e) {
    //SEND ERROR TO CLIENT
    res.send(e);
  }
};

//EXPORT FUNCTION
export default logoutAll;

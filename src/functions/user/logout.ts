//IMPORTS
import { Request, Response } from "express";

//FUNCTION TO LOGOUT USER FROM A PARTICULAR DEVICE
const logout = async (req: Request, res: Response) => {
  try {
    //REMOVE TOKEN FROM USER
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("successfully logged out");
  } catch (e) {
    //SEND ERROR TO CLIENT
    res.send(e);
  }
};

//EXPORT FUNCTION
export default logout;

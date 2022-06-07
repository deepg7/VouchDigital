import { userModel } from "../../models/user";
import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("successfully logged out");
  } catch (e) {
    res.send(e);
  }
};

export default logout;

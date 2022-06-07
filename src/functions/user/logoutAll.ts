import { Request, Response } from "express";

const logoutAll = async (req: Request, res: Response) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("successfully logged out of all devices");
  } catch (e) {
    res.send(e);
  }
};

export default logoutAll;

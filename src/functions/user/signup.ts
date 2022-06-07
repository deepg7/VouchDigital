import { userModel } from "../../models/user";
import { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
  try {
    console.log("hi");
    const user = new userModel(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    console.log("hi", token);
    res.send({ user, token });
    console.log(token);
  } catch (e) {
    res.send(e);
  }
};

export default signup;

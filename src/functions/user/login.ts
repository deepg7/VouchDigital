import { userModel } from "../../models/user";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
    console.log(token);
  } catch (e) {
    res.send(e);
  }
};

export default login;

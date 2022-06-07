import { userModel } from "../../models/user";
import { Request, Response } from "express";

const updateUser = async (req: Request, res: Response) => {
  try {
    let user = await userModel.findById(req.params.id);
    user = { ...user?.toJSON(), ...req.body };
    await user?.save();
  } catch (e) {
    res.send(e);
  }
};

export default updateUser;

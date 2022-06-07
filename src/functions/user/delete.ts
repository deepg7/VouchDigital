import { userModel } from "../../models/user";
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.id);
    await user?.remove();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
};

export default deleteUser;

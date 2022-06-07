import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

const post = async (req: Request, res: Response) => {
  try {
    const contact = new contactModel({ ...req.body, userID: req.user._id });
    await contact.save();
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
};

export default post;

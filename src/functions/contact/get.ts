import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

const getContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactModel.findOne({
      _id: req.params.id,
      userID: req.user._id,
    });
    if (contact == null) {
      throw new Error("Not found");
    }
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
};

export default getContact;

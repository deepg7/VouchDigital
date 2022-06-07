import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactModel.findById(req.params.id);
    await contact?.remove();
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
};

export default deleteContact;

import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

const put = async (req: Request, res: Response) => {
  try {
    console.log("hi from put");
    let contact = await contactModel.findById(req.params.id);
    console.log("hi", contact);
    contact = { ...contact?.toJSON(), ...req.body };
    console.log(contact);
    await contact!.save();
    console.log("hi", contact);
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
};

export default put;

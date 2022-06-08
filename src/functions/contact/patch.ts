import { contactModel } from "../../models/contact";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

const patch = async (req: Request, res: Response) => {
  try {
    let contact = await contactModel.findById(req.params.id);
    if (!contact) {
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
    }
    if (req.body.name) {
      contact.name = req.body.name;
    }
    if (req.body.phone) {
      contact.phone = req.body.phone;
    }
    await contact!.save();
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
};

export default patch;

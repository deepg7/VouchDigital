//IMPORTS
import { contactModel } from "../../models/contact";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

//FUNCTION TO DELETE A CONTACT
const deleteContact = async (req: Request, res: Response) => {
  try {
    //CHECK IF CONTACT EXISTS
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
    }
    //REMOVE IT IF IT EXISTS
    await contact!.remove();
    res.send(contact);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default deleteContact;

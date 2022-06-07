//IMPORTS
import { contactModel } from "../../models/contact";
import { Request, Response } from "express";
import { NOT_FOUND_ERROR } from "../../middlewares/constants";

//FUNCTION TO GET A CONTACT
const getContact = async (req: Request, res: Response) => {
  try {
    //CHECK IF CONTACT EXISTS
    const contact = await contactModel.findOne({
      _id: req.params.id,
      userID: req.user._id,
    });
    if (!contact) {
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
    }
    //RETURN CONTACT IF IT EXISTS
    res.send(contact);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default getContact;

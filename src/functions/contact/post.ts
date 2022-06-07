//IMPORTS
import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

//FUNCTION TO CREATE A CONTACT
const post = async (req: Request, res: Response) => {
  try {
    //CREATE CONTACT
    const contact = new contactModel({ ...req.body, userID: req.user._id });
    //SAVE AND RETURN CONTACT
    await contact.save();
    res.send(contact);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default post;

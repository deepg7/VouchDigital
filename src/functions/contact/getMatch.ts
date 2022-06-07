//IMPORTS
import { contactModel, IContact } from "../../models/contact";
import { Request, Response } from "express";
import { BAD_REQUEST_ERROR } from "../../middlewares/constants";

//FUNCTION TO GET CONTACTS BASED ON MATCHING PATTERN
const getMatch = async (req: Request, res: Response) => {
  try {
    //GET NAME AND PHONE REGEX FROM QUERY
    const name = req.query.name;
    const phone = req.query.phone;
    let contacts: IContact[] = [];

    //IF BOTH ARE NULL THROW ERROR
    if (!name && !phone) {
      return res
        .status(BAD_REQUEST_ERROR.status)
        .send(BAD_REQUEST_ERROR.message);
    }
    //FOR NAME ONLY
    if (name && !phone) {
      contacts = await contactModel.find({
        name: { $regex: name, $options: "i" },
      });
    }
    //FOR PHONE ONLY
    else if (!name && phone) {
      contacts = await contactModel.find({
        phone: { $regex: phone, $options: "i" },
      });
    }
    //OR SEARCH FOR BOTH
    else {
      contacts = await contactModel.find({
        $or: [
          { name: { $regex: name, $options: "i" } },
          { phone: { $regex: phone, $options: "i" } },
        ],
      });
    }
    //RETURN CONTACTS
    res.send(contacts);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default getMatch;

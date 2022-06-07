import { contactModel } from "../../models/contact";
import { Request, Response } from "express";
import { BAD_REQUEST_ERROR } from "../../middlewares/constants";

const getMany = async (req: Request, res: Response) => {
  try {
    //FIND ALL CONTACTS OF USER
    let contacts = await contactModel.find({ userID: req.user._id });

    //GET PAGE FROM QUERY
    let page = Number(req.query.page);
    if (!page) {
      return res
        .status(BAD_REQUEST_ERROR.status)
        .send(BAD_REQUEST_ERROR.message);
    }

    //SKIP ACCORDING TO PAGE NUMBER
    const skip = (page - 1) * 5;
    contacts = contacts.slice(skip, skip + 5);

    //SEND PAGINATED CONTACTS
    res.send(contacts);
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default getMany;

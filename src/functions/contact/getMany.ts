import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

const getMany = async (req: Request, res: Response) => {
  try {
    let contacts = await contactModel.find({ userID: req.user._id });

    let page = Number(req.query.page);
    if (!page) {
      throw new Error("no page sent");
    }
    const skip = (page - 1) * 2;
    contacts = contacts.slice(skip, skip + 2);
    res.send(contacts);
  } catch (e) {
    res.send(e);
  }
};

export default getMany;

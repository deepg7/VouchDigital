import { contactModel } from "../../models/contact";
import { Request, Response } from "express";

const getMatch = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const phone = req.query.phone;
    const contacts = await contactModel.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { phone: { $regex: phone, $options: "i" } },
      ],
    });
    res.send(contacts);
  } catch (e) {
    res.send(e);
  }
};

export default getMatch;

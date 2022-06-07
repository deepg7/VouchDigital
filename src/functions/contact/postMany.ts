import { contactModel, IContact } from "../../models/contact";
import { Request, Response } from "express";

const postMany = async (req: Request, res: Response) => {
  try {
    const contacts: IContact[] = [];
    const session = await contactModel.startSession();
    session.withTransaction(async () => {
      try {
        await Promise.all(
          req.body.contacts.map(async (contact: IContact) => {
            const mongoContact = new contactModel({
              ...contact,
              userID: req.user._id,
            });
            await mongoContact.save({ session });
            contacts.push(mongoContact);
          })
        );
      } catch (e) {
        res.send(e);
      }

      res.send(contacts);
    });
  } catch (e) {
    res.send(e);
  }
};

export default postMany;

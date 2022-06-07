//IMPORTS
import { contactModel, IContact } from "../../models/contact";
import { Request, Response } from "express";

//FUNCTION TO CREATE CONTACTS IN BULK
const postMany = async (req: Request, res: Response) => {
  try {
    const contacts: IContact[] = [];
    //TRANSACTION CONTROL
    const session = await contactModel.startSession();
    session.withTransaction(async () => {
      try {
        //PARALLELISING CONTACT CREATION AND SAVING
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
        //IF ANY ERRORS OCCURRED, ROLLBACK
        res.send(e);
      }
      //RETURN CONTACTS
      res.send(contacts);
    });
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    res.send(e);
  }
};

//EXPORT FUNCTION
export default postMany;

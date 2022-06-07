import { Router, Request, Response } from "express";
import authFunction from "../../middlewares/authentication";
import { contactModel, IContact } from "../../models/contact";

const router = Router();

router.post("/", authFunction, async (req: Request, res: Response) => {
  try {
    const contact = new contactModel({ ...req.body, userID: req.user._id });
    await contact.save();
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
});

router.post("/many", authFunction, async (req: Request, res: Response) => {
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
});

router.get("/", authFunction, async (req: Request, res: Response) => {});

//pagination here
router.get("/many", authFunction, async (req: Request, res: Response) => {});

router.get("/match", authFunction, async (req: Request, res: Response) => {});

router.patch("/", authFunction, async (req: Request, res: Response) => {});

router.delete("/", authFunction, async (req: Request, res: Response) => {});

export default router;

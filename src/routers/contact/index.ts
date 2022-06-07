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
//pagination here
router.get("/many", authFunction, async (req: Request, res: Response) => {
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
});

router.get("/match", authFunction, async (req: Request, res: Response) => {
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
});

router.get("/:id", authFunction, async (req: Request, res: Response) => {
  try {
    const contact = await contactModel.findOne({
      _id: req.params.id,
      userID: req.user._id,
    });
    if (contact == null) {
      throw new Error("Not found");
    }
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", authFunction, async (req: Request, res: Response) => {
  try {
    let contact = await contactModel.findById(req.params.id);
    contact = { ...contact, ...req.body };
    await contact?.save();
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", authFunction, async (req: Request, res: Response) => {
  try {
    const contact = await contactModel.findById(req.params.id);
    await contact?.remove();
    res.send(contact);
  } catch (e) {
    res.send(e);
  }
});

export default router;

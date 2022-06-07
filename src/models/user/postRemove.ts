import { NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { IUser } from ".";
import { contactModel } from "../contact";

const postRemove = async function (
  this: HydratedDocument<IUser>,
  next: NextFunction
) {
  const contacts = await contactModel.find({ userID: this._id });
  await Promise.all(
    contacts.map(async (contact) => {
      await contact.remove();
    })
  );
  next();
};

export default postRemove;

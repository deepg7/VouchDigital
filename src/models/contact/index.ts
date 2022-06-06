import mongoose, { model, Schema, Types, ObjectId } from "mongoose";

export interface IContact {
  name: string;
  phone: string;
  address?: string;
  userID: ObjectId;
}
export const contactSchema = new Schema<IContact>({
  name: {
    required: true,
  },
  phone: {
    required: true,
    unique: true,
  },
  userID: {
    required: true,
  },
});

contactSchema.index({ userID: 1, phone: 1 }, { unique: true });

export const contactModel = model<IContact>("Contact", contactSchema);

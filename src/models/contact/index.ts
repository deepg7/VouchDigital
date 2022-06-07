//MONGOOSE IMPORTS
import { model, Schema, ObjectId } from "mongoose";

//CONTACT INTERFACE
export interface IContact {
  name: string;
  phone: string;
  address?: string;
  userID?: ObjectId;
}

//CONTACT SCHEMA
export const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (phone: string) {
        return /^\d{10}$/.test(phone);
      },
      message: `Enter a valid phone number!`,
    },
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

//INDEX FOR A USER NOT SAVING SAME NUMBER TWO TIMES
contactSchema.index({ userID: 1, phone: 1 }, { unique: true });

//EXPORTING MODEL
export const contactModel = model<IContact>("Contact", contactSchema);

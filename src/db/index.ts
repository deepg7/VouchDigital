import mongoose from "mongoose";
import { userModel } from "../models/user";
import { contactModel } from "../models/contact";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/test";
mongoose
  .connect(MONGO_URI, {})
  .then(async () => {
    await Promise.all([userModel.init(), contactModel.init()]);
    console.log("Connected to MongoDB");
    console.log(MONGO_URI);
  })
  .catch((e) => {
    console.log(e);
  });

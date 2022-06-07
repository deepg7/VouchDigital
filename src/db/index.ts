//IMPORTING MODULES,PACKAGES AND MODELS
import mongoose from "mongoose";
import { userModel } from "../models/user";
import { contactModel } from "../models/contact";

//DECLARING MONGO URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/test";

//CONNECTING TO MONGO, INITIALISING ALL MODELS AND SCHEMAS
mongoose
  .connect(MONGO_URI, {})
  .then(async () => {
    await Promise.all([userModel.init(), contactModel.init()]);
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

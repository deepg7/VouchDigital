import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/test";
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

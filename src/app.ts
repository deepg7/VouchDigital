// IMPORTS AND CONNECTING TO DB
import express, { Application } from "express";
require("dotenv").config();
require("./db");

//IMPORTING ROUTERS
import userRouter from "./routers/user";
import contactRouter from "./routers/contact";

//CRATING AN INSTANCE OF EXPRESS APP
const app: Application = express();
const PORT = process.env.PORT || 3000;

//MAKING APP USE THE ROUTERS AND JSON BODY PARSER
app.use(express.json());
app.use("/user", userRouter);
app.use("/contact", contactRouter);

//APP LISTENS ON PORT 3000
app.listen(PORT, () => console.log("Server started on port 3000"));

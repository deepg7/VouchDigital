// IMPORTS AND CONNECTING TO DB
import express, { Application } from "express";
require("dotenv").config();
require("./db");

//IMPORTING ROUTERS
import userRouter from "./routers/user";
import contactRouter from "./routers/contact";

//CRATING AN INSTANCE OF EXPRESS APP
const app: Application = express();

//MAKING APP USE THE ROUTERS AND JSON BODY PARSER
app.use(express.json());
app.use("/user", userRouter);
app.use("/contact", contactRouter);

export default app;

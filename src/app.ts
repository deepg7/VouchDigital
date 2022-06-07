import express, { Application } from "express";
import userRouter from "./routers/user";
import contactRouter from "./routers/contact";

require("dotenv").config();
require("./db");

const app: Application = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/contact", contactRouter);

app.listen(3000, () => console.log("Server started on port 3000"));

import express, { Application, Request, Response, NextFunction } from "express";
require("dotenv").config();
require("./db");
console.log(process.env.MONGO_URI);
const app: Application = express();
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});
app.listen(3000, () => console.log("Server started on port 3000"));

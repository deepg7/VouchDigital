import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const { userModel } = require("../../models/user/index");

const secret = process.env.JWT_KEY || "";

const authFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.header("Authorization");
    const val = !auth;
    if (val) {
      throw new Error("No authorization header");
    }
    const token = auth.replace("Bearer ", "");
    const { _id } = jwt.verify(token, secret) as JwtPayload;
    const user = await userModel.findOne({
      _id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("not found");
    }
    req.user = user;
    req.token = token;
    console.log("leaving auth function");
    next();
  } catch (e) {
    res.send(e);
  }
};

export default authFunction;

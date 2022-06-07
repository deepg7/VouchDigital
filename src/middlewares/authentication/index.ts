import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const userModel = require("../models/User");
const secret = process.env.JWT_SECRET || "";
const authFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.header("Authorization");
    if (auth === null || auth === undefined) {
      throw new Error("No authorization header");
    }
    const token = req.header("Authorization")!.replace("Bearer ", "");
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
    next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = authFunction;

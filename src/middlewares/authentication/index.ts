//IMPORTING REQUIRED MODULES AND PACKAGES
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  AUTHENTICATION_ERROR,
  NOT_FOUND_ERROR,
  NULL_ARRAY,
} from "../constants";
import { userModel } from "../../models/user";

//GETTING JWT SECRET FROM ENV FILE
const secret = process.env.JWT_KEY || "";

//DEFINITION OF MIDDLEWARE AUTH FUNCTION
const authFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //CHECKING IF TOKEN IS PRESENT IN HEADER
    const auth = req.header("Authorization");
    if (NULL_ARRAY.includes(auth)) {
      return res
        .status(AUTHENTICATION_ERROR.status)
        .send(AUTHENTICATION_ERROR.message);
    }

    //DECODING TOKEN
    const token = auth!.replace("Bearer ", "");
    const { _id } = jwt.verify(token, secret) as JwtPayload;

    //CHECKING IF USER EXISTS
    const user = await userModel.findOne({
      _id,
      "tokens.token": token,
    });
    if (!user) {
      return res.status(NOT_FOUND_ERROR.status).send(NOT_FOUND_ERROR.message);
    }

    //ADDING USER AND TOKEN TO REQUEST OBJECT
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    //SEND ERROR FOR ANY OTHER UNEXPECTED ERRORS
    return res.send(e);
  }
};

//EXPORTING THE AUTH FUNCTION
export default authFunction;

//IMPORTING THE DOCUMENT TYPE OF USER ENTITY
import { IUserDocument, IUserModel } from "../../src/models/user";

//EXTENDING EXPRESS REQUEST TO CONTAIN USER AND TOKEN PROPERTIES
declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
      token: string;
    }
  }
}

import { IUserDocument } from "../../src/models/user";

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
      token: string;
    }
  }
}

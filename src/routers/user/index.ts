import { Router, Request, Response } from "express";
import login from "../../functions/user/login";
import signup from "../../functions/user/signup";
import authFunction from "../../middlewares/authentication";
import { userModel } from "../../models/user";

const router = Router();

router.post("/signup", signup);

router.get("/login", login);

router.use(authFunction);

router.post("/logout", async (req: Request, res: Response) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("successfully logged out");
  } catch (e) {
    res.send(e);
  }
});

router.post("/logoutAll", async (req: Request, res: Response) => {});

router.patch("/updateProfile", (req: Request, res: Response) => {
  res.send(req.user);
});

router.delete("/deteteProfile", async (req: Request, res: Response) => {});

export default router;

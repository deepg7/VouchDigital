import { Router, Request, Response } from "express";
import login from "../../functions/user/login";
import logout from "../../functions/user/logout";
import logoutAll from "../../functions/user/logoutAll";
import signup from "../../functions/user/signup";
import authFunction from "../../middlewares/authentication";
import { userModel } from "../../models/user";

const router = Router();

router.post("/signup", signup);

router.get("/login", login);

router.use(authFunction);

router.post("/logout", logout);

router.post("/logoutAll", logoutAll);

router.patch("/updateProfile", (req: Request, res: Response) => {
  res.send(req.user);
});

router.delete("/deteteProfile", async (req: Request, res: Response) => {});

export default router;

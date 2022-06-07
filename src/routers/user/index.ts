import { Router, Request, Response } from "express";
import authFunction from "../../middlewares/authentication";
import { userModel } from "../../models/user";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log("hi");
    const user = new userModel(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    console.log("hi", token);
    res.send({ user, token });
    console.log(token);
  } catch (e) {
    res.send(e);
  }
});

router.get("/login", async (req: Request, res: Response) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
    console.log(token);
  } catch (e) {
    res.send(e);
  }
});

router.post("/logout", async (req: Request, res: Response) => {});

router.post("/logoutAll", async (req: Request, res: Response) => {});

router.patch("/updateProfile", authFunction, (req: Request, res: Response) => {
  res.send(req.user);
});

router.delete("/deteteProfile", async (req: Request, res: Response) => {});

export default router;

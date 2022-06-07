import { Router, Request, Response } from "express";
import { userModel } from "../../models/user";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = new userModel(req.body);
    const token = await user.generateAuthToken();
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

router.patch("/updateProfile", async (req: Request, res: Response) => {});

router.delete("/deteteProfile", async (req: Request, res: Response) => {});

export default router;

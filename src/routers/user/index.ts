import { Router, Request, Response } from "express";
import { userModel } from "../../models/user";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const user = new userModel(req.body);

  try {
    const token = await user.generateAuthToken();

    console.log(token);
  } catch (e) {}
});

router.get("/login", async (req: Request, res: Response) => {});

router.post("/logout", async (req: Request, res: Response) => {});

router.post("/logoutAll", async (req: Request, res: Response) => {});

router.patch("/updateProfile", async (req: Request, res: Response) => {});

router.delete("/deteteProfile", async (req: Request, res: Response) => {});

export default router;

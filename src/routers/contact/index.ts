import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {});

router.post("/many", async (req: Request, res: Response) => {});

router.get("/", async (req: Request, res: Response) => {});

//pagination here
router.get("/many", async (req: Request, res: Response) => {});

router.get("/match", async (req: Request, res: Response) => {});

router.patch("/", async (req: Request, res: Response) => {});

router.delete("/", async (req: Request, res: Response) => {});

export default router;

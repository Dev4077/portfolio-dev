import { Router, type IRouter } from "express";
import { About, serializeDoc } from "@workspace/db";
import { UpdateAboutBody, GetAboutResponse, UpdateAboutResponse } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/about", async (_req, res): Promise<void> => {
  const about = await About.findOne();
  if (!about) {
    res.status(404).json({ error: "About section not found" });
    return;
  }
  res.json(GetAboutResponse.parse(serializeDoc(about)));
});

router.put("/about", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateAboutBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const about = await About.findOneAndUpdate({}, parsed.data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

  res.json(UpdateAboutResponse.parse(serializeDoc(about)));
});

export default router;

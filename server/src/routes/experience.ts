import { Router, type IRouter } from "express";
import { Experience, serializeDoc, isValidObjectId } from "@workspace/db";
import {
  CreateExperienceBody,
  UpdateExperienceParams,
  UpdateExperienceBody,
  DeleteExperienceParams,
  ListExperienceResponse,
  UpdateExperienceResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/experience", async (_req, res): Promise<void> => {
  const entries = await Experience.find().sort({ order: 1 });
  res.json(ListExperienceResponse.parse(entries.map((e) => serializeDoc(e))));
});

router.post("/experience", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateExperienceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const entry = await Experience.create({
    ...parsed.data,
    order: parsed.data.order ?? 0,
  });

  res.status(201).json(serializeDoc(entry));
});

router.put("/experience/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateExperienceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateExperienceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const entry = await Experience.findByIdAndUpdate(params.data.id, parsed.data, {
    new: true,
  });

  if (!entry) {
    res.status(404).json({ error: "Experience not found" });
    return;
  }

  res.json(UpdateExperienceResponse.parse(serializeDoc(entry)));
});

router.delete("/experience/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteExperienceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const entry = await Experience.findByIdAndDelete(params.data.id);
  if (!entry) {
    res.status(404).json({ error: "Experience not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;

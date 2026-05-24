import { Router, type IRouter } from "express";
import { Education, serializeDoc, isValidObjectId } from "@workspace/db";
import {
  CreateEducationBody,
  UpdateEducationParams,
  UpdateEducationBody,
  DeleteEducationParams,
  ListEducationResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/education", async (_req, res): Promise<void> => {
  const entries = await Education.find().sort({ order: 1 });
  res.json(ListEducationResponse.parse(entries.map((e) => serializeDoc(e))));
});

router.post("/education", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateEducationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const entry = await Education.create({
    ...parsed.data,
    current: parsed.data.current ?? false,
    order: parsed.data.order ?? 0,
  });

  res.status(201).json(serializeDoc(entry));
});

router.put("/education/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateEducationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateEducationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const entry = await Education.findByIdAndUpdate(params.data.id, parsed.data, {
    new: true,
  });

  if (!entry) {
    res.status(404).json({ error: "Education not found" });
    return;
  }

  res.json(serializeDoc(entry));
});

router.delete("/education/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteEducationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const entry = await Education.findByIdAndDelete(params.data.id);
  if (!entry) {
    res.status(404).json({ error: "Education not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;

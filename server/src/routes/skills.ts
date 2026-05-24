import { Router, type IRouter } from "express";
import { Skill, serializeDoc, isValidObjectId } from "@workspace/db";
import {
  CreateSkillBody,
  UpdateSkillParams,
  UpdateSkillBody,
  DeleteSkillParams,
  ListSkillsResponse,
  UpdateSkillResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/skills", async (_req, res): Promise<void> => {
  const skills = await Skill.find().sort({ order: 1 });
  res.json(ListSkillsResponse.parse(skills.map((s) => serializeDoc(s))));
});

router.post("/skills", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateSkillBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const skill = await Skill.create({
    ...parsed.data,
    order: parsed.data.order ?? 0,
  });

  res.status(201).json(serializeDoc(skill));
});

router.put("/skills/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateSkillParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateSkillBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const skill = await Skill.findByIdAndUpdate(params.data.id, parsed.data, {
    new: true,
  });

  if (!skill) {
    res.status(404).json({ error: "Skill not found" });
    return;
  }

  res.json(UpdateSkillResponse.parse(serializeDoc(skill)));
});

router.delete("/skills/:id", requireAuth, async (req, res): Promise<void> => {
  const params = DeleteSkillParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const skill = await Skill.findByIdAndDelete(params.data.id);
  if (!skill) {
    res.status(404).json({ error: "Skill not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;

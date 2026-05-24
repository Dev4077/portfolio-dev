import { Router, type IRouter } from "express";
import { ContactMessage, serializeDoc, isValidObjectId } from "@workspace/db";
import {
  SendContactMessageBody,
  MarkMessageReadParams,
  ListContactMessagesResponse,
  MarkMessageReadResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/contact", requireAuth, async (_req, res): Promise<void> => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(ListContactMessagesResponse.parse(messages.map((m) => serializeDoc(m))));
});

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SendContactMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const message = await ContactMessage.create(parsed.data);
  res.status(201).json(serializeDoc(message));
});

router.patch("/contact/:id/read", requireAuth, async (req, res): Promise<void> => {
  const params = MarkMessageReadParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!isValidObjectId(params.data.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const message = await ContactMessage.findByIdAndUpdate(
    params.data.id,
    { read: true },
    { new: true },
  );

  if (!message) {
    res.status(404).json({ error: "Message not found" });
    return;
  }

  res.json(MarkMessageReadResponse.parse(serializeDoc(message)));
});

export default router;

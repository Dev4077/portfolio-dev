import { Router, type IRouter } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { About } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { getClientPublicDir } from "../lib/paths";

const router: IRouter = Router();

const publicDir = getClientPublicDir();
const uploadsDir = path.join(publicDir, "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const safeExt = allowed.includes(ext) ? ext : ".jpg";
    cb(null, `profile${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/upload/profile", requireAuth, upload.single("image"), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No image file provided" });
    return;
  }

  const url = `/uploads/${req.file.filename}`;

  await About.findOneAndUpdate(
    {},
    { profileImageUrl: url },
    { upsert: false, new: true },
  );

  res.json({ url });
});

export default router;

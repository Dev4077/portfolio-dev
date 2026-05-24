import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { Admin, serializeDoc } from "@workspace/db";
import { AdminLoginBody } from "@workspace/api-zod";
import { signToken } from "../middlewares/auth";

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const serialized = serializeDoc(admin);
  const token = signToken({ adminId: serialized.id, email: admin.email });

  res.json({
    token,
    admin: {
      id: serialized.id,
      email: admin.email,
      name: admin.name,
    },
  });
});

export default router;

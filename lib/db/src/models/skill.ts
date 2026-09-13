import { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, default: 80 },
  icon: { type: String },
  order: { type: Number, default: 0 },
});

export const Skill = models.Skill || model("Skill", skillSchema);

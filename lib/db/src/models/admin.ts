import { Schema, model, Types } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type AdminDocument = {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name?: string | null;
  createdAt: Date;
};

export const Admin = model("Admin", adminSchema);

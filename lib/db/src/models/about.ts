import { Schema, model } from "mongoose";

const aboutSchema = new Schema({
  bio: { type: String, required: true },
  tagline: { type: String, required: true },
  yearsOfExperience: { type: Number, default: 3 },
  projectsCompleted: { type: Number, default: 20 },
  technologiesUsed: { type: Number, default: 15 },
  profileImageUrl: { type: String },
  resumeUrl: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  twitterUrl: { type: String },
  email: { type: String, required: true },
  location: { type: String },
  codingPhilosophy: { type: String },
});

export const About = model("About", aboutSchema);

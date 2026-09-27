import { connectDb, Skill, serializeDoc } from "@/lib/db";
import AdminSkillsClient from "./AdminSkillsClient";

export default async function AdminSkillsPage() {
  await connectDb();
  const skills = await Skill.find().sort({ order: 1 });
  const serializedSkills = skills.map(s => serializeDoc(s));

  return (
    <AdminSkillsClient initialData={serializedSkills} />
  );
}

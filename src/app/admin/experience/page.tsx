import { connectDb, Experience, serializeDoc } from "@/lib/db";
import AdminExperienceClient from "./AdminExperienceClient";

export default async function AdminExperiencePage() {
  await connectDb();
  const exp = await Experience.find().sort({ startDate: -1 });
  const serializedExp = exp.map(e => serializeDoc(e));

  return (
    <AdminExperienceClient initialData={serializedExp} />
  );
}

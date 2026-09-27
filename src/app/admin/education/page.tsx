import { connectDb, Education, serializeDoc } from "@/lib/db";
import AdminEducationClient from "./AdminEducationClient";

export default async function AdminEducationPage() {
  await connectDb();
  const ed = await Education.find().sort({ startDate: -1 });
  const serializedEd = ed.map(e => serializeDoc(e));

  return (
    <AdminEducationClient initialData={serializedEd} />
  );
}

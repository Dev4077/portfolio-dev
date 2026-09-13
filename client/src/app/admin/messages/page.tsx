import { connectDb, ContactMessage, serializeDoc } from "@workspace/db";
import AdminMessagesClient from "./AdminMessagesClient";

export default async function AdminMessagesPage() {
  await connectDb();
  const msgs = await ContactMessage.find().sort({ createdAt: -1 });
  const serializedMsgs = msgs.map(m => serializeDoc(m));

  return (
    <AdminMessagesClient initialData={serializedMsgs} />
  );
}

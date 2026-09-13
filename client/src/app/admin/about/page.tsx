import { connectDb, About, serializeDoc } from "@workspace/db";
import AdminAboutClient from "./AdminAboutClient";

export default async function AdminAboutPage() {
  await connectDb();
  const about = await About.findOne();
  const initialData = about ? serializeDoc(about) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">About Me</h1>
          <p className="text-muted-foreground font-mono text-sm">Manage your profile and configuration.</p>
        </div>
      </div>
      <AdminAboutClient initialData={initialData} />
    </div>
  );
}

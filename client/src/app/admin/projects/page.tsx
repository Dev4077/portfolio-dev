import { connectDb, Project, serializeDoc } from "@workspace/db";
import AdminProjectsClient from "./AdminProjectsClient";

export default async function AdminProjectsPage() {
  await connectDb();
  const projects = await Project.find().sort({ order: 1 });
  const serializedProjects = projects.map(p => serializeDoc(p));

  return (
    <AdminProjectsClient initialData={serializedProjects} />
  );
}

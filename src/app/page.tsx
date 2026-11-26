import { connectDb, About, Skill, Project, Experience, Education } from "@/lib/db";
import { Sidebar } from "@/components/layout/Sidebar";
import { Hero } from "@/components/sections/Hero";
import { About as AboutSection } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience as ExperienceSection } from "@/components/sections/Experience";
import { Education as EducationSection } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { serializeDoc } from "@/lib/db";

export const revalidate = 60; // Revalidate data every minute

export default async function PortfolioPage() {
  let serializedAbout = null;
  let serializedSkills: any[] = [];
  let serializedProjects: any[] = [];
  let serializedExperiences: any[] = [];
  let serializedEducations: any[] = [];

  try {
    await connectDb();

    const [about, skills, projects, experiences, educations] = await Promise.all([
      About.findOne().catch(() => null),
      Skill.find().sort({ order: 1 }).catch(() => []),
      Project.find().sort({ order: 1 }).catch(() => []),
      Experience.find().sort({ startDate: -1 }).catch(() => []),
      Education.find().sort({ startDate: -1 }).catch(() => []),
    ]);

    serializedAbout = about ? serializeDoc(about) : null;
    serializedSkills = Array.isArray(skills) ? skills.map(serializeDoc) : [];
    serializedProjects = Array.isArray(projects) ? projects.map(serializeDoc) : [];
    serializedExperiences = Array.isArray(experiences) ? experiences.map(serializeDoc) : [];
    serializedEducations = Array.isArray(educations) ? educations.map(serializeDoc) : [];
  } catch (error) {
    console.warn("Database connection issue, using fallback data:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#18181b]">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-[#18181b]/10">
        <Sidebar about={serializedAbout} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Hero about={serializedAbout} skills={serializedSkills} />
        <AboutSection about={serializedAbout} />
        <Skills skills={serializedSkills} />
        <Projects projects={serializedProjects} />
        <ExperienceSection experiences={serializedExperiences} />
        <EducationSection educations={serializedEducations} />
        <Contact about={serializedAbout} />
      </main>

      <Footer />
    </div>
  );
}

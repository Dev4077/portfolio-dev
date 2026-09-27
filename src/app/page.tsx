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
  await connectDb();
  
  const [about, skills, projects, experiences, educations] = await Promise.all([
    About.findOne(),
    Skill.find().sort({ order: 1 }),
    Project.find().sort({ order: 1 }),
    Experience.find().sort({ startDate: -1 }),
    Education.find().sort({ startDate: -1 }),
  ]);
  
  const serializedAbout = about ? serializeDoc(about) : null;
  const serializedSkills = skills.map(serializeDoc);
  const serializedProjects = projects.map(serializeDoc);
  const serializedExperiences = experiences.map(serializeDoc);
  const serializedEducations = educations.map(serializeDoc);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
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

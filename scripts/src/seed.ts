import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";

config({
  path: path.join(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".."),
    ".env",
  ),
});
import { connectDb, Admin, About, Project, Skill, Experience } from "@workspace/db";

async function seed() {
  await connectDb();

  const passwordHash = await bcrypt.hash("admin123", 10);
  await Admin.findOneAndUpdate(
    { email: "dev@sakarsawala.dev" },
    { email: "dev@sakarsawala.dev", passwordHash, name: "Dev Sakarsawala" },
    { upsert: true },
  );

  const existingAbout = await About.findOne();
  if (!existingAbout) {
    await About.create({
      bio: "I am a Full-stack Developer with a passion for building scalable, production-grade applications. I thrive at the intersection of elegant frontend experiences and robust backend systems. From React to Node.js, I craft software that solves real problems and scales with confidence.",
      tagline: "Building the future, one commit at a time.",
      yearsOfExperience: 3,
      projectsCompleted: 25,
      technologiesUsed: 20,
      email: "dev@sakarsawala.dev",
      location: "India",
      codingPhilosophy:
        "Clean code is not written by following a set of rules. It is written by a programmer who genuinely cares — about readability, about maintainability, about the next developer who will read this.",
      githubUrl: "https://github.com/devsakarsawala",
      linkedinUrl: "https://linkedin.com/in/devsakarsawala",
      profileImageUrl: "/profile.png",
    });
  } else if (!existingAbout.profileImageUrl) {
    await About.updateOne({ _id: existingAbout._id }, { profileImageUrl: "/profile.png" });
  }

  const existingProjects = await Project.countDocuments();
  if (existingProjects === 0) {
    await Project.insertMany([
      {
        title: "DevConnect Platform",
        description:
          "A full-stack social platform for developers to connect, share projects, and collaborate in real-time.",
        longDescription:
          "Built with React, Node.js, Express, and PostgreSQL. Features real-time chat via WebSockets, project showcasing, tech stack matching, and a developer feed. Deployed on AWS EC2 with NGINX reverse proxy.",
        techStack: ["React", "Node.js", "Express", "PostgreSQL", "WebSockets", "AWS", "Docker"],
        githubUrl: "https://github.com/devsakarsawala/devconnect",
        liveUrl: "https://devconnect.demo.com",
        featured: true,
        category: "fullstack",
        order: 1,
      },
      {
        title: "AI Resume Analyzer",
        description:
          "Machine learning powered resume parser and job match scoring system with ATS optimization suggestions.",
        longDescription:
          "Integrates OpenAI GPT-4 for natural language processing of resumes. Scores resumes against job descriptions, highlights missing keywords, and suggests improvements. Built with Next.js, FastAPI, and MongoDB.",
        techStack: ["Next.js", "FastAPI", "Python", "OpenAI", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/devsakarsawala/ai-resume",
        liveUrl: "https://ai-resume.demo.com",
        featured: true,
        category: "ai",
        order: 2,
      },
      {
        title: "CloudStore API",
        description:
          "RESTful API service for distributed file storage with chunked uploads, deduplication, and CDN integration.",
        longDescription:
          "High-performance file storage API built with Node.js, featuring chunked multipart uploads, SHA-256 deduplication, Cloudinary integration, and rate limiting. Handles 10k+ requests per minute in production.",
        techStack: ["Node.js", "Express", "Cloudinary", "Redis", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/devsakarsawala/cloudstore-api",
        featured: true,
        category: "backend",
        order: 3,
      },
      {
        title: "E-Commerce Dashboard",
        description:
          "Admin analytics dashboard for e-commerce operations with real-time sales tracking and inventory management.",
        techStack: ["React", "TypeScript", "Recharts", "Node.js", "PostgreSQL"],
        githubUrl: "https://github.com/devsakarsawala/ecom-dashboard",
        featured: false,
        category: "fullstack",
        order: 4,
      },
      {
        title: "TypeScript ORM Kit",
        description:
          "Lightweight TypeScript ORM abstraction layer with automatic migration generation and type-safe query builder.",
        techStack: ["TypeScript", "Node.js", "PostgreSQL", "SQLite"],
        githubUrl: "https://github.com/devsakarsawala/ts-orm-kit",
        featured: false,
        category: "tools",
        order: 5,
      },
    ]);
  }

  const existingSkills = await Skill.countDocuments();
  if (existingSkills === 0) {
    await Skill.insertMany([
      { name: "React", category: "Frontend", proficiency: 92, icon: "SiReact", order: 1 },
      { name: "Next.js", category: "Frontend", proficiency: 85, icon: "SiNextdotjs", order: 2 },
      { name: "TypeScript", category: "Frontend", proficiency: 88, icon: "SiTypescript", order: 3 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 90, icon: "SiTailwindcss", order: 4 },
      { name: "Framer Motion", category: "Frontend", proficiency: 80, icon: "SiFramer", order: 5 },
      { name: "Node.js", category: "Backend", proficiency: 90, icon: "SiNodedotjs", order: 6 },
      { name: "Express.js", category: "Backend", proficiency: 88, icon: "SiExpress", order: 7 },
      { name: "Python", category: "Backend", proficiency: 75, icon: "SiPython", order: 8 },
      { name: "FastAPI", category: "Backend", proficiency: 70, icon: "SiFastapi", order: 9 },
      { name: "PostgreSQL", category: "Database", proficiency: 85, icon: "SiPostgresql", order: 10 },
      { name: "MongoDB", category: "Database", proficiency: 80, icon: "SiMongodb", order: 11 },
      { name: "Redis", category: "Database", proficiency: 72, icon: "SiRedis", order: 12 },
      { name: "Docker", category: "DevOps", proficiency: 78, icon: "SiDocker", order: 13 },
      { name: "AWS", category: "DevOps", proficiency: 70, icon: "SiAmazonwebservices", order: 14 },
      { name: "GitHub Actions", category: "DevOps", proficiency: 75, icon: "SiGithubactions", order: 15 },
      { name: "Git", category: "Tools", proficiency: 92, icon: "SiGit", order: 16 },
      { name: "VS Code", category: "Tools", proficiency: 95, icon: "SiVisualstudiocode", order: 17 },
      { name: "Postman", category: "Tools", proficiency: 85, icon: "SiPostman", order: 18 },
      { name: "JavaScript", category: "Languages", proficiency: 93, icon: "SiJavascript", order: 19 },
      { name: "TypeScript", category: "Languages", proficiency: 88, icon: "SiTypescript", order: 20 },
    ]);
  }

  const existingExp = await Experience.countDocuments();
  if (existingExp === 0) {
    await Experience.insertMany([
      {
        company: "TechNova Solutions",
        role: "Full-stack Developer",
        location: "Mumbai, India (Remote)",
        startDate: "Jan 2023",
        endDate: null,
        current: true,
        description:
          "Building scalable web applications and internal tooling for enterprise clients across fintech and healthtech verticals.",
        achievements: [
          "Reduced API response time by 40% through query optimization and Redis caching layer",
          "Led migration of monolithic backend to microservices, improving deployment frequency by 3x",
          "Implemented CI/CD pipeline with GitHub Actions reducing manual deployment errors to zero",
          "Mentored 2 junior developers and introduced code review standards across the team",
        ],
        order: 1,
      },
      {
        company: "Freelance / Open Source",
        role: "Full-stack Developer",
        location: "Remote",
        startDate: "Jun 2022",
        endDate: "Dec 2022",
        current: false,
        description:
          "Delivered 8 production web applications for clients in e-commerce, SaaS, and content management spaces.",
        achievements: [
          "Shipped 8 client projects on time with 100% client satisfaction rating",
          "Built reusable React component library used across 5+ projects",
          "Contributed 3 merged PRs to popular open-source projects on GitHub",
        ],
        order: 2,
      },
      {
        company: "InternHub (Internship)",
        role: "Frontend Developer Intern",
        location: "Bangalore, India",
        startDate: "Jan 2022",
        endDate: "May 2022",
        current: false,
        description:
          "Developed responsive UI features for a B2B HR platform serving 50k+ users.",
        achievements: [
          "Rebuilt legacy jQuery components in React, reducing bundle size by 35%",
          "Implemented accessible UI components following WCAG 2.1 AA standards",
          "Delivered 12 feature tickets in 4 months during Agile sprint cycles",
        ],
        order: 3,
      },
    ]);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

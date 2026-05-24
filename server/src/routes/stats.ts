import { Router, type IRouter } from "express";
import { Project, Skill, ContactMessage, About } from "@workspace/db";
import { GetPortfolioStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [totalProjects, featuredProjects, skills, totalMessages, unreadMessages, about] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Skill.find(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      About.findOne(),
    ]);

  const skillsByCategory: Record<string, number> = {};
  for (const skill of skills) {
    skillsByCategory[skill.category] = (skillsByCategory[skill.category] ?? 0) + 1;
  }

  const stats = {
    totalProjects,
    featuredProjects,
    totalSkills: skills.length,
    skillsByCategory,
    totalMessages,
    unreadMessages,
    yearsOfExperience: about?.yearsOfExperience ?? 3,
  };

  res.json(GetPortfolioStatsResponse.parse(stats));
});

export default router;

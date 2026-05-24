import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import projectsRouter from "./projects";
import skillsRouter from "./skills";
import experienceRouter from "./experience";
import aboutRouter from "./about";
import contactRouter from "./contact";
import educationRouter from "./education";
import statsRouter from "./stats";
import uploadRouter from "./upload";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(projectsRouter);
router.use(skillsRouter);
router.use(experienceRouter);
router.use(aboutRouter);
router.use(contactRouter);
router.use(educationRouter);
router.use(statsRouter);
router.use(uploadRouter);

export default router;

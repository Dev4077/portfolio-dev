"use server";

import { connectDb, About, Experience, Education, Project, Skill, ContactMessage } from "@workspace/db";
import { revalidatePath } from "next/cache";

export async function updateAboutAction(data: any) {
  try {
    await connectDb();
    let about = await About.findOne();
    if (about) {
      await About.updateOne({}, { $set: data });
    } else {
      await About.create(data);
    }
    revalidatePath("/");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveExperienceAction(id: string | null, data: any) {
  try {
    await connectDb();
    if (id) {
      await Experience.findByIdAndUpdate(id, data);
    } else {
      await Experience.create(data);
    }
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await connectDb();
    await Experience.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveEducationAction(id: string | null, data: any) {
  try {
    await connectDb();
    if (id) {
      await Education.findByIdAndUpdate(id, data);
    } else {
      await Education.create(data);
    }
    revalidatePath("/");
    revalidatePath("/admin/education");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteEducationAction(id: string) {
  try {
    await connectDb();
    await Education.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/education");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveProjectAction(id: string | null, data: any) {
  try {
    await connectDb();
    if (id) {
      await Project.findByIdAndUpdate(id, data);
    } else {
      await Project.create(data);
    }
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await connectDb();
    await Project.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveSkillAction(id: string | null, data: any) {
  try {
    await connectDb();
    if (id) {
      await Skill.findByIdAndUpdate(id, data);
    } else {
      await Skill.create(data);
    }
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSkillAction(id: string) {
  try {
    await connectDb();
    await Skill.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markMessageReadAction(id: string, read: boolean) {
  try {
    await connectDb();
    await ContactMessage.findByIdAndUpdate(id, { read });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    await connectDb();
    await ContactMessage.findByIdAndDelete(id);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

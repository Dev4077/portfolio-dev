"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(data: FormData) {
  const email = data.get("email");
  const password = data.get("password");

  if (email === "admin" && password === "admin") {
    // Set a secure HTTP-only cookie
    (await cookies()).set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function logoutAction() {
  (await cookies()).delete("admin_session");
  redirect("/admin-login");
}

export async function checkAuth() {
  const session = (await cookies()).get("admin_session");
  if (!session || session.value !== "authenticated") {
    redirect("/admin-login");
  }
}

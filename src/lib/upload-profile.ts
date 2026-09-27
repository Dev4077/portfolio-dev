import { getToken } from "./auth";

export async function uploadProfileImage(file: File): Promise<string> {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to upload an image");
  }

  const form = new FormData();
  form.append("image", file);

  const res = await fetch("/api/upload/profile", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Upload failed");
  }

  const data = (await res.json()) as { url: string };
  return data.url;
}

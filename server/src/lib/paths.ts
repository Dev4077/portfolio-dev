import path from "node:path";
import { fileURLToPath } from "node:url";

/** Monorepo root (portfolio-dev/). */
export function getRepoRoot(): string {
  let dir = path.dirname(fileURLToPath(import.meta.url));

  while (dir !== path.dirname(dir)) {
    if (path.basename(dir) === "server") {
      return path.resolve(dir, "..");
    }
    dir = path.dirname(dir);
  }

  throw new Error("Could not find repo root");
}

/** Client assets: Vite build output in production, source public/ in development. */
export function getClientPublicDir(): string {
  const repoRoot = getRepoRoot();
  if (process.env.NODE_ENV === "production") {
    return path.join(repoRoot, "client", "dist", "public");
  }
  return path.join(repoRoot, "client", "public");
}

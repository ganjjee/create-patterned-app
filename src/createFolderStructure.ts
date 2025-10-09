import path from "path";
import fs from "fs-extra";
import { structureMap } from "./structureMap";
import { getBoilerplateContent } from "./getBoilerplateContent";
import { getFileExtension } from "./getFileExtension";

export async function createFolderStructure({
  pattern,
  targetDir,
  ts,
  framework,
}: {
  pattern: string;
  targetDir: string;
  ts: boolean;
  framework: string;
}) {
  const dirs = structureMap[pattern];
  if (!dirs) {
    console.error("Unsupported pattern:", pattern);
    return;
  }

  const ext = ts
    ? framework === "react"
      ? "tsx"
      : "ts"
    : framework === "react"
    ? "jsx"
    : "js";

  for (const dir of dirs) {
    const fullPath = path.join(targetDir, dir);
    await fs.ensureDir(fullPath);

    const ext = getFileExtension(dir, ts, framework);
    const componentName = getComponentName(dir);
    const fileName =
      framework === "react" && dir.includes("components")
        ? `${componentName}.${ext}`
        : `index.${ext}`;
    const filePath = path.join(fullPath, fileName);

    const content = getBoilerplateContent(framework, dir, componentName);
    await fs.writeFile(filePath, content);
  }
}

function getComponentName(dir: string): string {
  const base = dir.split("/").slice(-1)[0];
  return capitalize(base.replace(/[^a-zA-Z0-9]/g, ""));
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

import { getUserInputs } from "./prompts.js";
import { createFolderStructure } from "./createFolderStructure.js";

export async function main() {
  console.log(
    "\n🗂️ create-folder-structure - Scaffold a frontend project based on design patterns\n"
  );

  try {
    const { targetDir, pattern, ts, framework } = await getUserInputs();
    await createFolderStructure({ pattern, targetDir, ts, framework });

    console.log("✅ Folder structure created successfully.");
  } catch (err) {
    if (!(err instanceof Error)) {
      return;
    }
    console.error(
      `Failed to generate project: ${err.message ? err.message : String(err)}`
    );
  }
}

main();

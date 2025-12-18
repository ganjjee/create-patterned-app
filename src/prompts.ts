import { input, select, confirm } from "@inquirer/prompts";

export async function getUserInputs(): Promise<{
  targetDir: string;
  pattern: string;
  ts: boolean;
  framework: string;
  foldersOnly: boolean;
}> {
  const targetDir = await input({
    message: "Where do you want to create the structure?",
    default: "src",
    validate: (value: string) =>
      value.trim() === "" ? "Please enter a directory path." : true,
  });

  const pattern: string = await select({
    message: "Select a folder structure pattern:",
    choices: [
      { name: "Atomic Design", value: "atomic" },
      { name: "Feature-Sliced Design (FSD)", value: "fsd" },
      { name: "Modular", value: "modular" },
      { name: "Clean Architecture", value: "clean" },
      { name: "Layered Architecture", value: "layered" },
    ],
  });

  const framework = await select({
    message: "Which framework are you using?",
    choices: [
      { name: "React", value: "react" },
      { name: "Vanilla", value: "vanilla" },
    ],
  });

  const ts = await confirm({
    message: "Use TypeScript?",
    default: true,
  });

  const foldersOnly = await confirm({
    message: "Create folders only (without example files)?",
    default: true,
  });

  return { targetDir, pattern, ts, framework, foldersOnly };
}

import { Command } from "commander";
import { runGenerator } from "./main";
import { confirm, select } from "@inquirer/prompts";

const program = new Command();

program
  .name("create-folder-structure")
  .description("Scaffold a frontend project based on design patterns")
  .argument("<project-name>", "Name of your project")
  .option("--pattern <type>", "Project structure pattern")
  .option("--ts", "Use TypeScript", true)
  .option("--only-dir", "Only create folder structure", false)
  .action(async (projectName: string, optionsFromCLI: any) => {
    const patterns = ["atomic", "fsd", "atomic+fsd"];
    let pattern = optionsFromCLI.pattern;
    if (pattern && !patterns.includes(pattern)) {
      console.error(
        `Invalid pattern '${pattern}'. Valid options are: ${patterns.join(
          ", "
        )}.`
      );
      process.exit(1);
    }

    if (!pattern) {
      const patternAnswer = await select({
        message: "Which design pattern would you like to use?",
        choices: [
          { name: "Atomic Design", value: "atomic" },
          { name: "Feature-Sliced Design (FSD)", value: "fsd" },
        ],
      });
      pattern = patternAnswer;
    }

    const { ts, onlyDir } = {
      ts:
        optionsFromCLI.ts ??
        (await confirm({
          message: "Do you want to use TypeScript?",
          default: false,
        })),
      onlyDir:
        optionsFromCLI.onlyDir ??
        (await confirm({
          message: "Generate only folder structure (no example files)?",
          default: false,
        })),
    };

    const options = {
      pattern,
      ts,
      onlyDir,
    };

    await runGenerator(projectName, options);
  });

program.parse();

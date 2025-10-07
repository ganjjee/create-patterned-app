import { Command } from "commander";
import { runGenerator } from "./main";

const program = new Command();

program
  .name("create-patterned-app")
  .description("Scaffold a frontend project based on design patterns")
  .argument("<project-name>", "Name of your project")
  .option(
    "--pattern <type>",
    "Project structure pattern (atomic or fsd)",
    "atomic"
  )
  .option("--ts", "Use TypeScript", false)
  .option("--react", "Set up for React", false)
  .action((projectName: string, options: any) => {
    runGenerator(projectName, options);
  });

program.parse();

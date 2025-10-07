import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";

interface GeneratorOptions {
  pattern: "atomic" | "fsd";
  ts?: boolean;
  react?: boolean;
}

export async function runGenerator(
  projectName: string,
  options: GeneratorOptions
) {
  const spinner = ora("Generating project...").start();

  try {
    const templateDir = path.resolve(__dirname, "templates", options.pattern);
    const targetDir = path.resolve(process.cwd(), projectName);

    await fs.copy(templateDir, targetDir);

    spinner.succeed(
      `Project '${projectName}' created using '${options.pattern}' pattern.`
    );
    console.log(chalk.green(`\nNext steps:`));
    console.log(`  cd ${projectName}`);
    console.log(`  npm install (or pnpm/yarn)`);
    console.log(`  Start coding! 🚀`);
  } catch (err) {
    spinner.fail("Failed to generate project.");
    console.error(err);
  }
}

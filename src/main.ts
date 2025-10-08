import fs from "fs-extra";
import path from "path";
import ora from "ora";
import chalk from "chalk";

interface GeneratorOptions {
  pattern: "atomic" | "fsd";
  ts?: boolean;
  react?: boolean;
  onlyDir?: boolean;
}

export async function runGenerator(
  projectName: string,
  options: GeneratorOptions
) {
  const spinner = ora("Generating project...").start();

  try {
    const patternDir = path.resolve(__dirname, "templates", options.pattern);
    const baseDir = path.resolve(patternDir, "base");
    const targetDir = path.resolve(process.cwd(), projectName);

    await fs.ensureDir(targetDir);
    await fs.copy(baseDir, targetDir);

    if (options.ts) {
      const tsDir = path.resolve(patternDir, "ts");
      if (fs.existsSync(tsDir)) {
        await fs.copy(tsDir, targetDir);
      }
    }

    if (options.react) {
      const reactDir = path.resolve(patternDir, "react");
      if (fs.existsSync(reactDir)) {
        await fs.copy(reactDir, targetDir);
      }
    }

    spinner.succeed(
      `Project '${projectName}' created using '${options.pattern}' pattern.`
    );
    console.log(chalk.green(`\nNext steps:`));
    console.log(`  cd ${projectName}`);
    console.log(`  npm install (or pnpm/yarn)`);
    console.log(`  Start coding! 🚀`);
  } catch (err) {
    if (!(err instanceof Error)) {
      return;
    }
    spinner.fail(
      `Failed to generate project: ${err.message ? err.message : String(err)}`
    );
    console.error(err);
  }
}

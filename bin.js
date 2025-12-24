#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.cyan.bold("\n🚀 Project Kickstart\n"));

async function run() {
  // 1. Ask questions
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate(input) {
        if (!input) return "Project name cannot be empty";
        if (fs.existsSync(input)) return "Folder already exists";
        return true;
      }
    },
    {
      type: "confirm",
      name: "useGit",
      message: "Initialize Git repository?",
      default: true
    }
  ]);

  const projectPath = path.join(process.cwd(), answers.projectName);

  // 2. Create project folder
  console.log(chalk.yellow("📁 Creating project folder..."));
  fs.mkdirSync(projectPath);

  // 3. Create starter files
  console.log(chalk.yellow("📝 Creating starter files..."));

  fs.writeFileSync(
    path.join(projectPath, "index.js"),
    `console.log("Hello from ${answers.projectName} 🚀");`
  );

  fs.writeFileSync(
    path.join(projectPath, "README.md"),
    `# ${answers.projectName}

Generated using **project-kickstart** 🚀
`
  );

  fs.writeFileSync(
    path.join(projectPath, ".gitignore"),
    `node_modules
.env`
  );

  // 4. Initialize npm
  console.log(chalk.yellow("📦 Initializing npm..."));
  execSync("npm init -y", {
    cwd: projectPath,
    stdio: "inherit"
  });

  // 5. Initialize git (optional)
  if (answers.useGit) {
    console.log(chalk.yellow("🔧 Initializing Git..."));
    execSync("git init", {
      cwd: projectPath,
      stdio: "ignore"
    });
  }

  // 6. Done 🎉
  console.log(chalk.green.bold("\n✅ Project setup complete!\n"));
  console.log(chalk.blue(`👉 cd ${answers.projectName}`));
  console.log(chalk.blue("👉 node index.js\n"));
}

run();

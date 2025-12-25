#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.cyan.bold("\n🚀 Project Kickstart\n"));

async function run() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Project name:",
        validate(value) {
          if (!value) return "Project name cannot be empty";
          if (fs.existsSync(value)) return "Folder already exists";
          return true;
        }
      },
      {
        type: "rawlist",
        name: "template",
        message: "Select template:",
        pageSize: 4,
        choices: [
          { name: "Node (Basic)", value: "Node" },
          { name: "Express (API server)", value: "Express" },
          { name: "React (Vite React)", value: "React" },
          { name: "Vite (Vanilla)", value: "Vite" }
        ]
      },
      {
        type: "confirm",
        name: "useGit",
        message: "Initialize Git?",
        default: true
      }
    ]);

    console.log(chalk.green("\n✔ Template selected:"), answers.template);

    const projectPath = path.join(process.cwd(), answers.projectName);
    const templatePath = path.join(
      __dirname,
      "templates",
      answers.template.toLowerCase()
    );

    fs.mkdirSync(projectPath);
    copyTemplate(templatePath, projectPath);

    console.log(chalk.yellow("📦 Initializing npm..."));
    execSync("npm init -y", { cwd: projectPath, stdio: "inherit" });

    if (answers.template === "Express") {
      execSync("npm install express", {
        cwd: projectPath,
        stdio: "inherit"
      });
    }

    if (answers.useGit) {
      execSync("git init", { cwd: projectPath, stdio: "ignore" });
    }

    console.log(chalk.green.bold("\n✅ Project created successfully!\n"));
    console.log(chalk.blue(`cd ${answers.projectName}`));
  } catch (err) {
    console.error(chalk.red("❌ Error:"), err.message);
  }
}

function copyTemplate(src, dest) {
  fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath);
      copyTemplate(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

run();

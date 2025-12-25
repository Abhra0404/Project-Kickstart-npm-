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
        pageSize: 3,
        choices: [
          { name: "Node (Basic)", value: "Node" },
          { name: "Express (API server)", value: "Express" },
          { name: "Vite + React", value: "Vite" }
        ]
      },
      {
        type: "confirm",
        name: "useGit",
        message: "Initialize Git?",
        default: true
      },
      {
        type: "confirm",
        name: "useLinting",
        message: "Add ESLint + Prettier?",
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

    // Create folder structure based on template
    createFolderStructure(projectPath, answers.template);

    // Create environment files
    createEnvFiles(projectPath, answers.template);

    console.log(chalk.yellow("📦 Initializing npm..."));
    execSync("npm init -y", { cwd: projectPath, stdio: "inherit" });

    // Install template-specific dependencies
    if (answers.template === "Express") {
      console.log(chalk.yellow("📦 Installing Express..."));
      execSync("npm install express", {
        cwd: projectPath,
        stdio: "inherit"
      });
    } else if (answers.template === "Vite") {
      console.log(chalk.yellow("📦 Installing Vite + React..."));
      execSync("npm install react react-dom", {
        cwd: projectPath,
        stdio: "inherit"
      });
      execSync("npm install -D vite @vitejs/plugin-react", {
        cwd: projectPath,
        stdio: "inherit"
      });
    }

    // Setup ESLint + Prettier
    if (answers.useLinting) {
      setupLinting(projectPath, answers.template);
    }

    if (answers.useGit) {
      execSync("git init", { cwd: projectPath, stdio: "ignore" });
      createGitignore(projectPath);
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

function createFolderStructure(projectPath, template) {
  const srcPath = path.join(projectPath, "src");
  
  if (template === "Express" || template === "Node") {
    // Backend structure
    const folders = ["controllers", "routes", "services", "utils"];
    folders.forEach(folder => {
      const folderPath = path.join(srcPath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
    });
    console.log(chalk.green("✔ Created backend folder structure"));
  } else if (template === "Vite") {
    // Frontend structure
    const folders = ["components", "hooks", "pages"];
    folders.forEach(folder => {
      const folderPath = path.join(srcPath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
    });
    console.log(chalk.green("✔ Created frontend folder structure"));
  }
}

function createEnvFiles(projectPath, template) {
  const envExample = path.join(projectPath, ".env.example");
  const envFile = path.join(projectPath, ".env");
  
  let envContent = "# Environment variables\n";
  
  if (template === "Express" || template === "Node") {
    envContent += "NODE_ENV=development\n";
    envContent += "PORT=3000\n";
  } else if (template === "Vite") {
    envContent += "VITE_APP_TITLE=My App\n";
  }
  
  fs.writeFileSync(envExample, envContent);
  fs.writeFileSync(envFile, envContent);
  console.log(chalk.green("✔ Created .env and .env.example"));
}

function setupLinting(projectPath, template) {
  console.log(chalk.yellow("📦 Installing ESLint + Prettier..."));
  
  const isReact = template === "Vite";
  const devDeps = isReact
    ? "eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks"
    : "eslint prettier eslint-config-prettier eslint-plugin-prettier";
  
  execSync(`npm install -D ${devDeps}`, {
    cwd: projectPath,
    stdio: "inherit"
  });
  
  // Create .eslintrc.json
  const eslintConfig = {
    env: {
      browser: isReact,
      es2021: true,
      node: true
    },
    extends: [
      "eslint:recommended",
      ...(isReact ? ["plugin:react/recommended", "plugin:react-hooks/recommended"] : []),
      "plugin:prettier/recommended"
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ...(isReact ? { ecmaFeatures: { jsx: true } } : {})
    },
    ...(isReact ? { settings: { react: { version: "detect" } } } : {}),
    rules: {
      "prettier/prettier": "warn"
    }
  };
  
  fs.writeFileSync(
    path.join(projectPath, ".eslintrc.json"),
    JSON.stringify(eslintConfig, null, 2)
  );
  
  // Create .prettierrc
  const prettierConfig = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: "es5"
  };
  
  fs.writeFileSync(
    path.join(projectPath, ".prettierrc"),
    JSON.stringify(prettierConfig, null, 2)
  );
  
  console.log(chalk.green("✔ ESLint + Prettier configured"));
}

function createGitignore(projectPath) {
  const gitignoreContent = `node_modules/
.env
dist/
build/
.DS_Store
*.log
coverage/
.vscode/
.idea/
`;
  
  fs.writeFileSync(path.join(projectPath, ".gitignore"), gitignoreContent);
  console.log(chalk.green("✔ Created .gitignore"));
}

run();

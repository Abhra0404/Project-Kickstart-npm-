#!/usr/bin/env node

const { execSync } = require("child_process");


const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
  console.log("❌ Please provide a project name");
  console.log("👉 Usage: npx project-kickstart my-app");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.log("❌ Folder already exists");
  process.exit(1);
}

fs.mkdirSync(projectPath);
console.log(`✅ Created folder: ${projectName}`);

fs.writeFileSync(
  path.join(projectPath, "index.js"),
  `console.log("Hello from ${projectName} 🚀");`
);

fs.writeFileSync(
  path.join(projectPath, "README.md"),
  `# ${projectName}\n\nProject generated using project-kickstart.`
);

fs.writeFileSync(
  path.join(projectPath, ".gitignore"),
  "node_modules\n.env"
);

console.log("📁 Starter files created");

execSync("npm init -y", {
  cwd: projectPath,
  stdio: "inherit"
});

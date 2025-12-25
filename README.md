

# 👾 Project Kickstart

**Project Kickstart** is a powerful CLI tool that lets you bootstrap modern JavaScript projects — backend and frontend — with smart defaults, templates, and industry-ready tooling.

Instead of starting every project from scratch, just run:

```bash
npx project-kickstart
````

and answer a few prompts to generate a ready-to-develop codebase.

---

## 📦 Features

This tool helps you create:

* ✅ **Node** project template
* ✅ **Express** backend template
* ✅ **Vite (React)** frontend template
* ✅ ESLint + Prettier setup (optional)
* ✅ Environment variables support (`.env`, `.env.example`)
* ✅ Folder structures for scalable apps
* ✅ Git initialization
* ✅ Auto dependency installation

These defaults aim for a clean, scalable project that developers *actually* use. 

---

## 🚀 Installation & Usage

You don’t need to install anything globally — just run:

```bash
npx project-kickstart
```

Or, if you’ve already published on npm:

```bash
npm install -g project-kickstart
project-kickstart
```

Then follow the prompts:

1. **Project name**
2. **Template type**

   * Node
   * Express
   * Vite (React)
3. Add ESLint + Prettier?
4. Initialize Git?

Once done, your new project folder will be created with sensible defaults and ready-to-run scripts.

---

## 📁 Templates Breakdown

### 🟦 Node

Basic Node project with:

* `src/` directory
* starter `index.js`
* environment variable support

### 🔵 Express

Backend starter with:

* `src/app.js`
* `src/server.js`
* `src/routes/health.route.js`
* Env file support
* ESLint + Prettier option

### ⚡ Vite (React)

React + Vite setup:

* Fast dev server (`npm run dev`)
* Hot module reload
* Folder structure:

  * `src/components/`
  * `src/hooks/`
  * `src/pages/`

---

## 💡 Example

Run the tool:

```bash
npx project-kickstart
```

Choose:

```
Project name: my-app
Template: Vite (React)
Add ESLint + Prettier? Yes
Initialize Git? Yes
```

Then:

```bash
cd my-app
npm run dev
```

---

## 🧠 How It Works

* Uses **Node CLI** (`#!/usr/bin/env node`)
* Interactive prompts via **Inquirer.js**
* Templates are copied recursively
* Dependencies installed automatically
* ESLint + Prettier configs generated (if chosen)

This means you can start writing code immediately with a clean, standardized setup. 

---

## 🤝 Contributing

Contributions are super welcome! You can:

* Add new templates (e.g., TypeScript, Tailwind, backend auth)
* Improve folder architecture
* Add more scripts (tests, CI workflows)

To contribute:

```bash
git clone https://github.com/Abhra0404/Project-Kickstart-npm-
cd Project-Kickstart-npm-
npm install
```

Feel free to open issues or submit pull requests 💡

---

## 🏷️ License

This project is licensed under the **MIT License** — free to use, modify, and share ❤️

---

## ⭐ Support

If this project helped you:

* Drop a ⭐ on GitHub
* Share it with a friend
* Use it in your next project 🚀

---

> Stay focused, stay productive, and keep leveling up! — kaizenX out. ✌️




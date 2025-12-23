

# 👾 Project Kickstart

**Project Kickstart** is a simple CLI tool that helps you bootstrap a new JavaScript/Node.js project in seconds — no repetitive setup, no overthinking.

```bash
npx project-kickstart my-app
```

Boom 💥 You’re ready to code.

---

## ✨ Features

* 📁 Creates a new project folder
* 📦 Initializes `package.json`
* 📝 Generates starter files:

  * `index.js`
  * `README.md`
  * `.gitignore`
* ⚡ Zero configuration
* 🧠 Beginner-friendly & extendable

Perfect for:

* quick experiments
* hackathons
* learning Node.js CLI tools
* avoiding setup fatigue 😴

---

## 📦 Installation & Usage

You don’t need to install anything globally.

### Run directly using `npx`:

```bash
npx project-kickstart my-app
```

### This will create:

```txt
my-app/
 ├─ index.js
 ├─ package.json
 ├─ README.md
 └─ .gitignore
```

---

## 🧪 Example

```bash
npx project-kickstart demo-project
cd demo-project
node index.js
```

Output:

```txt
Hello from demo-project 🚀
```

---

## 🛠️ How It Works (Behind the Scenes)

* Uses Node.js CLI (`#!/usr/bin/env node`)
* Reads command-line arguments via `process.argv`
* Creates files using the `fs` module
* Runs `npm init -y` automatically
* Designed to be minimal and fast

No frameworks. No magic. Just clean Node.js.

---

## 🧩 Why This Exists

Setting up a new project repeatedly is boring.

This tool was built to:

* save time
* reduce boilerplate
* learn how real-world CLI tools work
* practice publishing npm packages

Also… because typing `npm init -y` 500 times is a personality trait we’re trying to fix 😄

---

## 🚧 Planned Features (Roadmap)

* 🔘 Interactive prompts (frontend / backend)
* ⚛️ React & Express templates
* 🎨 ESLint + Prettier setup
* 📂 Custom folder structures
* 🧪 Test setup (Jest)

Contributions welcome 👀

---

## 🤝 Contributing

Pull requests are welcome!

If you’d like to add:

* templates
* features
* bug fixes

Feel free to fork and submit a PR.

---

## 📄 License

MIT License
Free to use, modify, and distribute.

---

## ⭐ If You Like It

If this project helped you:

* drop a ⭐ on GitHub
* share it with a friend
* or use it in your next project 😉

---

### Built with ❤️ by Abhra



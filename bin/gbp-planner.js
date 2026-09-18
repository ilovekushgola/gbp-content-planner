#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

const SKILL_DIR = path.resolve(__dirname, "..");
const SKILL_MD = path.join(SKILL_DIR, "SKILL.md");
const REFS_DIR = path.join(SKILL_DIR, "references");
const EVALS_FILE = path.join(SKILL_DIR, "evals", "evals.json");

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
GBP Content Planner - Skill Installer & Info

USAGE:
  npx gbp-content-planner [command]

COMMANDS:
  install [dir]    Copy skill files to your agent's skill directory
  info             Show skill details and file listing
  evals            Print built-in evaluation prompts
  paths            Show all file paths in this skill
  help             Show this help message

EXAMPLES:
  npx gbp-content-planner install ~/.agents/skills
  npx gbp-content-planner info
  npx gbp-content-planner evals
`);
}

function showInfo() {
  const skillContent = fs.readFileSync(SKILL_MD, "utf8");
  const frontmatter = skillContent.split("---")[1] || "";
  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  console.log(`
GBP Content Planner - SKILL INFO

  Name: ${nameMatch ? nameMatch[1].trim() : "gbp-content-planner"}
  Version: 1.0.0
  License: MIT

  Files:
`);
  function listFiles(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(SKILL_DIR, fullPath);
      if (entry.isDirectory()) {
        console.log(`    ${prefix}${entry.name}/`);
        listFiles(fullPath, prefix + "  ");
      } else {
        const stats = fs.statSync(fullPath);
        const size = stats.size > 1024 ? (stats.size / 1024).toFixed(1) + " KB" : stats.size + " B";
        console.log(`    ${prefix}${relativePath} (${size})`);
      }
    });
  }
  listFiles(SKILL_DIR);
}

function showEvals() {
  if (!fs.existsSync(EVALS_FILE)) { console.log("No evals file found."); return; }
  const evals = JSON.parse(fs.readFileSync(EVALS_FILE, "utf8"));
  console.log(`
BUILT-IN EVALUATION PROMPTS
`);
  evals.evals.forEach((e) => {
    console.log(`  [Eval ${e.id}]`);
    console.log(`  Prompt: ${e.prompt.substring(0, 120)}...`);
    console.log(`  Expected: ${e.expected_output.substring(0, 120)}...`);
    console.log("");
  });
}

function showPaths() {
  console.log(`
SKILL FILE PATHS

  SKILL_DIR: ${SKILL_DIR}
  SKILL_MD: ${SKILL_MD}
  REFS_DIR: ${REFS_DIR}
  EVALS_FILE: ${EVALS_FILE}
`);
}

function installSkill(targetDir) {
  const defaultDir = path.join(process.env.HOME || "/root", ".agents", "skills");
  const dest = targetDir || defaultDir;
  const skillDest = path.join(dest, "gbp-content-planner");
  console.log(`\n  Installing GBP Content Planner to: ${skillDest}\n`);
  fs.mkdirSync(skillDest, { recursive: true });
  fs.mkdirSync(path.join(skillDest, "references"), { recursive: true });
  fs.mkdirSync(path.join(skillDest, "evals"), { recursive: true });
  fs.mkdirSync(path.join(skillDest, "bin"), { recursive: true });
  fs.mkdirSync(path.join(skillDest, "assets"), { recursive: true });
  fs.mkdirSync(path.join(skillDest, "scripts"), { recursive: true });
  const filesToCopy = [
    { src: SKILL_MD, dest: path.join(skillDest, "SKILL.md") },
    { src: path.join(REFS_DIR, "ai-slop-checklist.md"), dest: path.join(skillDest, "references", "ai-slop-checklist.md") },
    { src: path.join(REFS_DIR, "visual-design-prompt.md"), dest: path.join(skillDest, "references", "visual-design-prompt.md") },
    { src: path.join(REFS_DIR, "output-template.md"), dest: path.join(skillDest, "references", "output-template.md") },
    { src: EVALS_FILE, dest: path.join(skillDest, "evals", "evals.json") },
    { src: path.join(SKILL_DIR, "package.json"), dest: path.join(skillDest, "package.json") },
    { src: path.join(SKILL_DIR, "index.js"), dest: path.join(skillDest, "index.js") },
    { src: path.join(SKILL_DIR, "README.md"), dest: path.join(skillDest, "README.md") },
  ];
  filesToCopy.forEach(({ src, dest: d }) => {
    if (fs.existsSync(src)) { fs.copyFileSync(src, d); console.log(`  Copied: ${path.relative(SKILL_DIR, src)}`); }
  });
  console.log(`\n  Skill installed successfully!`);
  console.log(`  Location: ${skillDest}`);
  console.log(`\n  Restart your agent session to pick up the new skill.\n`);
}

if (args.length === 0 || args[0] === "help") { printHelp(); }
else if (args[0] === "info") { showInfo(); }
else if (args[0] === "evals") { showEvals(); }
else if (args[0] === "paths") { showPaths(); }
else if (args[0] === "install") { installSkill(args[1]); }
else { console.error(`  Unknown command: ${args[0]}`); console.log("  Run `npx gbp-content-planner help` for usage."); process.exit(1); }

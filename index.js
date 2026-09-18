const path = require("path");
const fs = require("fs");
const SKILL_DIR = __dirname;
function getSkillMd() { return fs.readFileSync(path.join(SKILL_DIR, "SKILL.md"), "utf8"); }
function getAiSlopChecklist() { return fs.readFileSync(path.join(SKILL_DIR, "references", "ai-slop-checklist.md"), "utf8"); }
function getVisualDesignPrompt() { return fs.readFileSync(path.join(SKILL_DIR, "references", "visual-design-prompt.md"), "utf8"); }
function getOutputTemplate() { return fs.readFileSync(path.join(SKILL_DIR, "references", "output-template.md"), "utf8"); }
function getEvals() { return JSON.parse(fs.readFileSync(path.join(SKILL_DIR, "evals", "evals.json"), "utf8")).evals; }
function getAllReferences() { const refsDir = path.join(SKILL_DIR, "references"); const files = fs.readdirSync(refsDir); const refs = {}; files.forEach((file) => { refs[file] = fs.readFileSync(path.join(refsDir, file), "utf8"); }); return refs; }
function getSkillDir() { return SKILL_DIR; }
module.exports = { getSkillMd, getAiSlopChecklist, getVisualDesignPrompt, getOutputTemplate, getEvals, getAllReferences, getSkillDir };

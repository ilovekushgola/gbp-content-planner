# GBP Content Planner

Bulk Google Business Profile content planning and post generation for local businesses. Produces human-quality, SEO-aware, conversion-focused GBP posts at scale (10-200+) without generic AI writing patterns.

## Quick Install

```bash
# One-liner - no installation needed
npx gbp-content-planner info

# Install skill to your agent's skills directory
npx gbp-content-planner install

# Install to a custom directory
npx gbp-content-planner install /path/to/your/agent/skills
```

## Global Install (optional)

```bash
npm install -g gbp-content-planner
gbp-planner info
```

## Agent Setup

### Opencode

```bash
# Install to opencode's default skills directory
npx gbp-content-planner install ~/.agents/skills

# Restart opencode - the skill will auto-detect on next session
```

### Claude / Other Agents

```bash
# Copy SKILL.md + references/ to your agent's skill folder
npx gbp-content-planner install ~/.claude/skills
```

### Manual Install

Copy these files to your agent's skill directory:

```
your-agent-skills/
gbp-content-planner/
  SKILL.md                    <- Main skill instructions
  references/
    ai-slop-checklist.md      <- AI writing quality checklist
    output-template.md        <- Final output structure
    visual-design-prompt.md   <- Image generation framework
  evals/
    evals.json                <- Built-in test prompts
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `npx gbp-content-planner info` | Show skill details and file listing |
| `npx gbp-content-planner install [dir]` | Copy skill files to agent directory |
| `npx gbp-content-planner evals` | Print built-in evaluation prompts |
| `npx gbp-content-planner paths` | Show all file paths in this skill |
| `npx gbp-content-planner help` | Show help message |

## Programmatic Use

```javascript
const gbp = require("gbp-content-planner");
const skillMd = gbp.getSkillMd();
const checklist = gbp.getAiSlopChecklist();
const visualPrompt = gbp.getVisualDesignPrompt();
const outputTemplate = gbp.getOutputTemplate();
const evals = gbp.getEvals();
const refs = gbp.getAllReferences();
```

## What This Skill Does

The GBP Content Planner follows a 17-phase operating sequence:

```
UNDERSTAND -> RESEARCH -> PLAN -> APPROVE -> DRAFT -> HUMANIZE -> SEO CHECK
-> CONVERSION CHECK -> VISUAL CONCEPT -> ASSET RECOMMENDATION
-> AI IMAGE PROMPT -> FINAL QA
```

### Key Features

- **Bulk Generation** - Create 10-200+ unique GBP posts at once
- **Local SEO Focus** - Keywords, local angles, and city-specific relevance
- **Anti AI-Slop** - Built-in checklist to detect and remove generic AI writing
- **Conversion Optimization** - Every post has a clear CTA and purpose
- **Visual Concepts** - Unique creative direction for each post's imagery
- **AI Image Prompts** - Production-ready prompts for image generation
- **Humanizer Pass** - 8-point quality check for natural, authentic writing

## Example Usage

Tell your agent:

> "I need 30 GBP posts for my plumbing business in Austin, TX. We handle emergency repairs, drain cleaning, and water heater installation."

## License

MIT

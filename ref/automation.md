# Claude Code Automation Reference

Skills, agents, and hooks configured for this project.

**Last verified:** 2026-03-06

---

## Skills (`.claude/skills/`)

| Skill                | Invocation  | Type         | What it does                                                                             |
| -------------------- | ----------- | ------------ | ---------------------------------------------------------------------------------------- |
| `/deploy`            | User-only   | Side effect  | Push to GitHub + pull on Whatbox + verify headers                                        |
| `/new-case-study`    | User-only   | Scaffold     | Create evidence file, walk through 3-prompt pattern, integrate                           |
| `/check`             | User-only   | Verification | Run full `npm run check` + `npm test`, report summary table                              |
| `/update-snapshots`  | User-only   | Side effect  | Update Playwright visual baselines after confirming changes                              |
| `/content-audit`     | User-only   | Analysis     | 5-phase audit pipeline: mechanical checks → standards → deep review → 4 agent reviews → triage plan. Args: `--phase [0\|1\|2\|3\|agents\|4]` |
| `/design-tokens`     | Claude-only | Context      | Load CSS tokens + component reference before styling work                                |
| `/link-check`        | User-only   | Verification | Run linkinator + link-chain Playwright test                                              |
| `/revise-case-study` | User-only   | Analysis     | 8-criterion rubric scoring of case study drafts → approved outline for `/new-case-study` |

**User-only** = must be invoked with `/skill-name` — Claude won't trigger automatically.
**Claude-only** = Claude invokes when relevant — not available as a slash command.

---

## Agents (`.claude/agents/`)

Dispatch by asking Claude: "Run the [agent name] on [scope]."

| Agent                         | What it does                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| **accessibility-reviewer**    | WCAG 2.1 AA audit on all pages — headings, landmarks, images, focus, contrast, motion       |
| **content-reviewer**          | Reviews copy against content-first principles — flags jargon, passive voice, competing CTAs |
| **visual-regression-watcher** | Runs Playwright visual tests, reports pixel diffs, does NOT auto-update snapshots           |

---

## Hooks (`.claude/settings.json`)

| Hook                 | Trigger                  | Action                                             |
| -------------------- | ------------------------ | -------------------------------------------------- |
| Block lock/env edits | PreToolUse (Edit/Write)  | Blocks `package-lock.json` and `.env*` files       |
| Auto-format          | PostToolUse (Edit/Write) | Prettier on `.html`, `.css`, `.js`, `.json`, `.md` |
| HTML validate        | PostToolUse (Edit/Write) | html-validate on `.html` files                     |

Hooks run automatically — no user action needed.

---

## Plugin Skills (installed globally, available in this project)

| Skill                                              | What it does                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| `/frontend-design-pro:review`                      | Anti-pattern + design principles + accessibility review           |
| `/frontend-design-pro:design`                      | Interactive design wizard (trend research → moodboard → build)    |
| `/frontend-design-pro:analyze-site`                | Extract colors, fonts, patterns from a URL                        |
| `/ui-review`                                       | Structural layout review (overflow, responsive, spacing)          |
| `/ui-refactor`                                     | Targeted surgical layout improvements                             |
| `/content-first-design`                            | Content strategy framework — invoke before designing any new page |
| `/design-system-principles`                        | Spacing/color/shadow decision framework                           |
| `/elements-of-style:writing-clearly-and-concisely` | Strunk's writing rules applied to prose                           |

---

## MCP Servers (available in this project)

| Server             | What it provides                                                  |
| ------------------ | ----------------------------------------------------------------- |
| **Playwright MCP** | Browser interaction — screenshots, clicks, navigation, form fills |
| **context7**       | Live documentation lookup for Chart.js, Playwright, Mermaid       |
| **GitHub MCP**     | Issues, PRs, actions via MCP tools                                |

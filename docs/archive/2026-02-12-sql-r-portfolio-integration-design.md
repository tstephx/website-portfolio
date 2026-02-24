<!-- project: website-portfolio -->
# SQL/R Portfolio Integration Design

*Design for integrating Amazon SQL queries and R analytics scripts into the MCP portfolio server, portfolio website, and LinkedIn content pipeline.*

---

## Problem Statement

Taylor has ~21 production SQL queries and ~25 R analytics scripts from Amazon DSP programs that demonstrate deep technical capability (Redshift CTEs, window functions, logistic regression, survivorship analysis, capacity planning). These files currently sit scattered across 4+ directories with no connection to his portfolio, case studies, STAR stories, or content pipeline. This technical evidence directly strengthens 4 existing case studies but has no way to surface in interviews, on the portfolio site, or through LinkedIn.

## Goals

1. **Hiring managers**: Technical SQL/R evidence becomes concrete proof points inside STAR stories and skill assessments
2. **Portfolio site visitors**: Existing case study pages gain "Data & Analysis" sections with annotated code
3. **LinkedIn / thought leadership**: Same core evidence generates a contrarian "PM who writes production SQL" content series
4. **MCP server**: Existing tools absorb evidence through the document repository pattern - no new tools needed

## Audiences (equal priority)

- Hiring managers (interviews, STAR stories, skill proof)
- Portfolio site visitors (case studies, visual evidence)
- LinkedIn network (thought leadership, personal branding)

---

## Design

### 1. Data Model: Three-Layer Architecture

Each SQL/R file gets a three-layer representation in the MCP portfolio data. This is grounded in StoryBrand's curiosity->enlightenment->commitment model and the Consulting Bible's "create multiple content types from same core IP" principle.

#### Layer 1: Evidence (raw code, stored as-is)

The actual `.sql`, `.R`, or `.txt` file, preserved exactly. This is the "show-don't-tell" proof (per Reverse the Search). Each file gets a YAML frontmatter header for self-documentation:

```yaml
---
case_study: contract-transfer
business_problem: "Tracking 209 transfer candidates across 689 attributes"
key_techniques: [CTE, ROW_NUMBER, window_functions, multi-schema_join]
result: "Replaced scattered spreadsheets with real-time pipeline visibility"
date_range: "2023-2025"
---
```

This keeps evidence self-documenting. The MCP server can parse frontmatter for the Atoms layer automatically.

#### Layer 2: Summary (curated narrative, new markdown per cluster)

A 200-500 word narrative per evidence cluster that answers:
- What business problem did this solve?
- What techniques did I use?
- What was the result?

Written in first person, story-first. References the raw file(s). This is the "enlightenment" layer.

**Writing standards for summaries** (per *Writing That Works*):
- Lead with the result/conclusion, then explain how you got there. Never bury the point.
- Be concrete, not abstract. "Reduced cycle time from 17 weeks to 2 weeks" not "significantly improved efficiency."
- Cut relentlessly. First editing pass asks only: "What can I get rid of?"
- Organize for the reader: business impact first, methodology second, technical details last.
- Self-edit in three passes: (1) Cut unnecessary words, (2) Sharpen verbs and check facts, (3) Distance - revisit after a break.

#### Layer 3: Atoms (structured data for generation)

Extracted one-liners, STAR/CAR stories, skill tags, and metric callouts. These are the building blocks that the MCP server's existing tools (STAR stories, case studies, skill assessments) pull from. This is the "curiosity" layer - hooks for interviews, resume bullets, and LinkedIn headlines.

#### Generation Flow

```
Evidence (raw SQL/R)
  -> Summary (curated markdown narrative)
    -> Atoms (one-liners, STAR stories, skill tags, metrics)
      -> Outputs:
         - Portfolio site "Data & Analysis" sections
         - STAR story proof points (interviews)
         - LinkedIn posts (thought leadership)
         - Skill assessment evidence
         - Resume bullets
```

---

### 2. Case Study Page Enhancement

Each of the 4 existing case study pages gets a new **"Data & Analysis"** section inserted between the current "Technical" and "Results" sections.

#### Evidence-to-Case-Study Mapping

| Case Study | SQL Evidence | R Evidence |
|---|---|---|
| `contract-transfer.html` | CT Transfer Tracker, CT Case Tracker, CT WBR Summary, Defect Analysis queries (v1-v3) | CT.Data scripts (7 files: before/after KPI, correlation, hit percentage, survivorship, performance), Model Tuning (Correlation write-up, DLA logistic regression) |
| `pinnacle-scoring.html` | Pinnacle.Query.1, Pinnacle Active SQL | tier rankings R, Pinnacle projected R, DAX analysis |
| `dsp-application.html` | RFI.AM.Module, Acq.AM.Console.Module, Application Queries (Notion), Time to Completion (Notion) | Application R EXIT |
| `pinnacle-automation.html` | Quality_BR_Merge SQL, QUALITY Whole Code (Notion), SLS Performance (Notion) | station_distance_analysis R, SLS_TT modeling |

#### Section Template (consistent across all 4 pages)

Each "Data & Analysis" section follows the same structure:

1. **Narrative intro** (2-3 sentences from the Summary layer) - What problem this data infrastructure solved, why I built it myself. Lead with the result, then explain.
2. **Technique callout pills** (reuses existing `.tech-pill` CSS component) - `CTE`, `Window Functions`, `ROW_NUMBER Deduplication`, `Logistic Regression`, etc.
3. **Annotated code snippet** (1 key query, syntax-highlighted with Prism.js or similar, inline comments explaining business logic) - The most impressive/representative query from the cluster
4. **Interpretation paragraph** - What the data revealed and what business decision it drove. Per *Exploratory Data Analysis* (de Castro): "Never show a chart or query result without interpretation. The interpretation demonstrates analytical thinking, not the code itself."
5. **Expandable "Full Query" toggle** (HTML `<details>/<summary>`) - For visitors who want the complete Evidence layer without cluttering the page

This keeps pages scannable (curiosity) while offering depth (enlightenment) for those who want it.

#### Data Storytelling Principles (per *Exploratory Data Analysis*)

Each visualization or code snippet follows this flow:
**Question being answered -> Method used -> Visual/Code -> Interpretation -> Business implication**

For example: "How were transfer candidates tracked across multiple systems?" -> "CTE with ROW_NUMBER deduplication across Redshift and Salesforce" -> [code snippet] -> "This eliminated duplicate records that had been causing incorrect candidate counts" -> "Enabled accurate pipeline visibility for the first time, directly supporting the 86.6% cycle time reduction."

#### Visual Design Guidelines

- KPIs/headline metrics at top of section (existing `.metric-card` component)
- Limit to 4-5 colors per visualization; use existing CSS custom properties
- Keep accent blue (`#2563eb`) as primary data color, green for positive outcomes, muted gray for baseline
- Maintain color meaning consistency across all 4 case study pages
- Add labels alongside color (accessibility - don't rely on color alone)
- Simplicity over decoration: avoid chart junk

---

### 3. MCP Server Tool Integration

The `my-mcp-portfolio` server already has the right architecture: STAR stories, case studies, skill assessments, PortfolioConnector with document search. The SQL/R evidence plugs into the existing system through the document repository pattern.

#### New Data Directory Structure

```
portfolio/documents/technical-evidence/
├── contract-transfer/
│   ├── ct-transfer-tracker.sql        (Evidence + frontmatter)
│   ├── ct-case-tracker.sql
│   ├── ct-wbr-summary.sql
│   ├── defect-analysis-v1.sql
│   ├── defect-analysis-v2.sql
│   ├── defect-analysis-v3.sql
│   ├── ct-data-r-scripts.md           (Summary - clusters 7 R files)
│   └── model-tuning-correlation.md    (Summary - DLA + correlation)
├── pinnacle-scoring/
│   ├── pinnacle-query.sql
│   ├── pinnacle-active.sql
│   └── tier-rankings-r.md             (Summary)
├── dsp-application/
│   ├── rfi-am-module.sql
│   ├── acq-am-console-module.sql
│   └── application-analysis.md        (Summary)
└── pinnacle-automation/
    ├── quality-br-merge.sql
    ├── station-distance-analysis.md    (Summary)
    └── sls-performance.md             (Summary)
```

#### Changes to Existing Tools (no new tools)

- **STAR story generation**: Stories already reference case studies. Now they pull specific SQL/R evidence as the "Action" detail. "I built a CTE pipeline using ROW_NUMBER deduplication across Redshift and Salesforce schemas" becomes a concrete proof point inside existing stories.

- **Skill assessment**: The `SkillAssessmentProvider` already maps skills to evidence. SQL/R files add concrete examples: "SQL (Redshift)" gets tagged with actual query files showing CTEs, window functions, multi-schema joins. Changes the assessment from "Taylor says he knows SQL" to "here are 11 production queries proving it."

- **Portfolio connector**: Already does keyword and vector search across documents. Adding the summary markdown files makes technical evidence searchable. "Find evidence of statistical modeling" returns the logistic regression summaries with source file references.

- **Case study repository**: The `FileCaseStudyRepository` can reference the new evidence directory when generating case study content, pulling annotated snippets from the Evidence layer.

---

### 4. LinkedIn / Thought Leadership Pipeline

Each SQL/R evidence cluster generates content across channels through the MCP server's existing content generation tools.

#### Content Generation Pattern (per evidence cluster)

```
1 SQL/R evidence cluster
  -> 1 case study "Data & Analysis" section  (portfolio site)
  -> 1-2 STAR stories with proof points       (interviews)
  -> 1 LinkedIn post                           (thought leadership)
  -> 1 skill tag with concrete evidence        (resume/assessment)
```

#### LinkedIn Post Archetypes

The narrative angle: contrarian PM-who-codes (per Consulting Bible's advice to "poke people in the eye to get attention").

**"Behind the Query" series**
Take one SQL pattern (CTE deduplication, window functions for ranking), explain the business problem it solved, show a snippet, explain what a PM learned by writing it. Not a SQL tutorial - a story about why PMs should understand their data infrastructure.

**"When the Data Scientist Isn't Available" series**
Logistic regression for capacity planning, survivorship analysis, correlation modeling. The narrative: you don't wait for resources when your program needs answers. You build.

**One-off thought pieces**
- "689 attributes taught me more about my program than any dashboard"
- "Why I stopped asking for reports and started writing queries"
- "The SQL query that saved $13M in exit costs"

#### Key Framing Principle

Per HBR storytelling chapter + StoryBrand: Never lead with "look at my SQL." Always lead with the business problem, show the insight, then reveal you built it yourself. The code is the plot twist, not the headline.

#### LinkedIn Post Formula (per *Copywriter's Handbook* + *Complete Copywriter* + *LinkedIn for Personal Branding*)

**The 4U's for hooks** (priority order): Useful, Ultra-specific, Unique, Urgent. Number headlines outperform all other types (36% preference).

**PAS structure:** Problem (1-2 sentences naming a recognized pain) -> Agitate (2-3 sentences making it emotionally real - describe, don't emote) -> Solution (your specific approach with a concrete detail).

**Post template (~1300 chars):**
```
[HOOK: Number + ultra-specific benefit. Create information gap.]
[PROBLEM: 1-2 sentences naming a recognized pain.]
[AGITATE: 2-3 sentences making it real. Stay clear and cool.]
[SOLUTION: Your approach with concrete detail - function name, number, before/after.]
[TAKEAWAY: One portable principle they can apply today.]
[CTA: Specific question inviting comments.]
[2-3 hashtags]
```

**Tactical rules:**
- 80% engaging with others, 20% own posts
- Keep 80% informational/helpful, <20% self-promotional
- Put links in comments (algorithm penalizes external links)
- Mon-Thu best posting days; first hour after posting is "magic time"
- Voice: sure/steady, clear/cool, smart/specific. Make the reader feel smarter.
- Focus on benefits, not features: "Now the report runs in 30 seconds" beats "I used a CTE to restructure the query"

---

## Narrative Arc (across all channels)

> "I'm a PM who doesn't just manage data scientists - I AM the data scientist when needed. When Amazon's DSP programs needed analytics infrastructure and there was no data team available, I built it myself: production Redshift pipelines, R statistical models, logistic regression for capacity planning. This isn't a recent hobby - it's years of deliberate practice in data analysis that directly drove $25M+ in business outcomes."

#### Deliberate Practice Framing (per *The Professional* - Frost)

**Critical language shift:** Never say "self-taught." Say "deliberate practice." Frost connects deliberate practice (Ericsson's research) to surgeons, chess masters, elite athletes. The four features:
1. Clearly defined goals (specific SQL/R capabilities needed for each program)
2. Actual deliberateness (concentrated effort, not passive exposure)
3. Informative feedback (tested against real business outcomes)
4. Focused repetition (iterating queries across multiple programs over years)

**The 70:20:10 model** legitimizes this path: 70% of professional learning comes from experience and reflection. Taylor's path - learning by solving real problems - is what the research identifies as the primary mechanism for growth.

**AI-proof positioning:** A PM with data science skills occupies Frost's "top right quadrant" - human judgment (business context, stakeholder management) combined with technical capability (SQL, R, statistical modeling). Hardest professional profile to replace.

#### Per-Audience Framing

| Audience | Lead With | Show | Prove With |
|---|---|---|---|
| Hiring managers | Business outcomes + metrics | Technical depth as differentiator | STAR stories with SQL/R proof points |
| Portfolio visitors | Visual case study narrative | Annotated code snippets | Expandable full queries |
| LinkedIn network | Contrarian PM-who-codes angle | Business insight from data | Code as the plot twist |

---

## Research Foundation

This design is grounded in research from 10 books in Taylor's library (~120K words of source material):

### Round 1: Storytelling, Branding, Authority
1. **HBR Guide to Your Job Search** (Ch5: Storytelling) - Emotion drives hiring; blend statistics into narrative; always begin with audience in mind
2. **Reverse the Search** (Ch8: Irresistible Candidate) - Story Toolbox + CAR Method; 63% remember stories vs 5% stats; Show-Don't-Tell is the most persuasive approach
3. **LinkedIn for Personal Branding** (Ch3: Be Found) - Keywords + SEO for discoverability; "industry language" matters; profile should trigger "I need to meet this person"
4. **Building a StoryBrand 2.0** (Ch15: Execute a Campaign) - Curiosity -> Enlightenment -> Commitment stages; one-liner formula; layered content architecture
5. **The Consulting Bible** (Ch5: Presence/Authority) - Brand = reputation when you're not around; be a contrarian; create multiple content types from same IP; use your name
6. **The Professional** (Ch11: Success) - Five Ps of Success; relationships over transactions; continuous learning as differentiator

### Round 2: Writing, Visualization, Practice, Copywriting
7. **Writing That Works** (Ch1, 12, 13) - Lead with what matters; cut relentlessly; be concrete; self-editing checklist; formatting for scannability
8. **Exploratory Data Analysis** (Ch2, 7, 13) - Data storytelling design process; interpretation imperative; dashboard layout; color principles; question->method->viz->interpretation->implication flow
9. **The Professional** (Ch7, 8, 10, 11) - Deliberate practice (Ericsson); 70:20:10 model; Prime Capabilities; growth mindset; AI-proof positioning
10. **The Copywriter's Handbook** + **The Complete Copywriter** - 4U's formula; PAS structure; number headlines; information gaps; benefits over features; LinkedIn post template

Full research synthesis saved at: `~/.claude/knowledge/technical-portfolio-storytelling-expertise.md`

---

## Implementation Priority

1. **Phase 1**: Create evidence directory structure in MCP server, add frontmatter to SQL/R files, write summary markdown files
2. **Phase 2**: Add "Data & Analysis" sections to 4 case study pages on portfolio site
3. **Phase 3**: Update STAR stories and skill assessments with technical proof points
4. **Phase 4**: Draft first 3-4 LinkedIn posts from the evidence clusters

---

## Source File Inventory

### SQL (21+ files across 4 locations)

**Whatbox canonical (11 files):** `~/whatbox/taylor-amazon-projects/7_Amazon-Role-Prep/1-work-portfolio/SQL/`
**Defect Analysis (5 files):** `~/Documents/_Projects/_amazon/1_Contract_Transfer/1.CT-Revamp/2.1 Defect Analysis/`
**CT WBR (2 files):** `~/Documents/_Projects/_amazon/1_Contract_Transfer/1.CT-Revamp/2.2 CT WBR Slide/`
**Notion unique (3+ files):** SQL RFI STAGE Lookup MKT, SQL, SQL DSP LM index, Application Queries, Time to Completion, QUALITY Whole Code, SLS Performance, fin assessment queries

### R (25+ Amazon files across 3 locations)

**iCloud canonical (16 files):** `~/Library/Mobile Documents/com~apple~CloudDocs/cs_files/R_files/Amazon.R/`
**Notion Model Tuning (15 files):** `~/Documents/Notion/notion-notes-BACKUP.../R Data/Model Tuning/`
**Whatbox extras (8 files):** `~/whatbox/taylor-amazon-projects/7_Amazon-Role-Prep/1-work-portfolio/`

---

*Design created: 2026-02-12*
*Brainstorming session grounded in book library research from 10 sources (~120K words)*

# Jobs to Be Done — Portfolio Website

_Created: 2026-03-05_

---

## Part 1: The Portfolio Website

### Who is the "customer"?

The portfolio has three audiences, each hiring it for a different job:

| Audience                         | Context trigger                                                 | Time budget                                          |
| -------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| **Hiring manager**               | Reviewing applications for a Senior PM role                     | 30–90 seconds on homepage, 3–5 min on one case study |
| **Recruiter**                    | Screening candidates before passing to HM                       | 15–30 seconds — scanning for signals, not reading    |
| **Peer PM / networking contact** | Evaluating credibility after a conversation or LinkedIn message | 2–5 minutes, curiosity-driven                        |

---

### Core Job Statements

**Hiring Manager**

> When I'm reviewing a stack of PM applications and need to decide who gets a phone screen,
> I want to quickly assess whether this person solves real problems at a level appropriate for the role,
> so I can confidently add them to my interview shortlist (or skip them without guilt).

**Recruiter**

> When I'm screening 50+ applicants and need to pass 5–8 to the hiring manager,
> I want to see clear signals of seniority, scope, and impact in under 30 seconds,
> so I can justify the pass-through without needing to read deeply.

**Peer / Networking Contact**

> When someone I met sends me their portfolio and I want to understand what they actually do,
> I want to see the kind of problems they solve and how they think,
> so I can decide whether to refer them, collaborate, or just understand their background.

---

### Job Map

| Stage        | Hiring Manager                                                                                   | Recruiter                                                                | Peer                                                               |
| ------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **Define**   | "Is this person senior enough for the role I'm filling?"                                         | "Does this person match the JD keywords?"                                | "What does this person actually do?"                               |
| **Locate**   | Finds portfolio via application link or LinkedIn                                                 | Clicks link from ATS or candidate email                                  | Clicks link from LinkedIn/email                                    |
| **Prepare**  | Has JD open, comparing against requirements                                                      | Has screening checklist, looking for red/green flags                     | No checklist — browsing casually                                   |
| **Confirm**  | Scans homepage: title, tagline, card headlines — "Does this person's scope match my role?"       | Scans for: company names, titles, metrics, technical keywords            | Reads About section, scans cards for interesting problems          |
| **Execute**  | Clicks into 1 (maybe 2) case studies. Reads problem statement, skims approach, checks results.   | Doesn't click into case studies. Decision made from homepage alone.      | Reads 1 case study that looked interesting. Follows the narrative. |
| **Monitor**  | "Am I seeing evidence of ownership, ambiguity navigation, measurable impact?"                    | "Do the numbers on the homepage justify passing this candidate through?" | "Is this person solving problems I find interesting?"              |
| **Modify**   | If first case study is weak, might try one more. If strong, stops reading and moves to schedule. | N/A — one-pass decision                                                  | Might click a second case study if the first was compelling        |
| **Conclude** | Adds to interview shortlist, or closes tab                                                       | Passes to HM with note ("strong metrics, former Amazon"), or rejects     | Bookmarks, refers, or forgets                                      |

---

### Context & Circumstances

**Functional job aspects**

- Assess PM competence: Can this person scope problems, drive cross-functional work, and measure outcomes?
- Evaluate technical depth: Does this person understand systems, or just manage timelines?
- Compare against other candidates: Is this portfolio stronger than the 4 others in the stack?

**Emotional job aspects**

- **Hiring manager:** "I don't want to waste a phone screen on someone who can't handle ambiguity"
- **Recruiter:** "I need to look competent — I can't send a weak candidate to the HM"
- **Peer:** "I want to feel good about referring someone" / "I want to understand if they're at my level"

**Social job aspects**

- Hiring manager wants to tell the team "I found a strong candidate" — portfolio must give them talking points
- Recruiter wants to write a compelling pass-through note — needs 1-2 standout facts
- Peer wants to be able to say "you should talk to Taylor, they did X" — needs a memorable hook

---

### Success Criteria

| Audience       | Success =                                                                 | Failure =                                                             |
| -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Hiring manager | "I know what this person does and I want to hear more" → schedules screen | "I don't understand their impact" or "this feels junior" → closes tab |
| Recruiter      | Can write a 1-sentence pass-through note with a specific metric           | "I can't tell if they're senior enough" → skips                       |
| Peer           | Remembers one specific thing Taylor did → refers or bookmarks             | "Seemed fine but nothing stood out" → forgets                         |

**Time/effort constraints:**

- Homepage must deliver its job in **30 seconds** (recruiter) to **90 seconds** (HM)
- Case study must deliver its job in **3–5 minutes** (HM skims, doesn't read every word)
- If the reader has to work to find the impact, the portfolio has failed

---

### Pain Points (Current Portfolio)

| Pain Point                                  | Evidence                                                                                               | Who it hurts most                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **Impact numbers buried in paragraph text** | Key metrics (70% faster, $13M prevented, 94% fill rate) are mid-sentence in Approach/Result paragraphs | Recruiter (won't read paragraphs), HM (skims and misses)   |
| **All 6 cards look identical**              | Same Challenge/Approach/Result structure, same visual weight — no signal for "read this one first"     | HM (doesn't know which to click), Recruiter (wall of text) |
| **Too many case studies**                   | 6 work + 3 project = 9 cards. Best practice is 3–4. Volume signals "I can't edit" not "I have range"   | HM (decision fatigue), Peer (overwhelmed)                  |
| **Sensitive data risk**                     | Exact dollar amounts, internal program codes (FOTL, KRPT), specific headcounts — NDA exposure          | Taylor (legal risk), HM (questions judgment)               |
| **About section above work**                | Visitor sees bio before seeing any evidence of competence                                              | HM ("show me what you've done, not who you are")           |
| **Card one-liners don't hook**              | Approach text is descriptive, not provocative — no "wait, what?" moment                                | All audiences (nothing compels the click)                  |

**Workarounds users currently employ:**

- HM: Ctrl+F for numbers, dollar signs, percentages — scanning for impact signals
- Recruiter: Reads only job title, company name, and first bold number they see
- Peer: Scrolls past cards looking for the one that seems most relevant to them

---

### Competing Solutions

| Alternative                               | Strengths                                         | Why it falls short                                                                     |
| ----------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **LinkedIn profile**                      | Everyone checks it; familiar format; endorsements | No depth — can't show how you think, only what you did                                 |
| **Resume PDF**                            | Compact; ATS-friendly; easy to compare            | Bullet points strip all narrative and decision-making context                          |
| **No portfolio (just resume + LinkedIn)** | Zero effort; most candidates do this              | Undifferentiated — relies entirely on credentials and brand names                      |
| **Notion/Google Doc case studies**        | Easy to write; shareable link                     | Looks unfinished; no design credibility; signals "I didn't invest effort"              |
| **Designed portfolio (this site)**        | Shows craft, technical depth, narrative skill     | Only wins if it respects the reader's time — current version doesn't (see pain points) |

---

## Part 2: The Pre-Launch Overhaul

Each workstream in the implementation plan maps to a specific visitor job that the current site fails to serve.

---

### Workstream 1: Sanitize Sensitive Information

**Job being served:**

> When I see specific dollar amounts and internal program codes in a portfolio,
> I want to trust that this person handles confidential information responsibly,
> so I can feel confident they'd protect my company's information too.

**Why the current site fails this job:**

- 63 sensitive items across 7 pages (38 HIGH risk)
- Exact figures like "$13M", "$482K–$504K", "4.60 SDEs" signal either carelessness or NDA violation
- Internal codes (FOTL, KRPT, BPR) are identifiable by anyone at Amazon — no plausible deniability
- A hiring manager who notices this will question Taylor's judgment, not admire the specificity

**What "done" looks like:**

- All absolute dollar amounts → relative language ("nearly half a million", "eight figures")
- All internal program codes → generic descriptions ("gateway interview", "growth program")
- Percentage improvements and time reductions stay — they show impact without revealing proprietary data
- A hiring manager reads the case study and thinks "impressive results" not "should they be sharing this?"

**Outcome metrics:**

- Zero matches for `\$[0-9]` across all pages (except clearly approximated language)
- Zero matches for internal short codes (FOTL, KRPT, BPR, CFA as program name)
- Reader can still understand the scale and impact of each project

---

### Workstream 2: Homepage Card Redesign

**Job being served:**

> When I land on a PM portfolio homepage and have 30 seconds to decide if I should read further,
> I want to see concrete impact metrics immediately — without reading paragraphs,
> so I can tell in one glance whether this person operates at the level I need.

**Why the current site fails this job:**

- Key metrics are buried in the 3rd or 4th line of paragraph text
- Cards use Challenge/Approach/Result structure designed for reading, not scanning
- All 6 cards have identical visual weight — no hierarchy, no "start here" signal
- Recruiter's 15-second scan catches: job title, company name... and nothing else

**What "done" looks like:**

- Each card leads with a large, styled headline metric: "70% faster decisions", "92% time eliminated"
- Below the metric: one compelling sentence (the hook), then a "Read case study →" link
- Challenge/Approach/Result structure removed from cards (lives in the case study page)
- About section moved below Featured Projects — work first, bio second

**Outcome metrics:**

- A recruiter scanning for 15 seconds can name 2+ specific results Taylor achieved
- A hiring manager clicking one card knows the magnitude of the outcome before reading the page
- The 30-second scan test (from feedback template) yields specific memories, not "it was a lot of text"

---

### Workstream 3: Case Study Curation

**Job being served:**

> When I see 9 project cards on a portfolio homepage,
> I want to quickly identify the 2–3 most impressive projects without reading all of them,
> so I don't waste time on weaker work that dilutes my impression of the candidate.

**Why the current site fails this job:**

- 9 cards = decision fatigue. Best-practice PM portfolios show 3–4.
- Weaker entries (Chargeback, tap-sevenrooms) dilute the impression left by stronger ones (Contract Transfer, Scoring)
- Two case studies (Distance Analysis + Selection Automation) share the same program and metrics — reader thinks "is this the same project?"
- Volume signals inability to edit, not breadth of experience

**What "done" looks like:**

- Homepage features 3–4 strongest case studies (likely: Contract Transfer, Scoring, Automation, DSP Application)
- Demoted work accessible via "More Projects" link or collapsed section — not deleted, just not featured
- Each featured card is clearly the best representation of a different skill (process design, measurement, technical, research)
- No two cards share the same headline metric or program context

**Outcome metrics:**

- A visitor who reads 2 case studies sees 2 distinct problem types and 2 distinct skill sets
- The weakest featured card is still strong enough that a hiring manager would want to discuss it in an interview
- Total homepage card count: 3–4 work + 1–2 projects (max 6 total, down from 9)

---

## How the Three Workstreams Connect

```
Visitor lands on homepage (30 seconds)
         │
         ▼
┌─────────────────────────────┐
│  WORKSTREAM 2: Card Redesign │ ← "Can I see impact in 30 seconds?"
│  Headline metrics + hooks    │
│  3-4 curated cards (WS 3)   │
└──────────┬──────────────────┘
           │ clicks one card
           ▼
┌─────────────────────────────┐
│  WORKSTREAM 1: Sanitized     │ ← "Can I trust this person's judgment?"
│  Case study with relative    │
│  numbers, no internal codes  │
└──────────┬──────────────────┘
           │ finishes reading
           ▼
┌─────────────────────────────┐
│  WORKSTREAM 3: Curated lineup│ ← "Should I read another one?"
│  Each card = different skill │
│  No redundancy, no filler    │
└──────────┬──────────────────┘
           │
           ▼
    Decision: interview or skip
```

**The chain of jobs:**

1. **Scan** (30 sec) → Card redesign makes metrics visible → "This person delivers results"
2. **Read** (3–5 min) → Sanitized content builds trust → "This person thinks carefully"
3. **Compare** (optional) → Curated lineup shows range → "This person has breadth"
4. **Decide** → Schedule screen, pass to HM, refer, or bookmark

---

## Underserved Jobs (Future Opportunities)

| Unmet Job                                                               | Who          | Potential Solution                                                                            |
| ----------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| "I want to see how they think in real-time, not just polished outcomes" | HM           | Video walkthrough or annotated decision log                                                   |
| "I want to share one specific case study with my team"                  | HM           | Individual case study social cards with OG images                                             |
| "I want to know if they'd fit our culture"                              | HM / Peer    | About section with personality signals (travel, F1, etc. — already exists, needs positioning) |
| "I want to verify these claims"                                         | HM           | Testimonial quotes from managers/stakeholders (even anonymized)                               |
| "I want to see the actual artifacts"                                    | Technical HM | Password-protected appendix with sample deliverables                                          |

---

_This JTBD analysis directly informs the implementation plan at `~/.claude/plans/2026-03-05-portfolio-pre-launch-overhaul.md`._

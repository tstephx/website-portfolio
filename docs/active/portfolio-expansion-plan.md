# Portfolio Expansion Plan
<!-- project: website-portfolio -->

## Already on Site (5)
- Book Library MCP Server
- Agentic Book Pipeline
- Claude-Innit
- tap-sevenrooms
- _Lab Environment

---

## Top Tier Candidates

### 1. my-mcp-portfolio
- **Location:** `_Projects/my-mcp-portfolio`
- **What:** 50-tool AI job search MCP server (resume gen, STAR stories, HBR guidance, personal branding)
- **Skills shown:** Python, MCP protocol, AI tooling, product thinking, domain modeling
- **Why it matters:** Shows a PM who ships full software products, not just manages them

### 2. book-ingestion-python
- **Location:** `_Projects/book-ingestion-python`
- **What:** EPUB/PDF parser, chapter detection, SQLite loader — the data pipeline engine behind the book library
- **Skills shown:** Python, NLP/text processing, database design, CLI tooling, batch processing
- **Why it matters:** Shows you solve the unglamorous plumbing problems that make systems work

### 3. whatbox / calibre infrastructure
- **Location:** `_Projects/whatbox`
- **What:** Self-hosted server management — SSH automation, Calibre remote management, mounting scripts
- **Skills shown:** Linux, Bash, remote infrastructure, self-hosting
- **Why it matters:** Shows you can operate infrastructure, not just write code on a Mac

### 4. Amazon SQL & R Analytics (ENHANCE EXISTING CASE STUDIES)
- **What:** ~25 R scripts + ~21 SQL queries/docs covering production Redshift pipelines, DSPDW schema documentation, statistical modeling, logistic regression, KPI analysis, survivorship, odds ratios, capacity planning, and safety metrics for Amazon DSP programs
- **Skills shown:** SQL (Redshift, CTEs, window functions, multi-source joins), R, statistical modeling, logistic regression, correlation analysis, odds ratios, survivorship analysis, capacity planning, database schema design
- **Why it matters:** DIRECTLY strengthens existing case studies — shows PM built the data infrastructure AND did the data science
- **Action:** Add "Data & Analysis" sections to existing case study pages

#### SQL Source Locations (5 locations — whatbox canonical, Defect Analysis + WBR Slide for CT-specific queries, Notion has unique learning/schema docs)

**Whatbox (canonical, 11 files):** `~/whatbox/taylor-amazon-projects/7_Amazon-Role-Prep/1-work-portfolio/SQL/`
- `SQL_CT_Transfer_Tracker.txt` — Full transfer tracking pipeline (CTEs, deduplication, window functions, Redshift + Salesforce joins)
- `SQL_CT_Case_Tracker.txt` — Case-level tracking
- `SQL.CT.DSP.code.txt` — DSP-level CT queries
- `SQL.CT.DSP.KPI.txt` — DSP KPI extraction from analytics warehouse
- `SQL.CT.Criteria.BR.Data.txt` — Business Review criteria data (lead data + DSP spectrum + BR types)
- `SQL_Quality_BR_Merge_CT_Summary.txt` — Quality metrics merge (safety scores, BOC, CAP, NSF, delivery/pickup quality, insurance risk flags)
- `SQL.RFI.AM.Module.3.1.24.txt` — Application module completion tracking (13 modules by status/date)
- `SQL.Acq.AM.Console.Module.txt` — Acquisition module status tracking (PIVOT-style CASE statements)
- `SQL.Duplicate.Phone.txt` — Duplicate phone detection
- `Pinnacle.Query.1.txt` — Pinnacle eligibility query
- `CT_Summary_SADT.11.21.24.docx` / `CT_Summary_CATY.8.28.23.docx` — Summary reports

**Defect Analysis (5 SQL files, no extension):** `~/Documents/_Projects/_amazon/1_Contract_Transfer/1.CT-Revamp/2.1 Defect Analysis/`
- `CT-SQL-Tracker-8-26` (1.7KB) — Creates temp table `ct_transfer_tracker` with CTE DeduplicatedData, ROW_NUMBER deduplication over `latest_lead_hconf`
- `CT-SQL-Tracker-v2-8-26` (2.8KB) — Enhanced version with enhanced_screening fields, tier_rating, program_type
- `CT-Tracker-v3-SQL-8-26` (3.6KB) — Creates temp table `ct_case_tracker` from `dsp_spectrum_restricted_salesfo`, case-level tracking with date_trunc
- `Pinnacle-Active-SQL-8-26` (2.5KB) — Multiple temp tables (pinnacle_launch, active_pinnacle_dsps, pinnacle_exit), joins `w_sf_pinnacle_target`
- `V2-fulll-CT-Summary-WBR-SQL-8-26` (1.1KB) — WBR summary joining `latest_lead_hconf` with `d_sf_leadflow_data`
- Also contains: 5 CSV data exports, 1 xlsx requirements file

**CT WBR Slide (2 SQL files + docs):** `~/Documents/_Projects/_amazon/1_Contract_Transfer/1.CT-Revamp/2.2 CT WBR Slide/`
- `CT-Summaryv1-SQL-WBR-8-26-25` — WBR summary query with CTE + DSP data join
- `Query-Variables-8-26-25` — Query variable definitions
- Also contains: Contract Transfer MBR.docx

**my-mcp-portfolio copy (10 files):** `_Projects/my-mcp-portfolio/portfolio/code/sql-queries/`
- Same as whatbox minus `Pinnacle.Query.1.txt` and the 2 summary .docx files

**Notion (UNIQUE — schema docs, learning materials, additional queries):**
- Copy 1: `~/Documents/Notion/notion-notes-BACKUP-20251118/Ultimate Brain + Creator's Companion/Archive/All Notes [UBCC]/SQL DSP LM/`
- Copy 2: `~/Documents/Notion/Notion-Export/Work-Ultimate Brain + Creator's Companion/Archive/All Notes [UBCC]/SQL DSP LM/`
- Both copies are identical (23 files, same sizes)
- **Also at UBCC level (outside SQL DSP LM folder):**
  - `SQL RFI STAGE Lookup MKT` (6.5KB) — RFI stage lookup with market/region CTE query (UNIQUE — not in whatbox or my-mcp-portfolio)
  - `SQL` (6.4KB) — Pinnacle-related SQL notes
  - `SQL DSP LM` index (8.4KB) — Index page with DSP data metric logic, key schemas, dimension definitions
- **Inside SQL DSP LM folder:**
- `DSPDW_Database_Schema_Column_Mapping.10.4.2023.xlsm` — Full DSPDW database schema mapping (2.4MB)
- `DSP Data Academy Week 1 Slides.pdf` / `Week 2 Slides.pdf` — DSP Data Academy training materials
- `DSPDW/` — Schema documentation:
  - `SF_Lead Object` (21KB) — Salesforce Lead object mapping
  - `LMSS_PROD` — Production schema docs
- `Application Queries` (15KB) — Application-related SQL queries
- `Define Goal for Time to Completion` (19KB) — Time-to-completion analysis queries
- `QUALITY Whole Code` (3KB) — Quality metrics SQL
- `fin assessment` (21KB) — Financial assessment detailed write-up
- `fin assessment queries` — Financial assessment SQL queries
- `fin assessment/R` (9KB) — Financial assessment R code
- `SLS Performance` (2KB) — Service Level performance queries
- `Application R EXIT` (6KB) — Application exit analysis R code
- `Query on BR Type` — Business Review type queries
- `Queries` collection (11KB) — Additional query collection

#### Additional R scripts in whatbox (not in iCloud/Notion)

**Whatbox work-portfolio:** `~/whatbox/taylor-amazon-projects/7_Amazon-Role-Prep/1-work-portfolio/`
- `d1-ZL.ML.Analysis.4.26.23.R` — ML analysis
- `d2-ZL.Linear.Regression4.27.23.R` — Linear regression
- `d3-tier.rankings.5.17.23.R` — Tier ranking model
- `d4-station_distance_analysis_07_24v0.R` — Geospatial station distance analysis
- `8.8.24.DAX8.100M.R` — DAX analysis
- `8.8.24.PIN.PROJECTED.R` — Pinnacle projections
- `ALL_DSP_Level_Data_4.1.22-3.1.23.R` — Full DSP dataset analysis (1 year)
- `Fin.Assessment.R` — Financial assessment

#### R Source Locations (4 locations — iCloud canonical, Notion has Model Tuning, whatbox has extras)

**iCloud (canonical CT scripts):** `~/Library/Mobile Documents/com~apple~CloudDocs/cs_files/R_files/Amazon.R/`
- `CT.Data/` (7 files):
  - `before.afterKPI.R` — Before/after KPI comparison
  - `Correlation4.12.R` — Correlation analysis
  - `hitpercentage.R` — Hit rate analysis
  - `hitdata_3rdparty.R` — Third-party data analysis
  - `hitdata_P_F_E.R` — Pass/Fail/Exception analysis
  - `hitdata_Survivorship.R` — Survivorship modeling
  - `PerformanceData4.7.R` — Performance metrics
- `R Scripts/` (9 files):
  - `AllCTDSPs.R` — All CT DSP analysis
  - `CompletedTransfers.R` — Transfer completion tracking
  - `Odds Ratios4.7.R` — Statistical odds ratios
  - `DSPsPreTransfer.R` — Pre-transfer DSP analysis
  - `Display_Ads.R` — Display advertising analysis
  - `TextidentificationMT.R` — Text identification/classification
  - `PerformanceData4.7.R` / `4.7 2.R` — Performance iterations
  - `hitpercentage.R` — Hit percentage analysis

**Notion Backup (duplicate + Model Tuning extras):** `~/Documents/Notion/notion-notes-BACKUP-20251118/Ultimate Brain + Creator's Companion/Archive/All Notes [UBCC]/R Data/`
- `Scripts/` — Same as iCloud R Scripts (AllCTDSPs, CompletedTransfers, Odds Ratios, etc.)
- `Model Tuning/` (UNIQUE — not in iCloud or whatbox, ~15 files with code + write-ups):
  - `DLA code Logistic` — Logistic regression model (25KB write-up)
  - `Capacity Reliability` — Capacity/reliability modeling + write-up
  - `Payroll_NSFs` — Payroll non-sufficient funds modeling + write-up
  - `Safety Metric` — Safety metric modeling code (13KB)
  - `BOC` — Business Operations Compliance code + write-up
  - `CAP` — Capacity model code (9KB) + write-up
  - `SLS_TT` — Service Level / Transit Time modeling (13KB code)
  - `Corr Write Up` — Correlation analysis (20KB) with polished "WRITE UP 2.0"
  - `DLA Write Up` — Deep-dive logistic analysis write-up (8KB)
- `Acquisitions Model` — DSP acquisition modeling
- `Correlation R - Help` — Methodology notes
- `4 10 R` — Additional analysis
- `R Data f6bc8238...md` — Index/overview page (10KB)

**Whatbox (unique R scripts):** `~/whatbox/taylor-amazon-projects/7_Amazon-Role-Prep/1-work-portfolio/`
- 8 additional R scripts (ML analysis, linear regression, tier rankings, geospatial, DAX, Pinnacle projections, full DSP dataset, financial assessment)

**Local copy:** `_Projects/Development/cs_projects/R.projects/` — Subset of iCloud (older versions)

### 5. experiment-master R Package
- **Location:** `~/Library/Mobile Documents/com~apple~CloudDocs/cs_files/R_files/experiment-master/`
- **What:** Published R package with DESCRIPTION, NAMESPACE, man/ docs, src/ compiled code, Travis CI
- **Skills shown:** R package development, software packaging, CI/CD, documentation
- **Why it matters:** You built and published a real software package — not a script, a package

---

## Strong Candidates

### 6. NFL Score Prediction Model
- **Location:** `iCloud/cs_files/R_files/NFL Score prediction - final - 12.15.R`
- **What:** Multiple linear regression model — feature selection, train/test split, out-of-sample R-squared validation
- **Skills shown:** ML methodology, statistical modeling, sports analytics
- **Why it matters:** Proper ML workflow, not just "I ran some numbers"

### 7. excel-cleaner-app
- **Location:** `_Projects/Development/Excel_Tools/excel-cleaner-app`
- **What:** React/Node app for cleaning Excel data
- **Skills shown:** JavaScript, React, Node.js, front-end development
- **Why it matters:** Shows full-stack capability beyond Python/R

### 8. document-intelligence
- **Location:** `_Projects/document-intelligence`
- **What:** Document analysis system with clean architecture, test suite, design docs
- **Skills shown:** Clean architecture, testing, API design, Python
- **Why it matters:** Shows software engineering discipline (tests, design docs, separation of concerns)

### 9. PM-Technical-Knowledge
- **Location:** `_Projects/Learning/PM-Technical-Knowledge`
- **What:** Self-directed learning curriculum (Git, Containers, DevOps, Infra, Data, AI/ML, Architecture) with progress tracking
- **Skills shown:** Deliberate learning, structured self-education
- **Why it matters:** Shows you systematically teach yourself engineering — growth mindset made tangible

---

## Supporting Candidates

### 10. R Projects Collection (Sports & Personal Analytics)
- **What:** NBA data scrapers, Fantasy Football, March Madness predictions, NFL score prediction, FinAssessmentTiers, geocoded data, chargeback analysis, linear/logistic regression coursework
- **Skills shown:** R, data analysis, web scraping, geospatial, sports analytics, ML methodology
- **Could be:** Combined into a "Sports Analytics & Data Science" case study

#### Source Locations
- `_Projects/Development/cs_projects/R.projects/` — NBA scrapers, Fantasy Football, FinAssessmentTiers, geocoded data, chargeback test, NCAA, WeddingMap
- `~/Library/Mobile Documents/com~apple~CloudDocs/cs_files/R_files/` — NFL Score Prediction, March Madness, Titanic logistic regression, linear regression coursework (2.4, 2.6, 2.8), Col Solare, Big Project
- `~/Library/Mobile Documents/com~apple~CloudDocs/cs_files/GitHub/` — FantasyFootballAnalyticsR, FootballAnalyticsR, FF, Spoon-Knife
- `~/Library/Mobile Documents/com~apple~CloudDocs/cs_files/code_files/` — Automate Economist PDF Uploads, Automate The Boring Stuff, autossh, consolidate_all_library_metadata

### 11. Monero Node
- **Location:** `_Projects/Development/cs_projects/` + `_Projects/Crypto/`
- **What:** Cryptocurrency full node operation
- **Skills shown:** Blockchain infrastructure, networking, self-hosting

### 12. portfolio-analysis
- **Location:** `_Projects/portfolio-analysis`
- **What:** AI batch analysis of 285+ work files — executive summaries, role templates, achievement frameworks
- **Skills shown:** Structured data analysis at scale, AI-driven content extraction

### 13. motley-fool-scraper
- **Location:** `_Projects/motley-fool-scraper`
- **What:** Web scraper for financial data conversion
- **Skills shown:** Python, web scraping, data conversion

### 14. calendar-2026
- **Location:** `_Projects/calendar-2026`
- **What:** Custom calendar generator
- **Skills shown:** Python, automation, utility building

### 15. consolidate_all_library_metadata
- **Location:** `iCloud/cs_files/code_files/`
- **What:** Calibre metadata consolidation tool
- **Skills shown:** Data consolidation, library management automation

### 16. dotfiles
- **Location:** `~/dotfiles`
- **What:** Version-controlled shell config with install script
- **Skills shown:** Bash, environment reproducibility, infrastructure-as-code mindset

---

## Narrative

These projects fill resume gaps by showing Taylor is a **lifelong builder** across languages (Python, R, SQL, JavaScript, Bash), from production Redshift data pipelines to statistical modeling to AI-powered tools. The SQL work shows production-grade data engineering on Amazon's warehouse — CTEs, window functions, multi-source joins across Salesforce and Redshift. The R work shows real statistical modeling (logistic regression, survivorship analysis, capacity planning) with polished write-ups. The MCP servers and pipelines show someone who builds production systems end-to-end. This isn't a PM who recently picked up coding — it's a PM who's been building the data infrastructure behind his own programs for years.

---

## Complete Source Inventory

| Language | Amazon Work | Personal Projects | Total Files |
|----------|------------|-------------------|-------------|
| SQL | 11 canonical (whatbox) + 7 Defect Analysis/WBR + Notion schema/learning docs (~10 additional) | — | ~28 |
| R | ~25 Amazon analytics + ~15 Model Tuning | ~15 sports/personal | ~55 |
| Python | — | 8+ projects (MCP servers, pipelines, scrapers) | — |
| JavaScript | — | excel-cleaner-app (React/Node) | — |
| Bash | — | whatbox infra, dotfiles, automation | — |

---

## Suggested Priority Order
1. Enhance existing case studies with SQL + R analytics sections (highest ROI — adds technical depth to content already on site)
   - `contract-transfer.html` — CT Transfer Tracker SQL, CT.Data R scripts, Model Tuning write-ups
   - `pinnacle-scoring.html` — Pinnacle.Query.1 SQL, tier rankings R, projected R
   - `dsp-application.html` — Acq.AM.Console.Module SQL, RFI.AM.Module SQL, Application Queries + Time to Completion (Notion)
   - `pinnacle-automation.html` — station_distance_analysis R, Quality_BR_Merge SQL, QUALITY Whole Code (Notion), SLS Performance (Notion)
2. Add `my-mcp-portfolio` case study (biggest standalone project)
3. Add `book-ingestion-python` case study (completes the book library ecosystem story)
4. Add sports analytics / R collection case study (shows data science roots)
5. Add `whatbox` infrastructure case study (shows ops capability)
6. Add remaining projects as needed

---

*Created: 2026-02-12*

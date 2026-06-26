---
inclusion: auto
---

# Test-Glassbox — Project Overview

## What This Is

A project management dashboard built as a test target for Glassbox browser automation. The app is intentionally non-trivial — multiple pages, interconnected state, async data loading — to exercise real-world automation scenarios.

## Project Structure

```
test-glassbox/
├── src/                          ← Angular 21 application
│   ├── app/
│   │   ├── components/           ← Shared components (navigation, confirm-dialog)
│   │   ├── guards/               ← Route guards (auth)
│   │   ├── pages/                ← Feature pages (login, dashboard, projects, project-detail, settings)
│   │   └── store/                ← NgRx state management (auth, projects, tasks, team, settings)
│   ├── assets/data/              ← Static JSON data files (no backend)
│   └── styles.css                ← Global CSS with custom properties
├── glassbox/                     ← Glassbox automation (self-contained sub-project)
│   ├── glassbox.config.ts
│   ├── package.json              ← Own dependencies, "type": "module"
│   ├── journeys/                 ← Journey files (*.journey.ts)
│   └── page-objects/             ← Page object files (*.page.ts)
├── test-journeys/                ← Markdown docs describing test scenarios
├── package.json                  ← Angular app dependencies + convenience scripts
└── angular.json
```

## Tech Stack — Application

- Angular 21, standalone components
- NgRx for all state management (store, effects, selectors)
- No backend — data loaded from static JSON in `src/assets/data/`
- Modern CSS with custom properties, nesting, no preprocessor
- Dark theme default, light theme via `[data-theme="light"]`
- `data-testid` attributes on all interactive elements

## Tech Stack — Automation

- `@mechris3/glassbox` — browser automation via raw CDP
- Page objects extend `BasePage` (provides `fill`, `click`, `getText`, etc.)
- Journeys extend `Journey` (use `this.page(PageObject)` to compose)
- Config via `defineConfig()` in `glassbox.config.ts`

## Running

From the project root:
- `npm start` — serve the Angular app at http://localhost:4200
- `npm run glassbox` — start the Glassbox dashboard (delegates to `glassbox/`)
- `npm run glassbox:run` — headless batch run

From `glassbox/` directly:
- `npm run serve` — dashboard at http://localhost:3001
- `npm run run` — headless runner
- `npm run run:headed` — visible browser

## Data Files

- `src/assets/data/users.json` — 4 users with email/password for login
- `src/assets/data/projects.json` — 6 projects (active, completed, archived)
- `src/assets/data/tasks.json` — 24 tasks across projects
- `src/assets/data/team.json` — 8 team members

## Test Credentials

| User | Email | Password |
|------|-------|----------|
| Alice Johnson | `alice@company.com` | `alice123` |
| Bob Smith | `bob@company.com` | `bob123` |
| Carol Williams | `carol@company.com` | `carol123` |
| Dave Brown | `dave@company.com` | `dave123` |

## Key Conventions

- All interactive elements have `data-testid` attributes
- TestID pattern: `{component}-{element}` or `{component}-{element}-{id}` for repeated items
- Glassbox page objects use selectors like `[data-testid="login-email"]`
- Journeys are named `*.journey.ts`, page objects are `*.page.ts`
- The `test-journeys/` folder contains scenario documentation (not executable code)

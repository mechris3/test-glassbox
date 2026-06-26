# Project Management Dashboard

An Angular 21 + NgRx project management dashboard built as a test target for [Glassbox](https://www.npmjs.com/package/@mechris3/glassbox) browser automation testing.

## Quick Start

```bash
# Install dependencies
npm install
cd glassbox && npm install && cd ..

# Start both the app and Glassbox dashboard
npm run dev
```

This launches:
- Angular app at http://localhost:4200
- Glassbox dashboard at http://localhost:3001

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Angular app + Glassbox dashboard together |
| `npm start` | Start Angular app only (http://localhost:4200) |
| `npm run build` | Production build to `dist/` |
| `npm run glassbox` | Start Glassbox dashboard only |
| `npm run glassbox:run` | Run all journeys headless (CI mode) |
| `npm run glassbox:mcp` | Start MCP server for AI integration |

## Test Credentials

| User | Email | Password |
|------|-------|----------|
| Alice Johnson | `alice@company.com` | `alice123` |
| Bob Smith | `bob@company.com` | `bob123` |
| Carol Williams | `carol@company.com` | `carol123` |
| Dave Brown | `dave@company.com` | `dave123` |

## Project Structure

```
├── src/                      Angular 21 application
│   ├── app/
│   │   ├── components/       Shared components (navigation, confirm-dialog)
│   │   ├── guards/           Route guards (auth)
│   │   ├── pages/            Feature pages (login, dashboard, projects, etc.)
│   │   └── store/            NgRx state (auth, projects, tasks, team, settings)
│   └── assets/data/          Static JSON data files
├── glassbox/                  Browser automation (self-contained sub-project)
│   ├── glassbox.config.ts    Glassbox configuration
│   ├── journeys/             Test journeys (*.journey.ts)
│   └── page-objects/         Page objects (*.page.ts)
├── test-journeys/            Scenario documentation (markdown)
└── package.json              App dependencies + convenience scripts
```

## Application Features

- **Login** — email/password auth against static JSON, NgRx state, validation errors
- **Dashboard** — summary cards, activity feed, quick actions
- **Projects** — filterable/sortable list, text search, click-through to detail
- **Project Detail** — task CRUD, status toggling (todo → in-progress → done), confirmation dialogs
- **Settings** — dark/light theme, notification preferences, profile editing
- **Navigation** — collapsible sidebar, active route highlighting, logout

## Automation

The `glassbox/` folder contains page objects and journeys for Glassbox browser automation:

- 6 page objects covering every page and component
- 7 journeys covering login, dashboard, filtering, task lifecycle, settings, and end-to-end flows
- All interactive elements have `data-testid` attributes for reliable selectors

See `test-journeys/` for detailed scenario documentation.

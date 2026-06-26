# Test Journeys — Project Management Dashboard

This folder contains documented test journeys for the Angular 21 project management dashboard. Each journey describes a realistic user path through the application, including setup conditions, step-by-step actions, and expected outcomes.

These are designed to be implemented as Glassbox browser automation tests.

## Journey Index

| # | Journey | Complexity | Key Concerns |
|---|---------|-----------|--------------|
| 1 | [Authentication Flow](./01-authentication-flow.md) | Medium | Login, validation, error states, session |
| 2 | [Dashboard Overview](./02-dashboard-overview.md) | Low-Medium | Data loading, summary accuracy, navigation |
| 3 | [Project Filtering & Search](./03-project-filtering-search.md) | Medium | Filters, sorting, combined state, empty states |
| 4 | [Task Lifecycle](./04-task-lifecycle.md) | High | Multi-step CRUD, state transitions, confirmation dialogs |
| 5 | [Settings Persistence](./05-settings-persistence.md) | Medium | Form state, theme switching, save/reset behavior |
| 6 | [End-to-End User Journey](./06-end-to-end-journey.md) | High | Full multi-page flow, state carried across views |
| 7 | [Navigation & Layout](./07-navigation-layout.md) | Low-Medium | Sidebar, active states, collapse, route transitions |
| 8 | [Negative & Edge Cases](./08-negative-edge-cases.md) | High | Invalid inputs, missing data, race conditions |

## Credentials for Testing

| User | Email | Password | Role |
|------|-------|----------|------|
| Alice Johnson | `alice@company.com` | `alice123` | admin |
| Bob Smith | `bob@company.com` | `bob123` | developer |
| Carol Williams | `carol@company.com` | `carol123` | designer |
| Dave Brown | `dave@company.com` | `dave123` | manager |

## Data-TestID Convention

All interactive elements use `data-testid` attributes. Pattern:
- `{component}-{element}` for unique items: `login-email`, `nav-dashboard`
- `{component}-{element}-{id}` for repeated items: `project-card-1`, `task-toggle-5`
- `{action}-{target}` for buttons: `add-task-submit`, `confirm-yes`

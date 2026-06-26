---
inclusion: fileMatch
fileMatchPattern: "src/app/**/*.ts"
---

# Angular Frontend — Coding Standards

These rules apply to the Angular 21 application in `src/app/`.

## Angular Patterns

- Standalone components only. No NgModules.
- NgRx for all shared/global state: actions, reducers, selectors, effects.
- Use `@if`, `@for`, `@switch` control flow (block syntax), not `*ngIf`/`*ngFor`.
- `inject()` function for dependency injection in components and effects.
- Component prefix: `app-` (e.g. `app-navigation`, `app-confirm-dialog`).

## Data Flow

- Unidirectional data flow. Components read state from the store via selectors with `| async`.
- Components dispatch actions on user interaction — never mutate state directly.
- ReactiveFormsModule is used for forms (login, add-task, settings).
- Prefer `| async` in templates over manual subscribe.

## NgRx Conventions

- Actions use `createAction` with `props`.
- Action names are bracketed source + event: `[Auth] Login`, `[Tasks] Update Task Status`.
- Reducers are pure functions. No side effects.
- Effects handle async work (HTTP calls to load JSON data).
- Selectors compose from feature selectors. Prefer granular selectors.

## Styling

- Modern CSS with custom properties — no SCSS, no preprocessor.
- CSS nesting (`&`) is used throughout component styles.
- Always use CSS custom properties from `styles.css` — never hard-code colors.
- Design tokens: `--bg-*`, `--text-*`, `--accent-*`, `--color-*`, `--border-color`.
- Dark theme is default. Light theme via `[data-theme="light"]` on `<html>`.

## Testability

- All interactive elements must have `data-testid` attributes.
- Pattern: `{component}-{element}` for unique items, `{component}-{element}-{id}` for repeated items.
- Semantic, descriptive testids: `login-email`, `project-card-1`, `task-toggle-5`.

## General TypeScript

- Prefer early returns — guard clauses over nested `if/else`.
- Prefer array methods (`map`, `filter`) over `for` loops.
- Prefer `const` over `let`.
- Meaningful, descriptive names. Suffix `$` for observables.
- Use `import type` for type-only imports.

## File Organization

- Pages in `pages/<feature>/` with component, template, and styles.
- Shared components in `components/<name>/`.
- Store slices in `store/<feature>/` with actions, reducer, selectors, effects.
- Models in `store/models.ts`.
- Guards in `guards/`.

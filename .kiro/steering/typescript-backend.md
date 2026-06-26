---
inclusion: fileMatch
fileMatchPattern: "glassbox/**/*.ts"
---

# Glassbox Automation — Coding Standards

These rules apply to the browser automation code in the `glassbox/` sub-project (page objects, journeys, helpers).

## Style

- Strict mode. No `any` unless truly unavoidable — use `unknown` and narrow.
- Prefer declarative code. Express intent, not mechanics.
- Prefer early returns — guard clauses at the top of a function, not deeply nested `if/else`.
- Prefer array methods (`map`, `filter`, `reduce`) over `for` loops. Exception: use `for...of` when `async`/`await` is needed inside the loop body.
- Prefer `const` over `let`. Avoid reassignment.
- Prefer spread operator and assignment over mutation.
- Meaningful, descriptive variable and function names. No single-letter abbreviations except trivial lambda params.
- `private` keyword for class internals, not `#` private fields.
- Use JSDoc on exported classes and non-obvious methods. Describe *what* and *why*.

## Patterns

- Async/await everywhere. No raw `.then()` chains.
- Error handling: throw typed errors (extend `Error`), never throw strings.
- Use `import type` for type-only imports.
- ESM imports — the project is `"type": "module"`.

## File Organization

- Page objects: `page-objects/<name>.page.ts` — one page object per file.
- Journeys: `journeys/<name>.journey.ts` — one journey per file.
- Helpers: `helpers/<name>.ts` — lifecycle hooks, utilities.
- Files named in kebab-case.

## Page Object Conventions

- Extend `BasePage` from `@mechris3/glassbox`.
- Store selectors in a private `selectors` object using `data-testid` attributes.
- Methods should be high-level actions: `login()`, `filterByStatus()`, `addTask()`.
- Verification methods throw descriptive errors on failure.
- Keep page objects focused on a single page/component — compose in journeys.

## Journey Conventions

- Extend `Journey` from `@mechris3/glassbox`.
- Use `this.page(PageObject)` to instantiate page objects.
- The `execute()` method contains the test flow.
- Journeys should represent realistic user paths, not individual unit checks.
- Name journeys descriptively: `login-and-navigate.journey.ts`, `task-lifecycle.journey.ts`.

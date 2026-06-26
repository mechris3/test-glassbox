---
inclusion: fileMatch
fileMatchPattern: "glassbox/**/*.ts"
---

# Glassbox Automation — Page Objects & Journeys

## Core Principle

Journeys are pure orchestration. Page objects own all interaction and validation logic.

## Journey Rules

- A journey's `execute()` method contains **only** calls to page object methods.
- No `if` statements, no conditionals, no assertions, no validation logic in journeys.
- No direct use of `this.fill()`, `this.click()`, `this.getText()` in journeys — those belong in page objects.
- Journeys read like a script of user intent: "login, navigate, add task, verify task exists".
- Each journey represents a realistic end-to-end user path, not an isolated unit check.

```typescript
// Good — journey is pure orchestration
async execute() {
  await this.loginPage.loginAs('alice@company.com', 'alice123');
  await this.dashboardPage.verifyLoaded();
  await this.dashboardPage.navigateToProjects();
  await this.projectsPage.verifyProjectCount(6);
}

// Bad — logic and validation leaking into journey
async execute() {
  await this.loginPage.fill('[data-testid="login-email"]', 'alice@company.com');
  const count = await this.projectsPage.getText('[data-testid="count"]');
  if (parseInt(count) !== 6) throw new Error('wrong count');
}
```

## Page Object Rules

- Extend `BasePage` from `@mechris3/glassbox`.
- Own all selectors — store them in a private `selectors` object.
- Own all interaction logic: filling forms, clicking buttons, reading text.
- Own all validation logic: methods like `verifyLoaded()`, `verifyErrorMessage()`, `verifyTaskCount()` that throw descriptive errors on failure.
- Methods should be high-level and intention-revealing: `loginAs()`, `filterByStatus()`, `addTask()`.
- Keep page objects focused on a single page or component. Compose them in journeys.
- Use `data-testid` attribute selectors exclusively: `[data-testid="login-email"]`.
- Prefer `waitForText()` over `getText()` + manual comparison for verifications — it handles timing naturally.
- Use `selectByValue()` / `selectByText()` / `selectByIndex()` for `<select>` elements.
- Use `waitForHidden()` to verify elements have been removed from the DOM.
- Use `waitForCount()` to assert element counts with auto-retry.
- Use `focus()` + `pressKey('Tab')` for blur interactions instead of clicking other elements.
- Use `hover()` for tooltip/dropdown testing.

```typescript
// Page object owns selectors, interaction, and validation
export class LoginPage extends BasePage {
  private selectors = {
    email: '[data-testid="login-email"]',
    password: '[data-testid="login-password"]',
    submit: '[data-testid="login-submit"]',
    error: '[data-testid="login-error"]',
  };

  async loginAs(email: string, password: string) {
    await this.fill(this.selectors.email, email);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.submit);
  }

  async verifyErrorMessage(expected: string) {
    const text = await this.getText(this.selectors.error);
    if (text !== expected) {
      throw new Error(`Expected error "${expected}", got "${text}"`);
    }
  }
}
```

## Naming Conventions

- Page objects: `glassbox/page-objects/<name>.page.ts`
- Journeys: `glassbox/journeys/<name>.journey.ts`
- One class per file. File name matches the concern in kebab-case.

## Selector Strategy

- Always use `[data-testid="..."]` selectors. Never CSS classes, tag names, or DOM structure.
- Selectors for repeated items include the ID: `[data-testid="task-item-${id}"]`.
- If an element doesn't have a `data-testid`, add one to the Angular component first.

import { BasePage } from '@mechris3/glassbox';

/**
 * Page object for the login page (/login).
 * Handles authentication interactions and validation checks.
 */
export class LoginPage extends BasePage {
  private selectors = {
    page: '[data-testid="login-page"]',
    email: '[data-testid="login-email"]',
    password: '[data-testid="login-password"]',
    submit: '[data-testid="login-submit"]',
    error: '[data-testid="login-error"]',
    emailError: '[data-testid="login-email-error"]',
    emailFormatError: '[data-testid="login-email-format-error"]',
    passwordError: '[data-testid="login-password-error"]',
    passwordLengthError: '[data-testid="login-password-length-error"]',
  };

  /** Wait for the login page to be visible. */
  async verifyLoaded() {
    await this.waitForSelector(this.selectors.page);
  }

  /** Navigate to the app and wait for login page. */
  async navigateToApp() {
    await this.goto('/');
    await this.waitForSelector(this.selectors.page);
  }

  /** Fill credentials and submit the login form. */
  async loginAs(email: string, password: string) {
    await this.waitForSelector(this.selectors.email);
    await this.fill(this.selectors.email, email);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.submit);
  }

  /** Login and wait for successful navigation to dashboard. */
  async loginAndWaitForDashboard(email: string, password: string) {
    await this.loginAs(email, password);
    await this.waitForSelector('[data-testid="dashboard-page"]');
  }

  /** Verify that the auth error message is displayed. */
  async verifyErrorMessage(expected: string) {
    await this.waitForSelector(this.selectors.error);
    const text = await this.getText(this.selectors.error);
    const trimmed = text.trim();
    if (trimmed !== expected) {
      throw new Error(`Expected auth error "${expected}", got "${trimmed}"`);
    }
  }

  /** Verify that the submit button is disabled (form invalid). */
  async verifySubmitDisabled() {
    const disabled = await this.isDisabled(this.selectors.submit);
    if (!disabled) {
      throw new Error('Expected submit button to be disabled');
    }
  }

  /** Verify that the submit button is enabled (form valid). */
  async verifySubmitEnabled() {
    const disabled = await this.isDisabled(this.selectors.submit);
    if (disabled) {
      throw new Error('Expected submit button to be enabled');
    }
  }

  /** Focus and blur the email field to trigger validation. */
  async blurEmail() {
    await this.click(this.selectors.email);
    await this.pressKey('Tab');
    await this.evaluate(`
      (() => {
        const el = document.querySelector('${this.selectors.email}');
        if (el) { el.dispatchEvent(new Event('blur', { bubbles: true })); }
      })();
    `);
  }

  /** Focus and blur the password field to trigger validation. */
  async blurPassword() {
    await this.click(this.selectors.password);
    await this.pressKey('Tab');
    await this.evaluate(`
      (() => {
        const el = document.querySelector('${this.selectors.password}');
        if (el) { el.dispatchEvent(new Event('blur', { bubbles: true })); }
      })();
    `);
  }

  /** Verify the email required validation error is shown. */
  async verifyEmailRequiredError() {
    await this.waitForSelector(this.selectors.emailError);
  }

  /** Verify the email format validation error is shown. */
  async verifyEmailFormatError() {
    await this.waitForSelector(this.selectors.emailFormatError);
  }

  /** Verify the password required validation error is shown. */
  async verifyPasswordRequiredError() {
    await this.waitForSelector(this.selectors.passwordError);
  }

  /** Verify the password min-length validation error is shown. */
  async verifyPasswordLengthError() {
    await this.waitForSelector(this.selectors.passwordLengthError);
  }

  /** Fill only the email field (for partial form scenarios). */
  async fillEmail(email: string) {
    await this.fill(this.selectors.email, email);
  }

  /** Fill only the password field (for partial form scenarios). */
  async fillPassword(password: string) {
    await this.fill(this.selectors.password, password);
  }
}

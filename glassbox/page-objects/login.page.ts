import { BasePage } from '@mechris3/glassbox';

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
    hint: '[data-testid="login-hint"]',
  };

  async isVisible() {
    await this.waitFor(this.selectors.page);
  }

  async login(email: string, password: string) {
    await this.fill(this.selectors.email, email);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.submit);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.selectors.error);
  }

  async hasError(): Promise<boolean> {
    return await this.exists(this.selectors.error);
  }

  async getEmailValidationError(): Promise<string> {
    if (await this.exists(this.selectors.emailError)) {
      return await this.getText(this.selectors.emailError);
    }
    if (await this.exists(this.selectors.emailFormatError)) {
      return await this.getText(this.selectors.emailFormatError);
    }
    return '';
  }

  async getPasswordValidationError(): Promise<string> {
    if (await this.exists(this.selectors.passwordError)) {
      return await this.getText(this.selectors.passwordError);
    }
    if (await this.exists(this.selectors.passwordLengthError)) {
      return await this.getText(this.selectors.passwordLengthError);
    }
    return '';
  }

  async isSubmitDisabled(): Promise<boolean> {
    return await this.isDisabled(this.selectors.submit);
  }

  async triggerEmailValidation() {
    await this.click(this.selectors.email);
    await this.click(this.selectors.password); // blur email
  }

  async triggerPasswordValidation() {
    await this.click(this.selectors.password);
    await this.click(this.selectors.email); // blur password
  }
}

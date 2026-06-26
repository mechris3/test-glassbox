import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';

/**
 * Journey: Login form validation.
 * Tests field-level validation errors and submit button state.
 */
export class LoginValidationJourney extends Journey {
  loginPage = this.page(LoginPage);

  async execute() {
    await this.loginPage.navigateToApp();

    // Email required validation
    await this.loginPage.blurEmail();
    await this.loginPage.verifyEmailRequiredError();

    // Email format validation
    await this.loginPage.fillEmail('notanemail');
    await this.loginPage.blurEmail();
    await this.loginPage.verifyEmailFormatError();

    // Password required validation
    await this.loginPage.blurPassword();
    await this.loginPage.verifyPasswordRequiredError();

    // Password min-length validation
    await this.loginPage.fillPassword('ab');
    await this.loginPage.blurPassword();
    await this.loginPage.verifyPasswordLengthError();

    // Submit stays disabled with invalid form
    await this.loginPage.verifySubmitDisabled();

    // Valid form enables submit
    await this.loginPage.fillEmail('alice@company.com');
    await this.loginPage.fillPassword('alice123');
    await this.loginPage.verifySubmitEnabled();
  }
}

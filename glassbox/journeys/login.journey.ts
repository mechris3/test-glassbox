import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';
import { NavigationPage } from '../page-objects/navigation.page.js';
import { DashboardPage } from '../page-objects/dashboard.page.js';

/**
 * Journey: Authentication flow.
 * Tests successful login, invalid credentials, form validation, and logout.
 */
export class LoginJourney extends Journey {
  loginPage = this.page(LoginPage);
  navigation = this.page(NavigationPage);
  dashboard = this.page(DashboardPage);

  async execute() {
    // Navigate to app and verify login page loads
    await this.loginPage.navigateToApp();
    await this.loginPage.verifySubmitDisabled();

    // Test invalid credentials
    await this.loginPage.loginAs('alice@company.com', 'wrongpassword');
    await this.loginPage.verifyErrorMessage('Invalid email or password');

    // Test successful login
    await this.loginPage.loginAs('alice@company.com', 'alice123');
    await this.dashboard.verifyLoaded();
    await this.navigation.verifyUserName('Alice Johnson');

    // Test logout
    await this.navigation.logout();
    await this.loginPage.verifyLoaded();
  }
}

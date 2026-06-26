import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';
import { NavigationPage } from '../page-objects/navigation.page.js';
import { SettingsPage } from '../page-objects/settings.page.js';

/**
 * Journey: Settings persistence.
 * Theme toggle, notification preferences, profile editing, save and reset.
 */
export class SettingsJourney extends Journey {
  loginPage = this.page(LoginPage);
  navigation = this.page(NavigationPage);
  settings = this.page(SettingsPage);

  async execute() {
    // Navigate, login and go to settings
    await this.loginPage.navigateToApp();
    await this.loginPage.loginAs('alice@company.com', 'alice123');
    await this.navigation.goToSettings();
    await this.settings.verifyLoaded();

    // Toggle theme to light and back
    await this.settings.selectLightTheme();
    await this.settings.selectDarkTheme();

    // Toggle notification preferences
    await this.settings.toggleNotification('email');
    await this.settings.toggleNotification('digest');

    // Edit profile
    await this.settings.fillDisplayName('Alice');
    await this.settings.fillAvatarUrl('https://i.pravatar.cc/150?u=alice-custom');

    // Save settings
    await this.settings.save();
    await this.settings.verifySavedMessage();

    // Reset to defaults
    await this.settings.reset();
    await this.settings.verifyDisplayName('');
    await this.settings.verifyAvatarUrl('');
  }
}

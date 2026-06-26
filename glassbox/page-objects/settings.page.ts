import { BasePage } from '@mechris3/glassbox';

/**
 * Page object for the settings page (/settings).
 * Theme, notifications, profile, save/reset.
 */
export class SettingsPage extends BasePage {
  private selectors = {
    page: '[data-testid="settings-page"]',
    form: '[data-testid="settings-form"]',
    themeDark: '[data-testid="settings-theme-dark"]',
    themeLight: '[data-testid="settings-theme-light"]',
    notifyEmail: '[data-testid="settings-notify-email"]',
    notifyPush: '[data-testid="settings-notify-push"]',
    notifyInApp: '[data-testid="settings-notify-inapp"]',
    notifyDigest: '[data-testid="settings-notify-digest"]',
    displayName: '[data-testid="settings-display-name"]',
    avatarUrl: '[data-testid="settings-avatar-url"]',
    save: '[data-testid="settings-save"]',
    reset: '[data-testid="settings-reset"]',
    savedMessage: '[data-testid="settings-saved-message"]',
  };

  /** Verify the settings page has loaded. */
  async verifyLoaded() {
    await this.waitForSelector(this.selectors.page);
  }

  /** Select the dark theme. */
  async selectDarkTheme() {
    await this.click(this.selectors.themeDark);
  }

  /** Select the light theme. */
  async selectLightTheme() {
    await this.click(this.selectors.themeLight);
  }

  /** Toggle a notification checkbox. */
  async toggleNotification(type: 'email' | 'push' | 'inApp' | 'digest') {
    const selectorMap = new Map([
      ['email', this.selectors.notifyEmail],
      ['push', this.selectors.notifyPush],
      ['inApp', this.selectors.notifyInApp],
      ['digest', this.selectors.notifyDigest],
    ]);
    const selector = selectorMap.get(type)!;
    await this.click(selector);
  }

  /** Fill the display name field. */
  async fillDisplayName(name: string) {
    await this.fill(this.selectors.displayName, name);
  }

  /** Fill the avatar URL field. */
  async fillAvatarUrl(url: string) {
    await this.fill(this.selectors.avatarUrl, url);
  }

  /** Click the save button. */
  async save() {
    await this.click(this.selectors.save);
  }

  /** Click the reset button. */
  async reset() {
    await this.click(this.selectors.reset);
  }

  /** Verify the "saved successfully" message is displayed. */
  async verifySavedMessage() {
    await this.waitForSelector(this.selectors.savedMessage);
  }

  /** Verify the display name field contains the expected value. */
  async verifyDisplayName(expected: string) {
    const value = await this.getInputValue(this.selectors.displayName);
    if (value !== expected) {
      throw new Error(`Expected display name "${expected}", got "${value}"`);
    }
  }

  /** Verify the avatar URL field contains the expected value. */
  async verifyAvatarUrl(expected: string) {
    const value = await this.getInputValue(this.selectors.avatarUrl);
    if (value !== expected) {
      throw new Error(`Expected avatar URL "${expected}", got "${value}"`);
    }
  }
}

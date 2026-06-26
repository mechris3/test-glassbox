import { BasePage } from '@mechris3/glassbox';

/**
 * Page object for the sidebar navigation component.
 * Present on all authenticated pages.
 */
export class NavigationPage extends BasePage {
  private selectors = {
    sidebar: '[data-testid="navigation-sidebar"]',
    brand: '[data-testid="nav-brand"]',
    collapseToggle: '[data-testid="nav-collapse-toggle"]',
    dashboard: '[data-testid="nav-dashboard"]',
    projects: '[data-testid="nav-projects"]',
    settings: '[data-testid="nav-settings"]',
    userInfo: '[data-testid="nav-user-info"]',
    userName: '[data-testid="nav-user-name"]',
    userAvatar: '[data-testid="nav-user-avatar"]',
    logout: '[data-testid="nav-logout"]',
  };

  /** Verify the sidebar is visible (user is authenticated). */
  async verifyLoaded() {
    await this.waitForSelector(this.selectors.sidebar);
  }

  /** Verify the sidebar is not present (user is not authenticated). */
  async verifyNotVisible() {
    const exists = await this.isVisible(this.selectors.sidebar);
    if (exists) {
      throw new Error('Expected navigation sidebar to not be visible');
    }
  }

  /** Navigate to the dashboard page. */
  async goToDashboard() {
    await this.click(this.selectors.dashboard);
  }

  /** Navigate to the projects page. */
  async goToProjects() {
    await this.click(this.selectors.projects);
  }

  /** Navigate to the settings page. */
  async goToSettings() {
    await this.click(this.selectors.settings);
  }

  /** Click the logout button. */
  async logout() {
    await this.click(this.selectors.logout);
  }

  /** Collapse or expand the sidebar. */
  async toggleCollapse() {
    await this.click(this.selectors.collapseToggle);
  }

  /** Verify the user name displayed in the sidebar. */
  async verifyUserName(expected: string) {
    await this.waitForText(this.selectors.userName, expected);
  }

  /** Verify the sidebar is in collapsed state (brand text hidden). */
  async verifyCollapsed() {
    const brandExists = await this.isVisible(this.selectors.brand);
    if (brandExists) {
      throw new Error('Expected sidebar to be collapsed (brand should be hidden)');
    }
  }

  /** Verify the sidebar is in expanded state (brand text visible). */
  async verifyExpanded() {
    await this.waitForSelector(this.selectors.brand);
  }
}

import { BasePage } from '@mechris3/glassbox';

/**
 * Page object for the dashboard page (/dashboard).
 * Summary cards, activity feed, and quick actions.
 */
export class DashboardPage extends BasePage {
  private selectors = {
    page: '[data-testid="dashboard-page"]',
    title: '[data-testid="dashboard-title"]',
    summary: '[data-testid="dashboard-summary"]',
    totalProjects: '[data-testid="dashboard-total-projects"]',
    activeTasks: '[data-testid="dashboard-active-tasks"]',
    overdueItems: '[data-testid="dashboard-overdue-items"]',
    teamMembers: '[data-testid="dashboard-team-members"]',
    activityFeed: '[data-testid="dashboard-activity-feed"]',
    quickActions: '[data-testid="dashboard-quick-actions"]',
    quickViewProjects: '[data-testid="quick-action-view-projects"]',
    quickActiveTasks: '[data-testid="quick-action-active-tasks"]',
    quickSettings: '[data-testid="quick-action-settings"]',
    quickNewProject: '[data-testid="quick-action-new-project"]',
  };

  /** Verify the dashboard page has loaded. */
  async verifyLoaded() {
    await this.waitForSelector(this.selectors.page);
    await this.waitForSelector(this.selectors.summary);
  }

  /** Verify the total projects card shows the expected count. */
  async verifyTotalProjects(expected: number) {
    const text = await this.getText(this.selectors.totalProjects);
    if (!text.includes(String(expected))) {
      throw new Error(`Expected total projects to contain "${expected}", got "${text}"`);
    }
  }

  /** Verify the active tasks card shows the expected count. */
  async verifyActiveTasks(expected: number) {
    const text = await this.getText(this.selectors.activeTasks);
    if (!text.includes(String(expected))) {
      throw new Error(`Expected active tasks to contain "${expected}", got "${text}"`);
    }
  }

  /** Verify the team members card shows the expected count. */
  async verifyTeamMembers(expected: number) {
    const text = await this.getText(this.selectors.teamMembers);
    if (!text.includes(String(expected))) {
      throw new Error(`Expected team members to contain "${expected}", got "${text}"`);
    }
  }

  /** Verify the activity feed section is present. */
  async verifyActivityFeedVisible() {
    await this.waitForSelector(this.selectors.activityFeed);
  }

  /** Click the "View Projects" quick action. */
  async clickViewProjects() {
    await this.click(this.selectors.quickViewProjects);
  }

  /** Click the "Settings" quick action. */
  async clickSettings() {
    await this.click(this.selectors.quickSettings);
  }
}

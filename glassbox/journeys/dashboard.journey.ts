import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';
import { DashboardPage } from '../page-objects/dashboard.page.js';
import { ProjectsPage } from '../page-objects/projects.page.js';
import { SettingsPage } from '../page-objects/settings.page.js';

/**
 * Journey: Dashboard overview.
 * Login, verify summary cards, check activity feed, test quick actions.
 */
export class DashboardJourney extends Journey {
  loginPage = this.page(LoginPage);
  dashboard = this.page(DashboardPage);
  projects = this.page(ProjectsPage);
  settings = this.page(SettingsPage);

  async execute() {
    // Login
    await this.loginPage.loginAs('alice@company.com', 'alice123');
    await this.dashboard.verifyLoaded();

    // Verify summary cards
    await this.dashboard.verifyTotalProjects(6);
    await this.dashboard.verifyActiveTasks(4);
    await this.dashboard.verifyTeamMembers(8);

    // Verify activity feed
    await this.dashboard.verifyActivityFeedVisible();

    // Quick action: navigate to projects
    await this.dashboard.clickViewProjects();
    await this.projects.verifyLoaded();

    // Navigate back via quick action for settings
    await this.dashboard.clickSettings();
    await this.settings.verifyLoaded();
  }
}

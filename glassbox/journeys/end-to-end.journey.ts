import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';
import { NavigationPage } from '../page-objects/navigation.page.js';
import { DashboardPage } from '../page-objects/dashboard.page.js';
import { ProjectsPage } from '../page-objects/projects.page.js';
import { ProjectDetailPage } from '../page-objects/project-detail.page.js';
import { SettingsPage } from '../page-objects/settings.page.js';

/**
 * Journey: Full end-to-end user session.
 * Login → dashboard → projects → task management → settings → logout.
 */
export class EndToEndJourney extends Journey {
  loginPage = this.page(LoginPage);
  navigation = this.page(NavigationPage);
  dashboard = this.page(DashboardPage);
  projects = this.page(ProjectsPage);
  projectDetail = this.page(ProjectDetailPage);
  settings = this.page(SettingsPage);

  async execute() {
    // Login
    await this.loginPage.verifyLoaded();
    await this.loginPage.loginAs('alice@company.com', 'alice123');
    await this.dashboard.verifyLoaded();
    await this.navigation.verifyUserName('Alice Johnson');

    // Check dashboard
    await this.dashboard.verifyTotalProjects(6);
    await this.dashboard.verifyTeamMembers(8);

    // Navigate to projects
    await this.dashboard.clickViewProjects();
    await this.projects.verifyLoaded();
    await this.projects.verifyProjectCount(6);

    // Filter and open a project
    await this.projects.filterByStatus('active');
    await this.projects.verifyProjectCount(4);
    await this.projects.openProject(1);
    await this.projectDetail.verifyLoaded();
    await this.projectDetail.verifyProjectName('Website Redesign');

    // Add a task
    await this.projectDetail.openAddTaskForm();
    await this.projectDetail.addTask('Review PR #42', '2', 'high', '2026-09-01');

    // Go to settings
    await this.navigation.goToSettings();
    await this.settings.verifyLoaded();
    await this.settings.selectLightTheme();
    await this.settings.fillDisplayName('Alice');
    await this.settings.save();
    await this.settings.verifySavedMessage();

    // Logout
    await this.navigation.logout();
    await this.loginPage.verifyLoaded();
  }
}

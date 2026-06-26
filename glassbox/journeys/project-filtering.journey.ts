import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';
import { NavigationPage } from '../page-objects/navigation.page.js';
import { ProjectsPage } from '../page-objects/projects.page.js';
import { ProjectDetailPage } from '../page-objects/project-detail.page.js';

/**
 * Journey: Project filtering, sorting, and search.
 * Tests all filter states, sort options, text search, and click-through.
 */
export class ProjectFilteringJourney extends Journey {
  loginPage = this.page(LoginPage);
  navigation = this.page(NavigationPage);
  projects = this.page(ProjectsPage);
  projectDetail = this.page(ProjectDetailPage);

  async execute() {
    // Navigate, login and go to projects
    await this.loginPage.navigateToApp();
    await this.loginPage.loginAndWaitForDashboard('alice@company.com', 'alice123');
    await this.navigation.goToProjects();
    await this.projects.verifyLoaded();

    // All projects visible initially
    await this.projects.verifyProjectCount(6);

    // Filter by active
    await this.projects.filterByStatus('active');
    await this.projects.verifyProjectCount(4);

    // Filter by completed
    await this.projects.filterByStatus('completed');
    await this.projects.verifyProjectCount(1);

    // Filter by archived
    await this.projects.filterByStatus('archived');
    await this.projects.verifyProjectCount(1);

    // Back to all
    await this.projects.filterByStatus('all');
    await this.projects.verifyProjectCount(6);

    // Sort by priority
    await this.projects.sortBy('priority');

    // Text search
    await this.projects.search('mobile');
    await this.projects.verifyProjectCount(1);
    await this.projects.verifyProjectVisible(2);

    // Search with no results
    await this.projects.search('xyznonexistent');
    await this.projects.verifyEmptyState();

    // Clear search
    await this.projects.clearSearch();
    await this.projects.verifyProjectCount(6);

    // Click through to project detail
    await this.projects.openProject(1);
    await this.projectDetail.verifyLoaded();
    await this.projectDetail.verifyProjectName('Website Redesign');
  }
}

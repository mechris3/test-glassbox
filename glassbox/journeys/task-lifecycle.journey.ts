import { Journey } from '@mechris3/glassbox';
import { LoginPage } from '../page-objects/login.page.js';
import { NavigationPage } from '../page-objects/navigation.page.js';
import { ProjectsPage } from '../page-objects/projects.page.js';
import { ProjectDetailPage } from '../page-objects/project-detail.page.js';

/**
 * Journey: Task lifecycle.
 * Navigate to a project, toggle task status, add a new task, delete a task.
 */
export class TaskLifecycleJourney extends Journey {
  loginPage = this.page(LoginPage);
  navigation = this.page(NavigationPage);
  projects = this.page(ProjectsPage);
  projectDetail = this.page(ProjectDetailPage);

  async execute() {
    // Navigate, login and go to project detail
    await this.loginPage.navigateToApp();
    await this.loginPage.loginAndWaitForDashboard('alice@company.com', 'alice123');
    await this.navigation.goToProjects();
    await this.projects.openProject(1);
    await this.projectDetail.verifyLoaded();
    await this.projectDetail.verifyProjectName('Website Redesign');

    // Toggle task status: todo → in-progress → done → todo
    await this.projectDetail.verifyTaskStatus(4, 'To Do');
    await this.projectDetail.toggleTaskStatus(4);
    await this.projectDetail.verifyTaskStatus(4, 'In Progress');
    await this.projectDetail.toggleTaskStatus(4);
    await this.projectDetail.verifyTaskStatus(4, 'Done');
    await this.projectDetail.toggleTaskStatus(4);
    await this.projectDetail.verifyTaskStatus(4, 'To Do');

    // Add a new task
    await this.projectDetail.openAddTaskForm();
    await this.projectDetail.addTask('Write unit tests', '2', 'high', '2026-08-01');

    // Delete a task with confirmation
    await this.projectDetail.requestDeleteTask(5);
    await this.projectDetail.verifyConfirmDialogVisible();
    await this.projectDetail.confirmDelete();
    await this.projectDetail.verifyTaskRemoved(5);

    // Cancel a deletion
    await this.projectDetail.requestDeleteTask(4);
    await this.projectDetail.cancelDelete();
    await this.projectDetail.verifyTaskExists(4);
  }
}

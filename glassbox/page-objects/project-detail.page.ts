import { BasePage } from '@mechris3/glassbox';

/**
 * Page object for the project detail page (/projects/:id).
 * Task list management, status toggling, add/delete tasks.
 */
export class ProjectDetailPage extends BasePage {
  private selectors = {
    page: '[data-testid="project-detail-page"]',
    name: '[data-testid="project-detail-name"]',
    description: '[data-testid="project-detail-description"]',
    status: '[data-testid="project-detail-status"]',
    progressPercent: '[data-testid="project-progress-percent"]',
    progressBar: '[data-testid="project-progress-bar"]',
    taskList: '[data-testid="task-list"]',
    addTaskToggle: '[data-testid="add-task-toggle"]',
    addTaskForm: '[data-testid="add-task-form"]',
    addTaskName: '[data-testid="add-task-name"]',
    addTaskAssignee: '[data-testid="add-task-assignee"]',
    addTaskPriority: '[data-testid="add-task-priority"]',
    addTaskDueDate: '[data-testid="add-task-due-date"]',
    addTaskSubmit: '[data-testid="add-task-submit"]',
    confirmDialog: '[data-testid="confirm-dialog"]',
    confirmYes: '[data-testid="confirm-yes"]',
    confirmCancel: '[data-testid="confirm-cancel"]',
    tasksEmpty: '[data-testid="tasks-empty"]',
    backLink: '[data-testid="project-back-link"]',
    notFound: '[data-testid="project-not-found"]',
  };

  /** Verify the project detail page has loaded. */
  async verifyLoaded() {
    await this.waitForSelector(this.selectors.page);
  }

  /** Verify the project name. */
  async verifyProjectName(expected: string) {
    await this.waitForText(this.selectors.name, expected);
  }

  /** Verify the progress percentage value. */
  async verifyProgress(expected: string) {
    await this.waitForText(this.selectors.progressPercent, expected);
  }

  /** Toggle a task's status by task ID. */
  async toggleTaskStatus(taskId: number) {
    await this.click(`[data-testid="task-toggle-${taskId}"]`);
  }

  /** Verify a task's status badge text. */
  async verifyTaskStatus(taskId: number, expected: string) {
    await this.waitForText(`[data-testid="task-status-${taskId}"]`, expected);
  }

  /** Verify a task's name text. */
  async verifyTaskName(taskId: number, expected: string) {
    await this.waitForText(`[data-testid="task-name-${taskId}"]`, expected);
  }

  /** Open the add task form. */
  async openAddTaskForm() {
    await this.click(this.selectors.addTaskToggle);
    await this.waitForSelector(this.selectors.addTaskForm);
  }

  /** Close the add task form. */
  async closeAddTaskForm() {
    await this.click(this.selectors.addTaskToggle);
  }

  /** Fill and submit the add task form. */
  async addTask(name: string, assigneeId: string, priority: string, dueDate: string) {
    await this.fill(this.selectors.addTaskName, name);
    await this.selectByValue(this.selectors.addTaskAssignee, assigneeId);
    await this.selectByValue(this.selectors.addTaskPriority, priority);
    await this.fill(this.selectors.addTaskDueDate, dueDate);
    await this.click(this.selectors.addTaskSubmit);
  }

  /** Click delete on a task, triggering the confirmation dialog. */
  async requestDeleteTask(taskId: number) {
    await this.click(`[data-testid="task-delete-${taskId}"]`);
    await this.waitForSelector(this.selectors.confirmDialog);
  }

  /** Confirm the deletion in the dialog. */
  async confirmDelete() {
    await this.click(this.selectors.confirmYes);
  }

  /** Cancel the deletion in the dialog. */
  async cancelDelete() {
    await this.click(this.selectors.confirmCancel);
  }

  /** Verify the confirmation dialog is visible. */
  async verifyConfirmDialogVisible() {
    await this.waitForSelector(this.selectors.confirmDialog);
  }

  /** Verify a task is no longer in the list. */
  async verifyTaskRemoved(taskId: number) {
    const exists = await this.isVisible(`[data-testid="task-item-${taskId}"]`);
    if (exists) {
      throw new Error(`Expected task ${taskId} to be removed, but it still exists`);
    }
  }

  /** Verify a task is present in the list. */
  async verifyTaskExists(taskId: number) {
    await this.waitForSelector(`[data-testid="task-item-${taskId}"]`);
  }

  /** Navigate back to the projects list. */
  async goBackToProjects() {
    await this.click(this.selectors.backLink);
  }

  /** Verify the not-found state is shown (invalid project ID). */
  async verifyNotFound() {
    await this.waitForSelector(this.selectors.notFound);
  }

  /** Verify the add task submit button is disabled. */
  async verifyAddTaskSubmitDisabled() {
    const disabled = await this.isDisabled(this.selectors.addTaskSubmit);
    if (!disabled) {
      throw new Error('Expected add task submit button to be disabled');
    }
  }
}

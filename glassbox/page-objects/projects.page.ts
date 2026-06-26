import { BasePage } from '@mechris3/glassbox';

/**
 * Page object for the projects list page (/projects).
 * Filtering, sorting, search, and navigation to project detail.
 */
export class ProjectsPage extends BasePage {
  private selectors = {
    page: '[data-testid="projects-page"]',
    search: '[data-testid="projects-search"]',
    filterAll: '[data-testid="filter-status-all"]',
    filterActive: '[data-testid="filter-status-active"]',
    filterCompleted: '[data-testid="filter-status-completed"]',
    filterArchived: '[data-testid="filter-status-archived"]',
    sortName: '[data-testid="sort-by-name"]',
    sortDate: '[data-testid="sort-by-date"]',
    sortPriority: '[data-testid="sort-by-priority"]',
    projectsList: '[data-testid="projects-list"]',
    emptyState: '[data-testid="projects-empty"]',
    loading: '[data-testid="projects-loading"]',
  };

  /** Verify the projects page has loaded. */
  async verifyLoaded() {
    await this.waitForSelector(this.selectors.page);
  }

  /** Type a search query into the search box. */
  async search(query: string) {
    await this.fill(this.selectors.search, query);
  }

  /** Clear the search box. */
  async clearSearch() {
    await this.fill(this.selectors.search, '');
  }

  /** Filter projects by status. */
  async filterByStatus(status: 'all' | 'active' | 'completed' | 'archived') {
    const selectorMap = new Map([
      ['all', this.selectors.filterAll],
      ['active', this.selectors.filterActive],
      ['completed', this.selectors.filterCompleted],
      ['archived', this.selectors.filterArchived],
    ]);
    const selector = selectorMap.get(status)!;
    await this.click(selector);
  }

  /** Sort projects by a field. */
  async sortBy(field: 'name' | 'date' | 'priority') {
    const selectorMap = new Map([
      ['name', this.selectors.sortName],
      ['date', this.selectors.sortDate],
      ['priority', this.selectors.sortPriority],
    ]);
    const selector = selectorMap.get(field)!;
    await this.click(selector);
  }

  /** Click on a specific project card by project ID. */
  async openProject(projectId: number) {
    const selector = `[data-testid="project-card-${projectId}"]`;
    await this.waitForSelector(selector);
    await this.click(selector);
  }

  /** Verify the number of visible project cards. */
  async verifyProjectCount(expected: number) {
    await this.waitForCount('[data-testid^="project-card-"]', expected);
  }

  /** Verify the empty state message is visible. */
  async verifyEmptyState() {
    await this.waitForSelector(this.selectors.emptyState);
  }

  /** Verify a specific project is visible by ID. */
  async verifyProjectVisible(projectId: number) {
    await this.waitForSelector(`[data-testid="project-card-${projectId}"]`);
  }

  /** Verify a specific project name by ID. */
  async verifyProjectName(projectId: number, expected: string) {
    await this.waitForText(`[data-testid="project-name-${projectId}"]`, expected);
  }
}

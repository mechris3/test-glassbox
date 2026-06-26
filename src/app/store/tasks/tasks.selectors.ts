import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from '../app.state';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  (state) => state.tasks
);

export const selectTasksLoading = createSelector(
  selectTasksState,
  (state) => state.loading
);

export const selectTasksByProject = (projectId: number) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((t) => t.projectId === projectId)
  );

export const selectOverdueTasks = createSelector(
  selectAllTasks,
  (tasks) => {
    const now = new Date().toISOString().split('T')[0];
    return tasks.filter((t) => t.status !== 'done' && t.dueDate < now);
  }
);

export const selectTaskById = (taskId: number) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.find((t) => t.id === taskId)
  );

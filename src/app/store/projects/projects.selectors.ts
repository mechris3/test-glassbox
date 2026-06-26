import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState } from '../app.state';

export const selectProjectsState = createFeatureSelector<ProjectsState>('projects');

export const selectAllProjects = createSelector(
  selectProjectsState,
  (state) => state.projects
);

export const selectProjectsLoading = createSelector(
  selectProjectsState,
  (state) => state.loading
);

export const selectProjectById = (id: number) =>
  createSelector(selectAllProjects, (projects) =>
    projects.find((p) => p.id === id)
  );

export const selectActiveProjects = createSelector(
  selectAllProjects,
  (projects) => projects.filter((p) => p.status === 'active')
);

export const selectCompletedProjects = createSelector(
  selectAllProjects,
  (projects) => projects.filter((p) => p.status === 'completed')
);

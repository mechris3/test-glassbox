import { createReducer, on } from '@ngrx/store';
import { ProjectsState, initialProjectsState } from '../app.state';
import * as ProjectsActions from './projects.actions';

export const projectsReducer = createReducer(
  initialProjectsState,
  on(ProjectsActions.loadProjects, (state): ProjectsState => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }): ProjectsState => ({
    ...state,
    projects,
    loading: false,
  })),
  on(ProjectsActions.loadProjectsFailure, (state, { error }): ProjectsState => ({
    ...state,
    loading: false,
    error,
  }))
);

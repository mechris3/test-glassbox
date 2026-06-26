import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { projectsReducer } from './store/projects/projects.reducer';
import { tasksReducer } from './store/tasks/tasks.reducer';
import { teamReducer } from './store/team/team.reducer';
import { settingsReducer } from './store/settings/settings.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { ProjectsEffects } from './store/projects/projects.effects';
import { TasksEffects } from './store/tasks/tasks.effects';
import { TeamEffects } from './store/team/team.effects';
import { SettingsEffects } from './store/settings/settings.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      auth: authReducer,
      projects: projectsReducer,
      tasks: tasksReducer,
      team: teamReducer,
      settings: settingsReducer,
    }),
    provideEffects(
      AuthEffects,
      ProjectsEffects,
      TasksEffects,
      TeamEffects,
      SettingsEffects
    ),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};

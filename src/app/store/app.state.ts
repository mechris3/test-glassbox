import { User, Project, Task, TeamMember, UserSettings } from './models';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface TeamState {
  members: TeamMember[];
  loading: boolean;
}

export interface SettingsState {
  settings: UserSettings;
  saved: boolean;
}

export interface AppState {
  auth: AuthState;
  projects: ProjectsState;
  tasks: TasksState;
  team: TeamState;
  settings: SettingsState;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

export const initialProjectsState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const initialTasksState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const initialTeamState: TeamState = {
  members: [],
  loading: false,
};

export const initialSettingsState: SettingsState = {
  settings: {
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      inApp: true,
      weeklyDigest: false,
    },
    profile: {
      displayName: '',
      avatarUrl: '',
    },
  },
  saved: false,
};

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  dueDate: string;
  ownerId: number;
  teamMemberIds: number[];
}

export interface Task {
  id: number;
  projectId: number;
  name: string;
  assigneeId: number;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    weeklyDigest: boolean;
  };
  profile: {
    displayName: string;
    avatarUrl: string;
  };
}

import { createReducer, on } from '@ngrx/store';
import { TasksState, initialTasksState } from '../app.state';
import * as TasksActions from './tasks.actions';

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.loadTasks, (state): TasksState => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }): TasksState => ({
    ...state,
    tasks,
    loading: false,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }): TasksState => ({
    ...state,
    loading: false,
    error,
  })),
  on(TasksActions.addTask, (state, { task }): TasksState => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.updateTaskStatus, (state, { taskId, status }): TasksState => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === taskId ? { ...t, status } : t
    ),
  })),
  on(TasksActions.deleteTask, (state, { taskId }): TasksState => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  }))
);

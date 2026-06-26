import { createAction, props } from '@ngrx/store';
import { Task } from '../models';

export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const updateTaskStatus = createAction(
  '[Tasks] Update Task Status',
  props<{ taskId: number; status: 'todo' | 'in-progress' | 'done' }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ taskId: number }>()
);

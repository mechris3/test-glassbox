import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as TasksActions from './tasks.actions';
import { Task } from '../models';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.http.get<Task[]>('assets/data/tasks.json').pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError(() =>
            of(TasksActions.loadTasksFailure({ error: 'Failed to load tasks' }))
          )
        )
      )
    )
  );
}

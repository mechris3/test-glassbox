import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as ProjectsActions from './projects.actions';
import { Project } from '../models';

@Injectable()
export class ProjectsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProjects),
      switchMap(() =>
        this.http.get<Project[]>('assets/data/projects.json').pipe(
          map((projects) => ProjectsActions.loadProjectsSuccess({ projects })),
          catchError(() =>
            of(ProjectsActions.loadProjectsFailure({ error: 'Failed to load projects' }))
          )
        )
      )
    )
  );
}

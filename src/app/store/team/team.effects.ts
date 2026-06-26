import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as TeamActions from './team.actions';
import { TeamMember } from '../models';

@Injectable()
export class TeamEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadTeam),
      switchMap(() =>
        this.http.get<TeamMember[]>('assets/data/team.json').pipe(
          map((members) => TeamActions.loadTeamSuccess({ members })),
          catchError(() =>
            of(TeamActions.loadTeamFailure({ error: 'Failed to load team' }))
          )
        )
      )
    )
  );
}

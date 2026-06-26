import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from '../models';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.http.get<User[]>('assets/data/users.json').pipe(
          map((users) => {
            const user = users.find(
              (u) => u.email === email && u.password === password
            );
            if (user) {
              return AuthActions.loginSuccess({ user });
            } else {
              return AuthActions.loginFailure({
                error: 'Invalid email or password',
              });
            }
          }),
          catchError(() =>
            of(AuthActions.loginFailure({ error: 'Failed to load user data' }))
          )
        )
      )
    )
  );
}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import * as SettingsActions from './settings.actions';

@Injectable()
export class SettingsEffects {
  private actions$ = inject(Actions);

  saveSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.saveSettings),
      delay(500),
      map(() => SettingsActions.settingsSaved())
    )
  );
}

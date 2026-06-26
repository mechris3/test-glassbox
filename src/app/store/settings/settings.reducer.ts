import { createReducer, on } from '@ngrx/store';
import { SettingsState, initialSettingsState } from '../app.state';
import * as SettingsActions from './settings.actions';

export const settingsReducer = createReducer(
  initialSettingsState,
  on(SettingsActions.updateSettings, (state, { settings }): SettingsState => ({
    ...state,
    settings,
    saved: false,
  })),
  on(SettingsActions.resetSettings, (): SettingsState => ({
    ...initialSettingsState,
  })),
  on(SettingsActions.saveSettings, (state): SettingsState => ({
    ...state,
    saved: false,
  })),
  on(SettingsActions.settingsSaved, (state): SettingsState => ({
    ...state,
    saved: true,
  }))
);

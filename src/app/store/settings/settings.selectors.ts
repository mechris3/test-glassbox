import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../app.state';

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectSettings = createSelector(
  selectSettingsState,
  (state) => state.settings
);

export const selectTheme = createSelector(
  selectSettings,
  (settings) => settings.theme
);

export const selectNotifications = createSelector(
  selectSettings,
  (settings) => settings.notifications
);

export const selectProfile = createSelector(
  selectSettings,
  (settings) => settings.profile
);

export const selectSettingsSaved = createSelector(
  selectSettingsState,
  (state) => state.saved
);

import { createAction, props } from '@ngrx/store';
import { UserSettings } from '../models';

export const updateSettings = createAction(
  '[Settings] Update Settings',
  props<{ settings: UserSettings }>()
);

export const resetSettings = createAction('[Settings] Reset Settings');

export const saveSettings = createAction('[Settings] Save Settings');

export const settingsSaved = createAction('[Settings] Settings Saved');

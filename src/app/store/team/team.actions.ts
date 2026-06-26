import { createAction, props } from '@ngrx/store';
import { TeamMember } from '../models';

export const loadTeam = createAction('[Team] Load Team');

export const loadTeamSuccess = createAction(
  '[Team] Load Team Success',
  props<{ members: TeamMember[] }>()
);

export const loadTeamFailure = createAction(
  '[Team] Load Team Failure',
  props<{ error: string }>()
);

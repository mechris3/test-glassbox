import { createReducer, on } from '@ngrx/store';
import { TeamState, initialTeamState } from '../app.state';
import * as TeamActions from './team.actions';

export const teamReducer = createReducer(
  initialTeamState,
  on(TeamActions.loadTeam, (state): TeamState => ({
    ...state,
    loading: true,
  })),
  on(TeamActions.loadTeamSuccess, (state, { members }): TeamState => ({
    ...state,
    members,
    loading: false,
  })),
  on(TeamActions.loadTeamFailure, (state): TeamState => ({
    ...state,
    loading: false,
  }))
);

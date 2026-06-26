import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamState } from '../app.state';

export const selectTeamState = createFeatureSelector<TeamState>('team');

export const selectAllTeamMembers = createSelector(
  selectTeamState,
  (state) => state.members
);

export const selectTeamMemberById = (id: number) =>
  createSelector(selectAllTeamMembers, (members) =>
    members.find((m) => m.id === id)
  );

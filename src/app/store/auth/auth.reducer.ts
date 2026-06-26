import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../app.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loading: false,
    error,
  })),
  on(AuthActions.logout, (): AuthState => ({
    ...initialAuthState,
  })),
  on(AuthActions.clearAuthError, (state): AuthState => ({
    ...state,
    error: null,
  }))
);

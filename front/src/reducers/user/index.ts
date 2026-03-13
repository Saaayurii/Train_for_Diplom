import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ApiError } from 'common/api/baseGeneratedApis';
import type { Role } from 'common/api/osrdEditoastApi';

export type UserPreferences = {
  safeWord: string;
  useNewTimesStopsTable: boolean;
};

export type AuthStatus = 'idle' | 'pending' | 'success' | 'unavailable' | 'failed';

export type UserState = {
  isLogged: boolean;
  authStatus: AuthStatus;
  impersonatedUser?: UserInfo;
  loginError?: ApiError;
  userId: number;
  username: string;
  userPreferences: UserPreferences;
  userRoles: Role[];
  account: Record<string, string>;
};

export type UserInfo = {
  groups: {
    id: number;
    name: string;
  }[];
  id: number;
  identities: string[];
  name: string;
  roles: Role[];
};

export const userInitialState: UserState = {
  isLogged: false,
  authStatus: 'idle',
  impersonatedUser: undefined,
  loginError: undefined,
  username: '',
  userPreferences: { safeWord: '', useNewTimesStopsTable: false },
  userId: -1,
  userRoles: [],
  account: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.authStatus = action.payload;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        username: UserState['username'];
      }>
    ) {
      const { username } = action.payload;
      state.username = username;
      state.isLogged = true;
      state.authStatus = 'success';
    },
    loginError(state, action: PayloadAction<ApiError | undefined>) {
      state.isLogged = false;
      state.loginError = action.payload;
      state.authStatus = 'failed';
    },
    logoutSuccess() {
      return userInitialState;
    },
    setImpersonatedUser(state, action: PayloadAction<UserInfo | undefined>) {
      state.impersonatedUser = action.payload;
    },
    updateAuthzUser(
      state,
      action: PayloadAction<{ userRoles: Role[]; userId: number } | undefined>
    ) {
      if (action.payload) {
        const { userRoles, userId } = action.payload;
        state.userRoles = userRoles;
        state.userId = userId;
      } else {
        state.userRoles = [];
        state.userId = -1;
      }
    },
    updateUserPreferences(state, action: PayloadAction<UserPreferences>) {
      state.userPreferences = action.payload;
    },
  },
});

export const {
  setAuthStatus,
  loginSuccess,
  loginError,
  logoutSuccess,
  setImpersonatedUser,
  updateUserPreferences,
  updateAuthzUser,
} = userSlice.actions;

export default userSlice.reducer;

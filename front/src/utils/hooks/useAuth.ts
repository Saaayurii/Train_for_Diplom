import { useCallback, useEffect } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';

import {
  addTagTypes,
  osrdEditoastApi,
  type SearchResultItemUser,
} from 'common/api/osrdEditoastApi';
import { osrdGatewayApi } from 'common/api/osrdGatewayApi';
import {
  loginSuccess,
  setImpersonatedUser,
  updateAuthzUser,
  loginError,
  logoutSuccess,
  setAuthStatus,
} from 'reducers/user';
import {
  getIsUserLogged,
  getImpersonatedUser,
  getUsername,
  getAuthStatus,
} from 'reducers/user/userSelectors';

// Check if mock auth is enabled via environment variable
const MOCK_AUTH_ENABLED = import.meta.env.VITE_MOCK_AUTH === 'true';

function useAuth() {
  const dispatch = useDispatch();
  const isUserLogged = useSelector(getIsUserLogged);
  const username = useSelector(getUsername);
  const impersonatedUser = useSelector(getImpersonatedUser);
  // Global auth status — shared across all useAuth instances via Redux
  const authStatus = useSelector(getAuthStatus);

  const [login, { isLoading: isAuthenticateLoading }] =
    osrdGatewayApi.endpoints.login.useMutation();

  const [logoutMutation] = osrdGatewayApi.endpoints.logout.useMutation();

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // ignore errors — gateway may be unavailable in standalone mode
    } finally {
      dispatch(logoutSuccess());
      window.location.href = '/auth';
    }
  }, [logoutMutation, dispatch]);

  const { data } = osrdEditoastApi.endpoints.getAuthzMe.useQuery(
    isUserLogged ? undefined : skipToken
  );

  const [fetchFullUser] = osrdEditoastApi.endpoints.postAuthzUserInfo.useLazyQuery();

  useEffect(() => {
    // Only attempt login once — guard with global authStatus
    if (authStatus !== 'idle') return;

    if (MOCK_AUTH_ENABLED) {
      dispatch(loginSuccess({ username: 'Development User' }));
      dispatch(updateAuthzUser({ userRoles: ['Admin'], userId: 1 }));
      return;
    }

    if (!isUserLogged && !isAuthenticateLoading) {
      dispatch(setAuthStatus('pending'));
      login()
        .unwrap()
        .catch((error) => {
          if (error?.status === 404) {
            // Gateway not available — run in standalone/guest mode
            dispatch(loginSuccess({ username: 'Guest User' }));
            dispatch(updateAuthzUser({ userRoles: ['User'], userId: 0 }));
            dispatch(setAuthStatus('unavailable'));
          } else {
            dispatch(loginError(error));
            dispatch(setAuthStatus('failed'));
          }
        });
    }
  }, [authStatus, isUserLogged, isAuthenticateLoading]);

  useEffect(() => {
    if (data) {
      dispatch(updateAuthzUser({ userRoles: data.roles, userId: data.id }));
    }
  }, [data]);

  const impersonate = useCallback(async (userToImpersonate: SearchResultItemUser | undefined) => {
    let impersonated = userToImpersonate
      ? (await fetchFullUser({ body: { ids: [userToImpersonate.id], identities: [] } })).data?.[0]
      : undefined;
    if (impersonated && impersonated.identities.length === 0) {
      impersonated = undefined;
    }
    dispatch(setImpersonatedUser(impersonated));
    dispatch(osrdEditoastApi.util.invalidateTags(addTagTypes.map((t) => ({ type: t }))));
  }, []);

  return {
    username: data?.name ?? username,
    isUserLogged,
    impersonatedUser,
    isLoading: authStatus === 'idle' || authStatus === 'pending',
    authError: authStatus === 'unavailable' ? 'auth_unavailable'
             : authStatus === 'failed'      ? 'auth_failed'
             : null,
    logout,
    impersonate,
  };
}

export default useAuth;
